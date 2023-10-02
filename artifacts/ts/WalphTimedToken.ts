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
import { default as WalphTimedTokenContractJson } from "../WalphTimedToken.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace WalphTimedTokenTypes {
  export type Fields = {
    poolSize: bigint;
    poolOwner: Address;
    poolFees: bigint;
    tokenId: HexString;
    ticketPrice: bigint;
    drawTimestamp: bigint;
    repeatEvery: bigint;
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
  WalphTimedTokenInstance,
  WalphTimedTokenTypes.Fields
> {
  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as WalphTimedTokenTypes.Fields;
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

  at(address: string): WalphTimedTokenInstance {
    return new WalphTimedTokenInstance(address);
  }

  tests = {
    random: async (
      params: Omit<
        TestContractParams<WalphTimedTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "random", params);
    },
    distributePrize: async (
      params: Omit<
        TestContractParams<WalphTimedTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "distributePrize", params);
    },
    getPoolState: async (
      params: Omit<
        TestContractParams<WalphTimedTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<boolean>> => {
      return testMethod(this, "getPoolState", params);
    },
    getPoolSize: async (
      params: Omit<
        TestContractParams<WalphTimedTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getPoolSize", params);
    },
    getBalance: async (
      params: Omit<
        TestContractParams<WalphTimedTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getBalance", params);
    },
    getTicketPrice: async (
      params: Omit<
        TestContractParams<WalphTimedTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getTicketPrice", params);
    },
    withdraw: async (
      params: Omit<
        TestContractParams<WalphTimedTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "withdraw", params);
    },
    draw: async (
      params: Omit<
        TestContractParams<WalphTimedTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "draw", params);
    },
    buyTicket: async (
      params: TestContractParams<
        WalphTimedTokenTypes.Fields,
        { amount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "buyTicket", params);
    },
    closePool: async (
      params: Omit<
        TestContractParams<WalphTimedTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "closePool", params);
    },
    openPool: async (
      params: Omit<
        TestContractParams<WalphTimedTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "openPool", params);
    },
    destroyPool: async (
      params: Omit<
        TestContractParams<WalphTimedTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "destroyPool", params);
    },
    changeRepeatEvery: async (
      params: TestContractParams<
        WalphTimedTokenTypes.Fields,
        { newRepeat: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "changeRepeatEvery", params);
    },
  };
}

// Use this object to test and deploy the contract
export const WalphTimedToken = new Factory(
  Contract.fromJson(
    WalphTimedTokenContractJson,
    "=6-2=2-1+2=4-1+7=2-1=1+0=3-1+9=2-2+d2=2-2+db=2-1+0=3-2+54=2+e=1-1=3-1+4=2+1a4=1-1+2d42=2-2=11-1+4=30+0016007e0207726e6420697320=1088",
    "be17dfea50a0d52ed6332d4a9df3d5d9f563794bb45535d2baec637752995c8c"
  )
);

// Use this class to interact with the blockchain
export class WalphTimedTokenInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<WalphTimedTokenTypes.State> {
    return fetchContractState(WalphTimedToken, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeTicketBoughtEvent(
    options: EventSubscribeOptions<WalphTimedTokenTypes.TicketBoughtEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimedToken.contract,
      this,
      options,
      "TicketBought",
      fromCount
    );
  }

  subscribePoolOpenEvent(
    options: EventSubscribeOptions<WalphTimedTokenTypes.PoolOpenEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimedToken.contract,
      this,
      options,
      "PoolOpen",
      fromCount
    );
  }

  subscribePoolCloseEvent(
    options: EventSubscribeOptions<WalphTimedTokenTypes.PoolCloseEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimedToken.contract,
      this,
      options,
      "PoolClose",
      fromCount
    );
  }

  subscribeDestroyEvent(
    options: EventSubscribeOptions<WalphTimedTokenTypes.DestroyEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimedToken.contract,
      this,
      options,
      "Destroy",
      fromCount
    );
  }

  subscribeWinnerEvent(
    options: EventSubscribeOptions<WalphTimedTokenTypes.WinnerEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimedToken.contract,
      this,
      options,
      "Winner",
      fromCount
    );
  }

  subscribePoolDrawnEvent(
    options: EventSubscribeOptions<WalphTimedTokenTypes.PoolDrawnEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimedToken.contract,
      this,
      options,
      "PoolDrawn",
      fromCount
    );
  }

  subscribeNewRepeatEveryEvent(
    options: EventSubscribeOptions<WalphTimedTokenTypes.NewRepeatEveryEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WalphTimedToken.contract,
      this,
      options,
      "NewRepeatEvery",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | WalphTimedTokenTypes.TicketBoughtEvent
      | WalphTimedTokenTypes.PoolOpenEvent
      | WalphTimedTokenTypes.PoolCloseEvent
      | WalphTimedTokenTypes.DestroyEvent
      | WalphTimedTokenTypes.WinnerEvent
      | WalphTimedTokenTypes.PoolDrawnEvent
      | WalphTimedTokenTypes.NewRepeatEveryEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      WalphTimedToken.contract,
      this,
      options,
      fromCount
    );
  }

  methods = {
    getPoolState: async (
      params?: WalphTimedTokenTypes.CallMethodParams<"getPoolState">
    ): Promise<WalphTimedTokenTypes.CallMethodResult<"getPoolState">> => {
      return callMethod(
        WalphTimedToken,
        this,
        "getPoolState",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getPoolSize: async (
      params?: WalphTimedTokenTypes.CallMethodParams<"getPoolSize">
    ): Promise<WalphTimedTokenTypes.CallMethodResult<"getPoolSize">> => {
      return callMethod(
        WalphTimedToken,
        this,
        "getPoolSize",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getBalance: async (
      params?: WalphTimedTokenTypes.CallMethodParams<"getBalance">
    ): Promise<WalphTimedTokenTypes.CallMethodResult<"getBalance">> => {
      return callMethod(
        WalphTimedToken,
        this,
        "getBalance",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTicketPrice: async (
      params?: WalphTimedTokenTypes.CallMethodParams<"getTicketPrice">
    ): Promise<WalphTimedTokenTypes.CallMethodResult<"getTicketPrice">> => {
      return callMethod(
        WalphTimedToken,
        this,
        "getTicketPrice",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends WalphTimedTokenTypes.MultiCallParams>(
    calls: Calls
  ): Promise<WalphTimedTokenTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      WalphTimedToken,
      this,
      calls,
      getContractByCodeHash
    )) as WalphTimedTokenTypes.MultiCallResults<Calls>;
  }
}
