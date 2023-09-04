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
import { default as Walph100ContractJson } from "../Walph100.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace Walph100Types {
  export type Fields = {
    poolSize: bigint;
    poolOwner: Address;
    poolFees: bigint;
    tokenIdToHold: HexString;
    ticketPrice: bigint;
    minTokenAmountToHold: bigint;
    open: boolean;
    balance: bigint;
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
      Address,
      Address,
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
  export type NewMinTokenAmountToHoldEvent = ContractEvent<{
    newAmount: bigint;
  }>;

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
    getCopyBalance: {
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

class Factory extends ContractFactory<Walph100Instance, Walph100Types.Fields> {
  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as Walph100Types.Fields;
  }

  eventIndex = {
    TicketBought: 0,
    PoolOpen: 1,
    PoolClose: 2,
    Destroy: 3,
    NewMinTokenAmountToHold: 4,
  };
  consts = {
    ErrorCodes: {
      PoolFull: BigInt(0),
      PoolAlreadyClose: BigInt(1),
      PoolAlreadyOpen: BigInt(2),
      PoolClosed: BigInt(3),
      InvalidCaller: BigInt(4),
      NotEnoughToken: BigInt(5),
      PoolNotFull: BigInt(6),
      InvalidAmount: BigInt(7),
    },
  };

  at(address: string): Walph100Instance {
    return new Walph100Instance(address);
  }

  tests = {
    getPoolState: async (
      params: Omit<TestContractParams<Walph100Types.Fields, never>, "testArgs">
    ): Promise<TestContractResult<boolean>> => {
      return testMethod(this, "getPoolState", params);
    },
    getPoolSize: async (
      params: Omit<TestContractParams<Walph100Types.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getPoolSize", params);
    },
    getBalance: async (
      params: Omit<TestContractParams<Walph100Types.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getBalance", params);
    },
    buyTicket: async (
      params: TestContractParams<Walph100Types.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "buyTicket", params);
    },
    distributePrize: async (
      params: TestContractParams<Walph100Types.Fields, { winner: Address }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "distributePrize", params);
    },
    closePoolWhenFull: async (
      params: Omit<TestContractParams<Walph100Types.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "closePoolWhenFull", params);
    },
    closePool: async (
      params: Omit<TestContractParams<Walph100Types.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "closePool", params);
    },
    openPool: async (
      params: Omit<TestContractParams<Walph100Types.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "openPool", params);
    },
    destroyPool: async (
      params: Omit<TestContractParams<Walph100Types.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "destroyPool", params);
    },
    changeMinAmountToHold: async (
      params: TestContractParams<Walph100Types.Fields, { newAmount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "changeMinAmountToHold", params);
    },
    getCopyBalance: async (
      params: Omit<TestContractParams<Walph100Types.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getCopyBalance", params);
    },
  };
}

// Use this object to test and deploy the contract
export const Walph100 = new Factory(
  Contract.fromJson(
    Walph100ContractJson,
    "",
    "c16ab0d477a03818b3261b88de45fa0a5882ce3a3cb7ed27c2d4d2eac86682fa"
  )
);

// Use this class to interact with the blockchain
export class Walph100Instance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<Walph100Types.State> {
    return fetchContractState(Walph100, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeTicketBoughtEvent(
    options: EventSubscribeOptions<Walph100Types.TicketBoughtEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph100.contract,
      this,
      options,
      "TicketBought",
      fromCount
    );
  }

  subscribePoolOpenEvent(
    options: EventSubscribeOptions<Walph100Types.PoolOpenEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph100.contract,
      this,
      options,
      "PoolOpen",
      fromCount
    );
  }

  subscribePoolCloseEvent(
    options: EventSubscribeOptions<Walph100Types.PoolCloseEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph100.contract,
      this,
      options,
      "PoolClose",
      fromCount
    );
  }

  subscribeDestroyEvent(
    options: EventSubscribeOptions<Walph100Types.DestroyEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph100.contract,
      this,
      options,
      "Destroy",
      fromCount
    );
  }

  subscribeNewMinTokenAmountToHoldEvent(
    options: EventSubscribeOptions<Walph100Types.NewMinTokenAmountToHoldEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph100.contract,
      this,
      options,
      "NewMinTokenAmountToHold",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | Walph100Types.TicketBoughtEvent
      | Walph100Types.PoolOpenEvent
      | Walph100Types.PoolCloseEvent
      | Walph100Types.DestroyEvent
      | Walph100Types.NewMinTokenAmountToHoldEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(Walph100.contract, this, options, fromCount);
  }

  methods = {
    getPoolState: async (
      params?: Walph100Types.CallMethodParams<"getPoolState">
    ): Promise<Walph100Types.CallMethodResult<"getPoolState">> => {
      return callMethod(
        Walph100,
        this,
        "getPoolState",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getPoolSize: async (
      params?: Walph100Types.CallMethodParams<"getPoolSize">
    ): Promise<Walph100Types.CallMethodResult<"getPoolSize">> => {
      return callMethod(
        Walph100,
        this,
        "getPoolSize",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getBalance: async (
      params?: Walph100Types.CallMethodParams<"getBalance">
    ): Promise<Walph100Types.CallMethodResult<"getBalance">> => {
      return callMethod(
        Walph100,
        this,
        "getBalance",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getCopyBalance: async (
      params?: Walph100Types.CallMethodParams<"getCopyBalance">
    ): Promise<Walph100Types.CallMethodResult<"getCopyBalance">> => {
      return callMethod(
        Walph100,
        this,
        "getCopyBalance",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends Walph100Types.MultiCallParams>(
    calls: Calls
  ): Promise<Walph100Types.MultiCallResults<Calls>> {
    return (await multicallMethods(
      Walph100,
      this,
      calls,
      getContractByCodeHash
    )) as Walph100Types.MultiCallResults<Calls>;
  }
}
