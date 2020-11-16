// Built-in uses
use std::time::Duration;
// External uses
use anyhow::format_err;
use futures::channel::mpsc::{Receiver, Sender};
use futures::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use tokio::{task::JoinHandle, time};
// Workspace uses
use crate::mempool::MempoolRequest;
use zksync_storage::{ConnectionPool, StorageProcessor};
use zksync_types::aggregated_operations::{
    AggregatedActionType, AggregatedOperation, BlockExecuteOperationArg, BlocksCommitOperation,
    BlocksExecuteOperation, BlocksProofOperation,
};
use zksync_types::{
    block::{Block, ExecutedOperations, PendingBlock},
    AccountUpdates, Action, BlockNumber, Operation,
};

#[derive(Debug)]
pub enum CommitRequest {
    PendingBlock((PendingBlock, AppliedUpdatesRequest)),
    Block((BlockCommitRequest, AppliedUpdatesRequest)),
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BlockCommitRequest {
    pub block: Block,
    pub accounts_updated: AccountUpdates,
}

#[derive(Clone, Debug)]
pub struct AppliedUpdatesRequest {
    pub account_updates: AccountUpdates,
    pub first_update_order_id: usize,
}

pub struct ExecutedOpsNotify {
    pub operations: Vec<ExecutedOperations>,
    pub block_number: BlockNumber,
}

const PROOF_POLL_INTERVAL: Duration = Duration::from_secs(1);

async fn handle_new_commit_task(
    mut rx_for_ops: Receiver<CommitRequest>,
    mut mempool_req_sender: Sender<MempoolRequest>,
    pool: ConnectionPool,
) {
    while let Some(request) = rx_for_ops.next().await {
        match request {
            CommitRequest::Block((block_commit_request, applied_updates_req)) => {
                commit_block(
                    block_commit_request,
                    applied_updates_req,
                    &pool,
                    &mut mempool_req_sender,
                )
                .await;
            }
            CommitRequest::PendingBlock((pending_block, applied_updates_req)) => {
                let mut operations = pending_block.success_operations.clone();
                operations.extend(
                    pending_block
                        .failed_txs
                        .clone()
                        .into_iter()
                        .map(|tx| ExecutedOperations::Tx(Box::new(tx))),
                );
                save_pending_block(pending_block, applied_updates_req, &pool).await;
            }
        }
    }
}

async fn save_pending_block(
    pending_block: PendingBlock,
    applied_updates_request: AppliedUpdatesRequest,
    pool: &ConnectionPool,
) {
    let mut storage = pool
        .access_storage()
        .await
        .expect("db connection fail for committer");

    let mut transaction = storage
        .start_transaction()
        .await
        .expect("Failed initializing a DB transaction");

    let block_number = pending_block.number;

    log::trace!("persist pending block #{}", block_number);

    transaction
        .chain()
        .block_schema()
        .save_pending_block(pending_block)
        .await
        .expect("committer must commit the pending block into db");

    transaction
        .chain()
        .state_schema()
        .commit_state_update(
            block_number,
            &applied_updates_request.account_updates,
            applied_updates_request.first_update_order_id,
        )
        .await
        .expect("committer must commit the pending block into db");

    transaction
        .commit()
        .await
        .expect("Unable to commit DB transaction");
}

async fn commit_block(
    block_commit_request: BlockCommitRequest,
    applied_updates_request: AppliedUpdatesRequest,
    pool: &ConnectionPool,
    mempool_req_sender: &mut Sender<MempoolRequest>,
) {
    let BlockCommitRequest {
        block,
        accounts_updated,
    } = block_commit_request;

    let mut storage = pool
        .access_storage()
        .await
        .expect("db connection fail for committer");

    let mut transaction = storage
        .start_transaction()
        .await
        .expect("Failed initializing a DB transaction");

    for exec_op in block.block_transactions.clone() {
        if let Some(exec_tx) = exec_op.get_executed_tx() {
            if exec_tx.success && exec_tx.signed_tx.tx.is_withdraw() {
                transaction
                    .chain()
                    .operations_schema()
                    .add_pending_withdrawal(&exec_tx.signed_tx.tx.hash(), None)
                    .await
                    .map_err(|e| {
                        format_err!(
                            "Failed to save pending withdrawal {:?}, error : {}",
                            exec_tx,
                            e
                        )
                    })
                    .expect("failed to save pending withdrawals into db");
            }
        }
    }

    transaction
        .chain()
        .state_schema()
        .commit_state_update(
            block.block_number,
            &applied_updates_request.account_updates,
            applied_updates_request.first_update_order_id,
        )
        .await
        .expect("committer must commit the pending block into db");

    let op = Operation {
        action: Action::Commit,
        block,
        id: None,
    };
    log::info!("commit block #{}", op.block.block_number);
    transaction
        .chain()
        .block_schema()
        .execute_operation(op.clone())
        .await
        .expect("committer must commit the op into db");

    mempool_req_sender
        .send(MempoolRequest::UpdateNonces(accounts_updated))
        .await
        .map_err(|e| log::warn!("Failed notify mempool about account updates: {}", e))
        .unwrap_or_default();

    transaction
        .commit()
        .await
        .expect("Unable to commit DB transaction");
}

async fn poll_for_new_proofs_task(pool: ConnectionPool) {
    let mut timer = time::interval(PROOF_POLL_INTERVAL);
    loop {
        timer.tick().await;

        let mut storage = pool
            .access_storage()
            .await
            .expect("db connection failed for committer");

        create_aggregated_operations(&mut storage)
            .await
            .map_err(|e| log::error!("Failed to create aggregated operation: {}", e))
            .unwrap_or_default();
    }
}

async fn create_aggregated_operations(storage: &mut StorageProcessor<'_>) -> anyhow::Result<()> {
    let last_committed_block = storage
        .chain()
        .block_schema()
        .get_last_committed_block()
        .await?;

    let last_aggregate_committed_block = storage
        .chain()
        .operations_schema()
        .get_last_affected_block_by_aggregated_action(AggregatedActionType::CommitBlocks)
        .await?;

    let last_aggregate_create_proof_block = storage
        .chain()
        .operations_schema()
        .get_last_affected_block_by_aggregated_action(AggregatedActionType::CreateProofBlocks)
        .await?;

    let last_aggregate_publish_proof_block = storage
        .chain()
        .operations_schema()
        .get_last_affected_block_by_aggregated_action(
            AggregatedActionType::PublishProofBlocksOnchain,
        )
        .await?;

    let last_aggregate_executed_block = storage
        .chain()
        .operations_schema()
        .get_last_affected_block_by_aggregated_action(AggregatedActionType::ExecuteBlocks)
        .await?;

    if last_committed_block > last_aggregate_committed_block {
        let old_committed_block = storage
            .chain()
            .block_schema()
            .get_block(last_aggregate_committed_block)
            .await?
            .expect("Failed to get last committed block from db");
        let mut blocks_to_commit = Vec::new();
        for block_number in last_aggregate_committed_block + 1..=last_committed_block {
            let block = storage
                .chain()
                .block_schema()
                .get_block(block_number)
                .await?
                .expect("Failed to get last committed block from db");
            blocks_to_commit.push(block);
        }

        let aggregated_commit_block = AggregatedOperation::CommitBlocks(BlocksCommitOperation {
            last_committed_block: old_committed_block,
            blocks: blocks_to_commit,
        });

        storage
            .chain()
            .operations_schema()
            .store_aggregated_action(aggregated_commit_block)
            .await?;
        log::info!(
            "Created aggregated commit op: {} - {}",
            last_aggregate_committed_block + 1,
            last_committed_block
        );
    }

    if last_committed_block > last_aggregate_create_proof_block {
        let mut commitments = Vec::new();
        let mut block_numbers = Vec::new();
        for block_number in last_aggregate_create_proof_block + 1..=last_committed_block {
            let block = storage
                .chain()
                .block_schema()
                .get_block(block_number)
                .await?
                .expect("Failed to get last committed block from db");
            block_numbers.push(block_number);
            commitments.push((block.block_commitment, block.block_number))
        }

        let aggregated_op_create = AggregatedOperation::CreateProofBlocks(block_numbers);
        // TODO: should execute after proof is produced
        let aggregated_op_publish =
            AggregatedOperation::PublishProofBlocksOnchain(BlocksProofOperation { commitments });

        storage
            .chain()
            .operations_schema()
            .store_aggregated_action(aggregated_op_create)
            .await?;
        storage
            .chain()
            .operations_schema()
            .store_aggregated_action(aggregated_op_publish)
            .await?;

        log::info!(
            "Created aggregated create proof / publish proof op: {} - {}",
            last_aggregate_create_proof_block + 1,
            last_committed_block
        );
    }

    // TODO: should execute after proof is produced
    // if last_aggregate_create_proof_block > last_aggregate_publish_proof_block {
    //
    // }

    if last_aggregate_publish_proof_block > last_aggregate_executed_block {
        let mut blocks = Vec::new();
        for block_number in last_aggregate_executed_block + 1..=last_aggregate_publish_proof_block {
            let block = storage
                .chain()
                .block_schema()
                .get_block(block_number)
                .await?
                .expect("Failed to get last committed block from db");
            let publish_proof_op = storage
                .chain()
                .operations_schema()
                .get_aggregated_op_that_affects_block(
                    AggregatedActionType::PublishProofBlocksOnchain,
                    block_number,
                )
                .await?
                .expect("Aggregated op should exist");
            let block_execution_op_arg =
                if let AggregatedOperation::PublishProofBlocksOnchain(publish_arguments) =
                    publish_proof_op
                {
                    let commitment_idx = publish_arguments
                        .commitments
                        .iter()
                        .enumerate()
                        .find_map(|(idx, (_, commitment_block))| {
                            if *commitment_block == block_number {
                                Some(idx)
                            } else {
                                None
                            }
                        })
                        .expect("should be present");
                    let commitments = publish_arguments
                        .commitments
                        .into_iter()
                        .map(|(c, _)| c)
                        .collect();

                    BlockExecuteOperationArg {
                        block,
                        commitments,
                        commitment_idx,
                    }
                } else {
                    panic!("should be publish proof blocks onchain data");
                };
            blocks.push(block_execution_op_arg);
        }
        let aggregated_op = AggregatedOperation::ExecuteBlocks(BlocksExecuteOperation { blocks });
        storage
            .chain()
            .operations_schema()
            .store_aggregated_action(aggregated_op)
            .await?;

        log::info!(
            "Created aggregated execute op: {} - {}",
            last_aggregate_executed_block + 1,
            last_aggregate_publish_proof_block
        );
    }

    Ok(())
}

#[must_use]
pub fn run_committer(
    rx_for_ops: Receiver<CommitRequest>,
    mempool_req_sender: Sender<MempoolRequest>,
    pool: ConnectionPool,
) -> JoinHandle<()> {
    tokio::spawn(handle_new_commit_task(
        rx_for_ops,
        mempool_req_sender,
        pool.clone(),
    ));
    tokio::spawn(poll_for_new_proofs_task(pool))
}