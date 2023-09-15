import {
  web3,
  Project,
  stringToHex,
  ONE_ALPH,
  DUST_AMOUNT,
  sleep,
  ZERO_ADDRESS,
  sign,
  ALPH_TOKEN_ID,
} from "@alephium/web3";
import { NodeWallet, PrivateKeyWallet } from "@alephium/web3-wallet";
import {
  Walph,
  Buy,
  Open,
  Close,
  WalphTypes,
  Destroy,
  BuyWithoutToken,
  WithdrawFees,
  WalphStack,
  WalphStackTypes,
  SetOwnerContractAddress
} from "../../artifacts/ts";
import configuration, { Settings } from "../../alephium.config";
import * as dotenv from "dotenv";
import { waitTxConfirmed } from "@alephium/cli";
import { getSigner, testPrivateKey, transfer } from "@alephium/web3-test";

dotenv.config();

let signer;
let signerAddress;
let rndSignerBuy;
let testGroup;

const tokenIdToHold =
  "3f52b6bdb8678b8931d683bbae1bd7c5296f70a2ab87bbd1792cb24f9b1d1500";
const networkToUse = "devnet";

describe("integration tests", () => {
  beforeAll(async () => {
    web3.setCurrentNodeProvider(
      configuration.networks[networkToUse].nodeUrl,
      undefined,
      fetch
    );
    await Project.build();

    // rndSignerBuy = new PrivateKeyWallet({privateKey: configuration.networks[networkToUse].privateKeys[1] , keyType: undefined, nodeProvider: web3.getCurrentNodeProvider()})

    signer = new PrivateKeyWallet({ privateKey: testPrivateKey });

    signerAddress = await signer.account.address;
    testGroup = signer.account.group;
  });

  it("should test Walph and WalphStack", async () => {
    const deployStackResult = await WalphStack.deploy(signer, {
      initialFields: {
        owner: signerAddress,
        stackSize: 10n,
        contractAddressOwner: ZERO_ADDRESS,
        contractOwnerSet: false,
        attendees: Array(10).fill(
          ZERO_ADDRESS
        ) as WalphStackTypes.Fields["attendees"],
        index: 0n,
      },
    });

    const deployResult = await Walph.deploy(signer, {
      initialFields: {
        poolSize: 10n * 10n ** 18n,
        poolOwner: signerAddress,
        poolFees: 1n,
        ticketPrice: 10n ** 18n,
        open: true,
        balance: 0n,
        feesBalance: 0n,
        numAttendees: 0n,
        attendeesStack: deployStackResult.contractInstance.contractId,
        lastWinner: ZERO_ADDRESS,
      },
    });

    const walph = deployResult.contractInstance;
    const walphleContractId = deployResult.contractInstance.contractId;
    const walphContractAddress = deployResult.contractInstance.address;

    const walphStack = deployStackResult.contractInstance;
    const walphStackContractId = deployStackResult.contractInstance.contractId;
    const walphStackContractAddress = deployStackResult.contractInstance.address;

    console.log(
      "Contract deployed at: " + walphleContractId + " " + walphContractAddress
    );
    console.log(
      "Stack Contract deployed at: " + walphStackContractId + " " + walphStackContractAddress
    );

    expect(deployResult.contractInstance.groupIndex).toEqual(testGroup);

    const walphleDeployed = Walph.at(walphContractAddress);
    const walphStackDeployed = WalphStack.at(walphStackContractAddress);


    const initialState = await walphleDeployed.fetchState();
    const stackInitialState = await walphStackDeployed.fetchState();
    const initialBalance = initialState.fields.balance;
    expect(initialBalance).toEqual(0n);
    expect(stackInitialState.fields.index).toEqual(0n)

    const getPoolSize = await walph.methods.getPoolSize();
    const getStackIndex = await walphStack.methods.getIndex();
    const getStackSize = await walphStack.methods.getStackSize();

    expect(getPoolSize.returns).toEqual(10n * 10n ** 18n);
    expect(getStackIndex.returns).toEqual(0n)
    expect(getStackSize.returns).toEqual(10n)

    // set the address contract owner
    await SetOwnerContractAddress.execute(signer, {
      initialFields: { walphStackContract: walphStackContractId, contractAddressOwner: walphContractAddress },
      attoAlphAmount: DUST_AMOUNT,
    });

    const stackInitialStateWithOwner = await walphStackDeployed.fetchState();
    expect(stackInitialStateWithOwner.fields.contractAddressOwner).toEqual(walphContractAddress)
    expect(stackInitialStateWithOwner.fields.contractOwnerSet).toEqual(true)

    const ticketBoughtEvents: WalphTypes.TicketBoughtEvent[] = [];
    const subscription = walph.subscribeTicketBoughtEvent({
      pollingInterval: 1,
      messageCallback: async (event: WalphTypes.TicketBoughtEvent) => {
        ticketBoughtEvents.push(event);
        return Promise.resolve();
      },
      errorCallback: async (error, subscription) => {
        console.error(error);
        subscription.unsubscribe();
        return Promise.resolve();
      },
    });

    const contractBalance = await web3
      .getCurrentNodeProvider()
      .addresses.getAddressesAddressBalance(walphContractAddress);
    expect(parseInt(contractBalance.balance)).toBeGreaterThanOrEqual(ONE_ALPH);

    const oneAttendee = await getSigner();
    await transfer(signer, oneAttendee.address, ALPH_TOKEN_ID, 150n * ONE_ALPH)

    // simulate someone buying tickets
    for (let i = 0; i < 9; i++) {
      await BuyWithoutToken.execute(oneAttendee, {
        initialFields: { walphContract: walphleContractId, amount: ONE_ALPH },
        attoAlphAmount: ONE_ALPH + 2n * DUST_AMOUNT,
      });
    }

    const afterPoolFull = await walphleDeployed.fetchState();
    const stackAfterPoolFull = await walphStack.fetchState();

    const afterPoolFullOpenState = afterPoolFull.fields.open;
    const afterPoolFullBalanceState = afterPoolFull.fields.balance;
    const afterPoolFullNumAttendeesState = afterPoolFull.fields.numAttendees;

    console.log(
      "Pool state: " +
        afterPoolFullOpenState +
        " Balance: " +
        afterPoolFullBalanceState / 10n ** 18n +
        "Stack state: " + stackAfterPoolFull.fields.attendees 
    );

    let expectedArray = Array(9).fill(
      signer.address
    ) as WalphStackTypes.Fields["attendees"];
    expectedArray[9] = ZERO_ADDRESS;

    expect(afterPoolFullOpenState).toEqual(true);
    expect(afterPoolFullBalanceState).toEqual(9n * 10n ** 18n);
    expect(afterPoolFullNumAttendeesState).toEqual(9n);

    expect(stackAfterPoolFull.fields.attendees).toEqual(expectedArray);
    expect(stackAfterPoolFull.fields.index).toEqual(9n);

    expect(ticketBoughtEvents.length).toEqual(9);

    //buy last ticket to draw the pool
    await BuyWithoutToken.execute(signer, {
      initialFields: { walphContract: walphleContractId, amount: ONE_ALPH },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT,
    });

    const contractAfterPoolDistributionBalance = await web3
      .getCurrentNodeProvider()
      .addresses.getAddressesAddressBalance(walphContractAddress);
    expect(contractAfterPoolDistributionBalance.balanceHint).toEqual(
      "1.09 ALPH"
    );
    const winnerBalance = await web3
      .getCurrentNodeProvider()
      .addresses.getAddressesAddressBalance(signer.address);

    const afterPoolDistribution = await walphleDeployed.fetchState();
    const stackAfterPoolDistribution = await walphStackDeployed.fetchState();

    const afterPoolDistributionOpenState = afterPoolDistribution.fields.open;
    const afterPoolDistributionBalanceState =
      afterPoolDistribution.fields.balance;
    const afterPoolDistributionNumAttendeesState =
      afterPoolDistribution.fields.numAttendees;
    const afterPoolDistributionWinner = afterPoolDistribution.fields.lastWinner;

    console.log(
      "Pool state: " +
        afterPoolDistributionOpenState +
        " Balance: " +
        afterPoolDistributionBalanceState / 10n ** 18n +
        " Fields: " +
        JSON.stringify(afterPoolDistribution.fields)
    );
    expect(afterPoolDistributionOpenState).toEqual(true);
    expect(afterPoolDistributionBalanceState).toEqual(0n);
    expect(afterPoolDistributionNumAttendeesState).toEqual(0n);
    expect(afterPoolDistributionWinner).toEqual(signer.account.address);
    expect(stackAfterPoolDistribution.fields.index).toEqual(0n)

    subscription.unsubscribe();

    await WithdrawFees.execute(signer, {
      initialFields: { walphContract: walphleContractId },
      attoAlphAmount: DUST_AMOUNT,
    });

    const afterWhitdraw = await walphleDeployed.fetchState();
    expect(afterWhitdraw.fields.feesBalance).toEqual(0n);
    const afterWhitdrawBalance = await web3
      .getCurrentNodeProvider()
      .addresses.getAddressesAddressBalance(walphContractAddress);
    expect(afterWhitdrawBalance.balanceHint).toEqual("1 ALPH");

    await Destroy.execute(signer, {
      initialFields: { walphContract: walphleContractId },
      attoAlphAmount: DUST_AMOUNT,
    });
    /*
      const contractBalance = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(walphContractAddress)
      expect(web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(walphContractAddress)).toEqual(0n)*/
  });

  it("should close and open pool", async () => {
      const deployResult = await Walph.deploy(signer, {
        initialFields: {
          poolSize: 10n * 10n ** 18n,
          poolOwner: signerAddress,
          poolFees: 1n,
          ticketPrice: 10n ** 18n,
          open: true,
          balance: 0n,
          feesBalance: 0n,
          numAttendees: 0n,
          attendeesStack: "",
          lastWinner: ZERO_ADDRESS,
        },
      });

      const walph = deployResult.contractInstance;
      const walphleContractId = deployResult.contractInstance.contractId;
      const walphContractAddress = deployResult.contractInstance.address;

      console.log(
        "Contract deployed at: " +
          walphleContractId +
          " " +
          walphContractAddress
      );
      expect(deployResult.contractInstance.groupIndex).toEqual(testGroup);

      const walphleDeployed = Walph.at(walphContractAddress);

      const closePoolEvents: WalphTypes.PoolCloseEvent[] = [];
      const subscription = walph.subscribePoolCloseEvent({
        pollingInterval: 10,
        messageCallback: async (event: WalphTypes.PoolCloseEvent) => {
          closePoolEvents.push(event);
          return Promise.resolve();
        },
        errorCallback: async (error, subscription) => {
          console.error(error);
          subscription.unsubscribe();
          return Promise.resolve();
        },
      });

      await Close.execute(signer, {
        initialFields: { walphContract: walphleContractId },
      });

      const closePoolState = await walphleDeployed.fetchState();
      const closeState = closePoolState.fields.open;
      expect(closeState).toEqual(false);

      expect(closePoolEvents.length).toEqual(1);
      subscription.unsubscribe();

      const openPoolEvents: WalphTypes.PoolOpenEvent[] = [];
      const subscriptionPoolOpen = walph.subscribePoolCloseEvent({
        pollingInterval: 10,
        messageCallback: async (event: WalphTypes.PoolOpenEvent) => {
          openPoolEvents.push(event);
          return Promise.resolve();
        },
        errorCallback: async (error, subscriptionPoolOpen) => {
          console.error(error);
          subscriptionPoolOpen.unsubscribe();
          return Promise.resolve();
        },
      });

      await Open.execute(signer, {
        initialFields: { walphContract: walphleContractId },
      });

      const poolState = await walphleDeployed.fetchState();
      const openState = poolState.fields.open;
      expect(openState).toEqual(true);

      expect(openPoolEvents.length).toEqual(1);
      subscriptionPoolOpen.unsubscribe();
    });
});
