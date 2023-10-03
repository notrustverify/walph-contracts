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
import { default as WalphTimedContractJson } from "../WalphTimed.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace WalphTimedTypes {
  export type Fields = {
    poolSize: bigint;
    poolOwner: Address;
    poolFees: bigint;
    ticketPrice: bigint;
    drawTimestamp: bigint;
    repeatEvery: bigint;
    open: boolean;
    balance: bigint;
    feesBalance: bigint;
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
  export type WinnerEvent = ContractEvent<{ address: Address }>;
  export type PoolDrawnEvent = ContractEvent<{ amount: bigint }>;
  export type NewRepeatEveryEvent = ContractEvent<{ newRepeat: bigint }>;

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

class Factory extends ContractFactory<
  WalphTimedInstance,
  WalphTimedTypes.Fields
> {
  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as WalphTimedTypes.Fields;
  }

  eventIndex = {
    TicketBought: 0,
    PoolOpen: 1,
    PoolClose: 2,
    Destroy: 3,
    Winner: 4,
    PoolDrawn: 5,
    NewRepeatEvery: 6,
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
      TimestampOrAttendeesNotReached: BigInt(8),
      NoAttendees: BigInt(9),
      NotValidAddress: BigInt(10),
      TimestampReached: BigInt(11),
    },
  };

  at(address: string): WalphTimedInstance {
    return new WalphTimedInstance(address);
  }

  tests = {
    random: async (
      params: Omit<
        TestContractParams<WalphTimedTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "random", params);
    },
    distributePrize: async (
      params: Omit<
        TestContractParams<WalphTimedTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "distributePrize", params);
    },
    getPoolState: async (
      params: Omit<
        TestContractParams<WalphTimedTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<boolean>> => {
      return testMethod(this, "getPoolState", params);
    },
    getPoolSize: async (
      params: Omit<
        TestContractParams<WalphTimedTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getPoolSize", params);
    },
    getBalance: async (
      params: Omit<
        TestContractParams<WalphTimedTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getBalance", params);
    },
    getTicketPrice: async (
      params: Omit<
        TestContractParams<WalphTimedTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getTicketPrice", params);
    },
    withdraw: async (
      params: Omit<
        TestContractParams<WalphTimedTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "withdraw", params);
    },
    draw: async (
      params: Omit<
        TestContractParams<WalphTimedTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "draw", params);
    },
    buyTicket: async (
      params: TestContractParams<WalphTimedTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "buyTicket", params);
    },
    closePool: async (
      params: Omit<
        TestContractParams<WalphTimedTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "closePool", params);
    },
    openPool: async (
      params: Omit<
        TestContractParams<WalphTimedTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "openPool", params);
    },
    destroyPool: async (
      params: Omit<
        TestContractParams<WalphTimedTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "destroyPool", params);
    },
    changeRepeatEvery: async (
      params: TestContractParams<WalphTimedTypes.Fields, { newRepeat: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "changeRepeatEvery", params);
    },
  };
}

// Use this object to test and deploy the contract
export const WalphTimed = new Factory(
  Contract.fromJson(
    WalphTimedContractJson,
    "=6-2=2-2+2a=3-1+b=3-1+4=3-1+d=3-1+6=2-2+bf=1-1=2+a=2-3=2+4=1+99=2-2+ae=3-1+4=3-1+741ec=11-1+4=30+0016007e0207726e6420697320=916",
    "4f7042514878cde5171136bf4d7081721e29b642020af02c2e33a04e3f4c0fd0"
  )
);

// Use this class to interact with the blockchain
export class WalphTimedInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<WalphTimedTypes.State> {
    return fetchContractState(WalphTimed, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeTicketBoughtEvent(
    options: EventSubscribeOptions<WalphTimedTypes.TicketBoughtEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimed.contract,
      this,
      options,
      "TicketBought",
      fromCount
    );
  }

  subscribePoolOpenEvent(
    options: EventSubscribeOptions<WalphTimedTypes.PoolOpenEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimed.contract,
      this,
      options,
      "PoolOpen",
      fromCount
    );
  }

  subscribePoolCloseEvent(
    options: EventSubscribeOptions<WalphTimedTypes.PoolCloseEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimed.contract,
      this,
      options,
      "PoolClose",
      fromCount
    );
  }

  subscribeDestroyEvent(
    options: EventSubscribeOptions<WalphTimedTypes.DestroyEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimed.contract,
      this,
      options,
      "Destroy",
      fromCount
    );
  }

  subscribeWinnerEvent(
    options: EventSubscribeOptions<WalphTimedTypes.WinnerEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimed.contract,
      this,
      options,
      "Winner",
      fromCount
    );
  }

  subscribePoolDrawnEvent(
    options: EventSubscribeOptions<WalphTimedTypes.PoolDrawnEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimed.contract,
      this,
      options,
      "PoolDrawn",
      fromCount
    );
  }

  subscribeNewRepeatEveryEvent(
    options: EventSubscribeOptions<WalphTimedTypes.NewRepeatEveryEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimed.contract,
      this,
      options,
      "NewRepeatEvery",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | WalphTimedTypes.TicketBoughtEvent
      | WalphTimedTypes.PoolOpenEvent
      | WalphTimedTypes.PoolCloseEvent
      | WalphTimedTypes.DestroyEvent
      | WalphTimedTypes.WinnerEvent
      | WalphTimedTypes.PoolDrawnEvent
      | WalphTimedTypes.NewRepeatEveryEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      WalphTimed.contract,
      this,
      options,
      fromCount
    );
  }

  methods = {
    getPoolState: async (
      params?: WalphTimedTypes.CallMethodParams<"getPoolState">
    ): Promise<WalphTimedTypes.CallMethodResult<"getPoolState">> => {
      return callMethod(
        WalphTimed,
        this,
        "getPoolState",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getPoolSize: async (
      params?: WalphTimedTypes.CallMethodParams<"getPoolSize">
    ): Promise<WalphTimedTypes.CallMethodResult<"getPoolSize">> => {
      return callMethod(
        WalphTimed,
        this,
        "getPoolSize",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getBalance: async (
      params?: WalphTimedTypes.CallMethodParams<"getBalance">
    ): Promise<WalphTimedTypes.CallMethodResult<"getBalance">> => {
      return callMethod(
        WalphTimed,
        this,
        "getBalance",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTicketPrice: async (
      params?: WalphTimedTypes.CallMethodParams<"getTicketPrice">
    ): Promise<WalphTimedTypes.CallMethodResult<"getTicketPrice">> => {
      return callMethod(
        WalphTimed,
        this,
        "getTicketPrice",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends WalphTimedTypes.MultiCallParams>(
    calls: Calls
  ): Promise<WalphTimedTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      WalphTimed,
      this,
      calls,
      getContractByCodeHash
    )) as WalphTimedTypes.MultiCallResults<Calls>;
  }
}
