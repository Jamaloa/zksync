/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface ProxyInterface extends ethers.utils.Interface {
  functions: {
    "getMaster()": FunctionFragment;
    "getNoticePeriod()": FunctionFragment;
    "getTarget()": FunctionFragment;
    "initialize(bytes)": FunctionFragment;
    "isReadyForUpgrade()": FunctionFragment;
    "transferMastership(address)": FunctionFragment;
    "upgrade(bytes)": FunctionFragment;
    "upgradeCanceled()": FunctionFragment;
    "upgradeFinishes()": FunctionFragment;
    "upgradeNoticePeriodStarted()": FunctionFragment;
    "upgradePreparationStarted()": FunctionFragment;
    "upgradeTarget(address,bytes)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "getMaster", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getNoticePeriod",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getTarget", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isReadyForUpgrade",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferMastership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "upgrade", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "upgradeCanceled",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeFinishes",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeNoticePeriodStarted",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "upgradePreparationStarted",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTarget",
    values: [string, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "getMaster", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getNoticePeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTarget", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isReadyForUpgrade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferMastership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgrade", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeCanceled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeFinishes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeNoticePeriodStarted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradePreparationStarted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeTarget",
    data: BytesLike
  ): Result;

  events: {};
}

export class Proxy extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ProxyInterface;

  functions: {
    getMaster(
      overrides?: CallOverrides
    ): Promise<{
      master: string;
      0: string;
    }>;

    "getMaster()"(
      overrides?: CallOverrides
    ): Promise<{
      master: string;
      0: string;
    }>;

    getNoticePeriod(overrides?: Overrides): Promise<ContractTransaction>;

    "getNoticePeriod()"(overrides?: Overrides): Promise<ContractTransaction>;

    getTarget(
      overrides?: CallOverrides
    ): Promise<{
      target: string;
      0: string;
    }>;

    "getTarget()"(
      overrides?: CallOverrides
    ): Promise<{
      target: string;
      0: string;
    }>;

    initialize(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: void;
    }>;

    "initialize(bytes)"(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: void;
    }>;

    isReadyForUpgrade(overrides?: Overrides): Promise<ContractTransaction>;

    "isReadyForUpgrade()"(overrides?: Overrides): Promise<ContractTransaction>;

    transferMastership(
      _newMaster: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferMastership(address)"(
      _newMaster: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    upgrade(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: void;
    }>;

    "upgrade(bytes)"(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: void;
    }>;

    upgradeCanceled(overrides?: Overrides): Promise<ContractTransaction>;

    "upgradeCanceled()"(overrides?: Overrides): Promise<ContractTransaction>;

    upgradeFinishes(overrides?: Overrides): Promise<ContractTransaction>;

    "upgradeFinishes()"(overrides?: Overrides): Promise<ContractTransaction>;

    upgradeNoticePeriodStarted(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "upgradeNoticePeriodStarted()"(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    upgradePreparationStarted(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "upgradePreparationStarted()"(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    upgradeTarget(
      newTarget: string,
      newTargetUpgradeParameters: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "upgradeTarget(address,bytes)"(
      newTarget: string,
      newTargetUpgradeParameters: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  getMaster(overrides?: CallOverrides): Promise<string>;

  "getMaster()"(overrides?: CallOverrides): Promise<string>;

  getNoticePeriod(overrides?: Overrides): Promise<ContractTransaction>;

  "getNoticePeriod()"(overrides?: Overrides): Promise<ContractTransaction>;

  getTarget(overrides?: CallOverrides): Promise<string>;

  "getTarget()"(overrides?: CallOverrides): Promise<string>;

  initialize(arg0: BytesLike, overrides?: CallOverrides): Promise<void>;

  "initialize(bytes)"(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<void>;

  isReadyForUpgrade(overrides?: Overrides): Promise<ContractTransaction>;

  "isReadyForUpgrade()"(overrides?: Overrides): Promise<ContractTransaction>;

  transferMastership(
    _newMaster: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferMastership(address)"(
    _newMaster: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  upgrade(arg0: BytesLike, overrides?: CallOverrides): Promise<void>;

  "upgrade(bytes)"(arg0: BytesLike, overrides?: CallOverrides): Promise<void>;

  upgradeCanceled(overrides?: Overrides): Promise<ContractTransaction>;

  "upgradeCanceled()"(overrides?: Overrides): Promise<ContractTransaction>;

  upgradeFinishes(overrides?: Overrides): Promise<ContractTransaction>;

  "upgradeFinishes()"(overrides?: Overrides): Promise<ContractTransaction>;

  upgradeNoticePeriodStarted(
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "upgradeNoticePeriodStarted()"(
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  upgradePreparationStarted(
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "upgradePreparationStarted()"(
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  upgradeTarget(
    newTarget: string,
    newTargetUpgradeParameters: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "upgradeTarget(address,bytes)"(
    newTarget: string,
    newTargetUpgradeParameters: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    getMaster(overrides?: CallOverrides): Promise<string>;

    "getMaster()"(overrides?: CallOverrides): Promise<string>;

    getNoticePeriod(overrides?: CallOverrides): Promise<BigNumber>;

    "getNoticePeriod()"(overrides?: CallOverrides): Promise<BigNumber>;

    getTarget(overrides?: CallOverrides): Promise<string>;

    "getTarget()"(overrides?: CallOverrides): Promise<string>;

    initialize(arg0: BytesLike, overrides?: CallOverrides): Promise<void>;

    "initialize(bytes)"(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    isReadyForUpgrade(overrides?: CallOverrides): Promise<boolean>;

    "isReadyForUpgrade()"(overrides?: CallOverrides): Promise<boolean>;

    transferMastership(
      _newMaster: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferMastership(address)"(
      _newMaster: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgrade(arg0: BytesLike, overrides?: CallOverrides): Promise<void>;

    "upgrade(bytes)"(arg0: BytesLike, overrides?: CallOverrides): Promise<void>;

    upgradeCanceled(overrides?: CallOverrides): Promise<void>;

    "upgradeCanceled()"(overrides?: CallOverrides): Promise<void>;

    upgradeFinishes(overrides?: CallOverrides): Promise<void>;

    "upgradeFinishes()"(overrides?: CallOverrides): Promise<void>;

    upgradeNoticePeriodStarted(overrides?: CallOverrides): Promise<void>;

    "upgradeNoticePeriodStarted()"(overrides?: CallOverrides): Promise<void>;

    upgradePreparationStarted(overrides?: CallOverrides): Promise<void>;

    "upgradePreparationStarted()"(overrides?: CallOverrides): Promise<void>;

    upgradeTarget(
      newTarget: string,
      newTargetUpgradeParameters: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "upgradeTarget(address,bytes)"(
      newTarget: string,
      newTargetUpgradeParameters: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    getMaster(overrides?: CallOverrides): Promise<BigNumber>;

    "getMaster()"(overrides?: CallOverrides): Promise<BigNumber>;

    getNoticePeriod(overrides?: Overrides): Promise<BigNumber>;

    "getNoticePeriod()"(overrides?: Overrides): Promise<BigNumber>;

    getTarget(overrides?: CallOverrides): Promise<BigNumber>;

    "getTarget()"(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    "initialize(bytes)"(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isReadyForUpgrade(overrides?: Overrides): Promise<BigNumber>;

    "isReadyForUpgrade()"(overrides?: Overrides): Promise<BigNumber>;

    transferMastership(
      _newMaster: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferMastership(address)"(
      _newMaster: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    upgrade(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    "upgrade(bytes)"(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    upgradeCanceled(overrides?: Overrides): Promise<BigNumber>;

    "upgradeCanceled()"(overrides?: Overrides): Promise<BigNumber>;

    upgradeFinishes(overrides?: Overrides): Promise<BigNumber>;

    "upgradeFinishes()"(overrides?: Overrides): Promise<BigNumber>;

    upgradeNoticePeriodStarted(overrides?: Overrides): Promise<BigNumber>;

    "upgradeNoticePeriodStarted()"(overrides?: Overrides): Promise<BigNumber>;

    upgradePreparationStarted(overrides?: Overrides): Promise<BigNumber>;

    "upgradePreparationStarted()"(overrides?: Overrides): Promise<BigNumber>;

    upgradeTarget(
      newTarget: string,
      newTargetUpgradeParameters: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "upgradeTarget(address,bytes)"(
      newTarget: string,
      newTargetUpgradeParameters: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getMaster(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getMaster()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNoticePeriod(overrides?: Overrides): Promise<PopulatedTransaction>;

    "getNoticePeriod()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    getTarget(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getTarget()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "initialize(bytes)"(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isReadyForUpgrade(overrides?: Overrides): Promise<PopulatedTransaction>;

    "isReadyForUpgrade()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    transferMastership(
      _newMaster: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferMastership(address)"(
      _newMaster: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    upgrade(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "upgrade(bytes)"(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    upgradeCanceled(overrides?: Overrides): Promise<PopulatedTransaction>;

    "upgradeCanceled()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    upgradeFinishes(overrides?: Overrides): Promise<PopulatedTransaction>;

    "upgradeFinishes()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    upgradeNoticePeriodStarted(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "upgradeNoticePeriodStarted()"(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    upgradePreparationStarted(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "upgradePreparationStarted()"(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    upgradeTarget(
      newTarget: string,
      newTargetUpgradeParameters: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "upgradeTarget(address,bytes)"(
      newTarget: string,
      newTargetUpgradeParameters: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
