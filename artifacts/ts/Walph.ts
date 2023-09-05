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
import { default as WalphContractJson } from "../Walph.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace WalphTypes {
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
  export type WinnerEvent = ContractEvent<{ address: Address }>;

  export interface CallMethodTable {
    random: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
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

class Factory extends ContractFactory<WalphInstance, WalphTypes.Fields> {
  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as WalphTypes.Fields;
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

  at(address: string): WalphInstance {
    return new WalphInstance(address);
  }

  tests = {
    random: async (
      params: Omit<TestContractParams<WalphTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "random", params);
    },
    getPoolState: async (
      params: Omit<TestContractParams<WalphTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<boolean>> => {
      return testMethod(this, "getPoolState", params);
    },
    getPoolSize: async (
      params: Omit<TestContractParams<WalphTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getPoolSize", params);
    },
    getBalance: async (
      params: Omit<TestContractParams<WalphTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getBalance", params);
    },
    addAlph: async (
      params: Omit<TestContractParams<WalphTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "addAlph", params);
    },
    buyTicket: async (
      params: TestContractParams<WalphTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "buyTicket", params);
    },
    distributePrize: async (
      params: Omit<TestContractParams<WalphTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "distributePrize", params);
    },
    closePoolWhenFull: async (
      params: Omit<TestContractParams<WalphTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "closePoolWhenFull", params);
    },
    closePool: async (
      params: Omit<TestContractParams<WalphTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "closePool", params);
    },
    openPool: async (
      params: Omit<TestContractParams<WalphTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "openPool", params);
    },
    destroyPool: async (
      params: Omit<TestContractParams<WalphTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "destroyPool", params);
    },
    changeMinAmountToHold: async (
      params: TestContractParams<WalphTypes.Fields, { newAmount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "changeMinAmountToHold", params);
    },
  };
}

// Use this object to test and deploy the contract
export const Walph = new Factory(
  Contract.fromJson(
    WalphContractJson,
    "",
    "bf3235141c6a6961a49ab42995d5ea6c5bb802a724057c4855a71618fe235ba6"
  )
);

// Use this class to interact with the blockchain
export class WalphInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<WalphTypes.State> {
    return fetchContractState(Walph, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeTicketBoughtEvent(
    options: EventSubscribeOptions<WalphTypes.TicketBoughtEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph.contract,
      this,
      options,
      "TicketBought",
      fromCount
    );
  }

  subscribePoolOpenEvent(
    options: EventSubscribeOptions<WalphTypes.PoolOpenEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph.contract,
      this,
      options,
      "PoolOpen",
      fromCount
    );
  }

  subscribePoolCloseEvent(
    options: EventSubscribeOptions<WalphTypes.PoolCloseEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph.contract,
      this,
      options,
      "PoolClose",
      fromCount
    );
  }

  subscribeDestroyEvent(
    options: EventSubscribeOptions<WalphTypes.DestroyEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph.contract,
      this,
      options,
      "Destroy",
      fromCount
    );
  }

  subscribeNewMinTokenAmountToHoldEvent(
    options: EventSubscribeOptions<WalphTypes.NewMinTokenAmountToHoldEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph.contract,
      this,
      options,
      "NewMinTokenAmountToHold",
      fromCount
    );
  }

  subscribeWinnerEvent(
    options: EventSubscribeOptions<WalphTypes.WinnerEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Walph.contract,
      this,
      options,
      "Winner",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | WalphTypes.TicketBoughtEvent
      | WalphTypes.PoolOpenEvent
      | WalphTypes.PoolCloseEvent
      | WalphTypes.DestroyEvent
      | WalphTypes.NewMinTokenAmountToHoldEvent
      | WalphTypes.WinnerEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(Walph.contract, this, options, fromCount);
  }

  methods = {
    random: async (
      params?: WalphTypes.CallMethodParams<"random">
    ): Promise<WalphTypes.CallMethodResult<"random">> => {
      return callMethod(
        Walph,
        this,
        "random",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getPoolState: async (
      params?: WalphTypes.CallMethodParams<"getPoolState">
    ): Promise<WalphTypes.CallMethodResult<"getPoolState">> => {
      return callMethod(
        Walph,
        this,
        "getPoolState",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getPoolSize: async (
      params?: WalphTypes.CallMethodParams<"getPoolSize">
    ): Promise<WalphTypes.CallMethodResult<"getPoolSize">> => {
      return callMethod(
        Walph,
        this,
        "getPoolSize",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getBalance: async (
      params?: WalphTypes.CallMethodParams<"getBalance">
    ): Promise<WalphTypes.CallMethodResult<"getBalance">> => {
      return callMethod(
        Walph,
        this,
        "getBalance",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends WalphTypes.MultiCallParams>(
    calls: Calls
  ): Promise<WalphTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      Walph,
      this,
      calls,
      getContractByCodeHash
    )) as WalphTypes.MultiCallResults<Calls>;
  }
}
