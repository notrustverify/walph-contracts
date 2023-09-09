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
import { default as Walph50HodlAlfContractJson } from "../Walph50HodlAlf.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace Walph50HodlAlfTypes {
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

class Factory extends ContractFactory<
  Walph50HodlAlfInstance,
  Walph50HodlAlfTypes.Fields
> {
  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as Walph50HodlAlfTypes.Fields;
  }

  eventIndex = {
    TicketBought: 0,
    PoolOpen: 1,
    PoolClose: 2,
    Destroy: 3,
    NewMinTokenAmountToHold: 4,
    Winner: 5,
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

  at(address: string): Walph50HodlAlfInstance {
    return new Walph50HodlAlfInstance(address);
  }

  tests = {
    random: async (
      params: Omit<
        TestContractParams<Walph50HodlAlfTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "random", params);
    },
    distributePrize: async (
      params: Omit<
        TestContractParams<Walph50HodlAlfTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "distributePrize", params);
    },
    getPoolState: async (
      params: Omit<
        TestContractParams<Walph50HodlAlfTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<boolean>> => {
      return testMethod(this, "getPoolState", params);
    },
    getPoolSize: async (
      params: Omit<
        TestContractParams<Walph50HodlAlfTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getPoolSize", params);
    },
    getBalance: async (
      params: Omit<
        TestContractParams<Walph50HodlAlfTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getBalance", params);
    },
    addAlph: async (
      params: Omit<
        TestContractParams<Walph50HodlAlfTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "addAlph", params);
    },
    buyTicket: async (
      params: TestContractParams<Walph50HodlAlfTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "buyTicket", params);
    },
    closePool: async (
      params: Omit<
        TestContractParams<Walph50HodlAlfTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "closePool", params);
    },
    openPool: async (
      params: Omit<
        TestContractParams<Walph50HodlAlfTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "openPool", params);
    },
    destroyPool: async (
      params: Omit<
        TestContractParams<Walph50HodlAlfTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "destroyPool", params);
    },
    changeMinAmountToHold: async (
      params: TestContractParams<
        Walph50HodlAlfTypes.Fields,
        { newAmount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "changeMinAmountToHold", params);
    },
  };
}

// Use this object to test and deploy the contract
export const Walph50HodlAlf = new Factory(
  Contract.fromJson(
    Walph50HodlAlfContractJson,
    "=6-2=2-2+2a=3-1+a=2-2+83=3-1+c=3-1+5=1-3+0a9=2-1=1+b=3-1+0=3-1+64179=3-1+d=11-1+4=30+0016007e0207726e6420697320=726",
    "3f348f497f62805ebd88e666c09f74fd90b11beb337f676702af942289d1b6f2"
  )
);

// Use this class to interact with the blockchain
export class Walph50HodlAlfInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<Walph50HodlAlfTypes.State> {
    return fetchContractState(Walph50HodlAlf, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeTicketBoughtEvent(
    options: EventSubscribeOptions<Walph50HodlAlfTypes.TicketBoughtEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph50HodlAlf.contract,
      this,
      options,
      "TicketBought",
      fromCount
    );
  }

  subscribePoolOpenEvent(
    options: EventSubscribeOptions<Walph50HodlAlfTypes.PoolOpenEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph50HodlAlf.contract,
      this,
      options,
      "PoolOpen",
      fromCount
    );
  }

  subscribePoolCloseEvent(
    options: EventSubscribeOptions<Walph50HodlAlfTypes.PoolCloseEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph50HodlAlf.contract,
      this,
      options,
      "PoolClose",
      fromCount
    );
  }

  subscribeDestroyEvent(
    options: EventSubscribeOptions<Walph50HodlAlfTypes.DestroyEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph50HodlAlf.contract,
      this,
      options,
      "Destroy",
      fromCount
    );
  }

  subscribeNewMinTokenAmountToHoldEvent(
    options: EventSubscribeOptions<Walph50HodlAlfTypes.NewMinTokenAmountToHoldEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph50HodlAlf.contract,
      this,
      options,
      "NewMinTokenAmountToHold",
      fromCount
    );
  }

  subscribeWinnerEvent(
    options: EventSubscribeOptions<Walph50HodlAlfTypes.WinnerEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph50HodlAlf.contract,
      this,
      options,
      "Winner",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | Walph50HodlAlfTypes.TicketBoughtEvent
      | Walph50HodlAlfTypes.PoolOpenEvent
      | Walph50HodlAlfTypes.PoolCloseEvent
      | Walph50HodlAlfTypes.DestroyEvent
      | Walph50HodlAlfTypes.NewMinTokenAmountToHoldEvent
      | Walph50HodlAlfTypes.WinnerEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      Walph50HodlAlf.contract,
      this,
      options,
      fromCount
    );
  }

  methods = {
    getPoolState: async (
      params?: Walph50HodlAlfTypes.CallMethodParams<"getPoolState">
    ): Promise<Walph50HodlAlfTypes.CallMethodResult<"getPoolState">> => {
      return callMethod(
        Walph50HodlAlf,
        this,
        "getPoolState",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getPoolSize: async (
      params?: Walph50HodlAlfTypes.CallMethodParams<"getPoolSize">
    ): Promise<Walph50HodlAlfTypes.CallMethodResult<"getPoolSize">> => {
      return callMethod(
        Walph50HodlAlf,
        this,
        "getPoolSize",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getBalance: async (
      params?: Walph50HodlAlfTypes.CallMethodParams<"getBalance">
    ): Promise<Walph50HodlAlfTypes.CallMethodResult<"getBalance">> => {
      return callMethod(
        Walph50HodlAlf,
        this,
        "getBalance",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends Walph50HodlAlfTypes.MultiCallParams>(
    calls: Calls
  ): Promise<Walph50HodlAlfTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      Walph50HodlAlf,
      this,
      calls,
      getContractByCodeHash
    )) as Walph50HodlAlfTypes.MultiCallResults<Calls>;
  }
}
