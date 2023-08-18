/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
} from "@alephium/web3";
import { default as WalphleContractJson } from "../Walphle.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace WalphleTypes {
  export type Fields = {
    poolSize: bigint;
    poolOwner: Address;
    poolFees: bigint;
    ratioAlphAlf: bigint;
    open: boolean;
  };

  export type State = ContractState<Fields>;

  export type TicketBoughtEvent = ContractEvent<{
    from: Address;
    amount: bigint;
  }>;
  export type PoolOpenEvent = Omit<ContractEvent, "fields">;
  export type PoolCloseEvent = Omit<ContractEvent, "fields">;

  export interface CallMethodTable {
    getPoolState: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<boolean>;
    };
    getPoolSize: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
}

class Factory extends ContractFactory<WalphleInstance, WalphleTypes.Fields> {
  eventIndex = { TicketBought: 0, PoolOpen: 1, PoolClose: 2 };
  consts = {
    ErrorCodes: {
      PoolFull: BigInt(0),
      PoolAlreadyClose: BigInt(1),
      PoolAlreadyOpen: BigInt(2),
      PoolClosed: BigInt(3),
      InvalidCaller: BigInt(4),
      NotEnoughALF: BigInt(5),
    },
  };

  at(address: string): WalphleInstance {
    return new WalphleInstance(address);
  }

  tests = {
    getPoolState: async (
      params: Omit<TestContractParams<WalphleTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<boolean>> => {
      return testMethod(this, "getPoolState", params);
    },
    getPoolSize: async (
      params: Omit<TestContractParams<WalphleTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getPoolSize", params);
    },
    getNumALF: async (
      params: Omit<TestContractParams<WalphleTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getNumALF", params);
    },
    getContractBalance: async (
      params: Omit<TestContractParams<WalphleTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getContractBalance", params);
    },
    ratioAlphAlfRatio: async (
      params: Omit<TestContractParams<WalphleTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "ratioAlphAlfRatio", params);
    },
    buyTicket: async (
      params: TestContractParams<WalphleTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "buyTicket", params);
    },
    distributePrize: async (
      params: TestContractParams<WalphleTypes.Fields, { winner: Address }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "distributePrize", params);
    },
    closePool: async (
      params: Omit<TestContractParams<WalphleTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "closePool", params);
    },
    openPool: async (
      params: Omit<TestContractParams<WalphleTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "openPool", params);
    },
  };
}

// Use this object to test and deploy the contract
export const Walphle = new Factory(
  Contract.fromJson(
    WalphleContractJson,
    "",
    "2390af5bea3e1ce30301dbbeb415da0206aa38f88ed3abe2a40ec2f5e32d0ffc"
  )
);

// Use this class to interact with the blockchain
export class WalphleInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<WalphleTypes.State> {
    return fetchContractState(Walphle, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeTicketBoughtEvent(
    options: EventSubscribeOptions<WalphleTypes.TicketBoughtEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walphle.contract,
      this,
      options,
      "TicketBought",
      fromCount
    );
  }

  subscribePoolOpenEvent(
    options: EventSubscribeOptions<WalphleTypes.PoolOpenEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walphle.contract,
      this,
      options,
      "PoolOpen",
      fromCount
    );
  }

  subscribePoolCloseEvent(
    options: EventSubscribeOptions<WalphleTypes.PoolCloseEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walphle.contract,
      this,
      options,
      "PoolClose",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | WalphleTypes.TicketBoughtEvent
      | WalphleTypes.PoolOpenEvent
      | WalphleTypes.PoolCloseEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(Walphle.contract, this, options, fromCount);
  }

  methods = {
    getPoolState: async (
      params?: WalphleTypes.CallMethodParams<"getPoolState">
    ): Promise<WalphleTypes.CallMethodResult<"getPoolState">> => {
      return callMethod(
        Walphle,
        this,
        "getPoolState",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getPoolSize: async (
      params?: WalphleTypes.CallMethodParams<"getPoolSize">
    ): Promise<WalphleTypes.CallMethodResult<"getPoolSize">> => {
      return callMethod(
        Walphle,
        this,
        "getPoolSize",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends WalphleTypes.MultiCallParams>(
    calls: Calls
  ): Promise<WalphleTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      Walphle,
      this,
      calls,
      getContractByCodeHash
    )) as WalphleTypes.MultiCallResults<Calls>;
  }
}
