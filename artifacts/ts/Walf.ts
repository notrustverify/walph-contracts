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
import { default as WalfContractJson } from "../Walf.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace WalfTypes {
  export type Fields = {
    poolSize: bigint;
    poolOwner: Address;
    poolFees: bigint;
    tokenId: HexString;
    ticketPrice: bigint;
    open: boolean;
    balance: bigint;
    feesBalance: bigint;
    dustBalance: bigint;
    numAttendees: bigint;
    attendees: [
      Address,
      Address,
      Address,
      Address,
      Address,
      Address,
      Address,
      Address,
      Address,
      Address
    ];
    lastWinner: Address;
  };

  export type State = ContractState<Fields>;

  export type TicketBoughtEvent = ContractEvent<{
    from: Address;
    amount: bigint;
  }>;
  export type PoolOpenEvent = Omit<ContractEvent, "fields">;
  export type PoolCloseEvent = Omit<ContractEvent, "fields">;
  export type DestroyEvent = ContractEvent<{ from: Address }>;
  export type WinnerEvent = ContractEvent<{ address: Address }>;

  export interface CallMethodTable {
    getPoolState: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<boolean>;
    };
    getPoolSize: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getBalance: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTicketPrice: {
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

class Factory extends ContractFactory<WalfInstance, WalfTypes.Fields> {
  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as WalfTypes.Fields;
  }

  eventIndex = {
    TicketBought: 0,
    PoolOpen: 1,
    PoolClose: 2,
    Destroy: 3,
    Winner: 4,
  };
  consts = {
    ErrorCodes: {
      PoolFull: BigInt(0),
      PoolAlreadyClose: BigInt(1),
      PoolAlreadyOpen: BigInt(2),
      PoolClosed: BigInt(3),
      InvalidCaller: BigInt(4),
      PoolNotFull: BigInt(6),
      InvalidAmount: BigInt(7),
    },
  };

  at(address: string): WalfInstance {
    return new WalfInstance(address);
  }

  tests = {
    random: async (
      params: Omit<TestContractParams<WalfTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "random", params);
    },
    distributePrize: async (
      params: TestContractParams<
        WalfTypes.Fields,
        { lastAttendee: Address; amount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "distributePrize", params);
    },
    getPoolState: async (
      params: Omit<TestContractParams<WalfTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<boolean>> => {
      return testMethod(this, "getPoolState", params);
    },
    getPoolSize: async (
      params: Omit<TestContractParams<WalfTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getPoolSize", params);
    },
    getBalance: async (
      params: Omit<TestContractParams<WalfTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getBalance", params);
    },
    getTicketPrice: async (
      params: Omit<TestContractParams<WalfTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getTicketPrice", params);
    },
    withdraw: async (
      params: Omit<TestContractParams<WalfTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "withdraw", params);
    },
    buyTicket: async (
      params: TestContractParams<WalfTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "buyTicket", params);
    },
    closePool: async (
      params: Omit<TestContractParams<WalfTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "closePool", params);
    },
    openPool: async (
      params: Omit<TestContractParams<WalfTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "openPool", params);
    },
    destroyPool: async (
      params: Omit<TestContractParams<WalfTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "destroyPool", params);
    },
  };
}

// Use this object to test and deploy the contract
export const Walf = new Factory(
  Contract.fromJson(
    WalfContractJson,
    "=4-2=2-2+2a=2-2+93=3-1+c=3-1+5=3-1+e40b7=2-2+fb=2-2+d4=2-2+e9=3-1+f=2-2+12=11-1+4=30+0016007e0207726e6420697320=992",
    "02d772e0e11f5f6de6a4cf5781bf6344101deecdb3f9afadefa428b06265247b"
  )
);

// Use this class to interact with the blockchain
export class WalfInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<WalfTypes.State> {
    return fetchContractState(Walf, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeTicketBoughtEvent(
    options: EventSubscribeOptions<WalfTypes.TicketBoughtEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walf.contract,
      this,
      options,
      "TicketBought",
      fromCount
    );
  }

  subscribePoolOpenEvent(
    options: EventSubscribeOptions<WalfTypes.PoolOpenEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walf.contract,
      this,
      options,
      "PoolOpen",
      fromCount
    );
  }

  subscribePoolCloseEvent(
    options: EventSubscribeOptions<WalfTypes.PoolCloseEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walf.contract,
      this,
      options,
      "PoolClose",
      fromCount
    );
  }

  subscribeDestroyEvent(
    options: EventSubscribeOptions<WalfTypes.DestroyEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walf.contract,
      this,
      options,
      "Destroy",
      fromCount
    );
  }

  subscribeWinnerEvent(
    options: EventSubscribeOptions<WalfTypes.WinnerEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walf.contract,
      this,
      options,
      "Winner",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | WalfTypes.TicketBoughtEvent
      | WalfTypes.PoolOpenEvent
      | WalfTypes.PoolCloseEvent
      | WalfTypes.DestroyEvent
      | WalfTypes.WinnerEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(Walf.contract, this, options, fromCount);
  }

  methods = {
    getPoolState: async (
      params?: WalfTypes.CallMethodParams<"getPoolState">
    ): Promise<WalfTypes.CallMethodResult<"getPoolState">> => {
      return callMethod(
        Walf,
        this,
        "getPoolState",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getPoolSize: async (
      params?: WalfTypes.CallMethodParams<"getPoolSize">
    ): Promise<WalfTypes.CallMethodResult<"getPoolSize">> => {
      return callMethod(
        Walf,
        this,
        "getPoolSize",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getBalance: async (
      params?: WalfTypes.CallMethodParams<"getBalance">
    ): Promise<WalfTypes.CallMethodResult<"getBalance">> => {
      return callMethod(
        Walf,
        this,
        "getBalance",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTicketPrice: async (
      params?: WalfTypes.CallMethodParams<"getTicketPrice">
    ): Promise<WalfTypes.CallMethodResult<"getTicketPrice">> => {
      return callMethod(
        Walf,
        this,
        "getTicketPrice",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends WalfTypes.MultiCallParams>(
    calls: Calls
  ): Promise<WalfTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      Walf,
      this,
      calls,
      getContractByCodeHash
    )) as WalfTypes.MultiCallResults<Calls>;
  }
}
