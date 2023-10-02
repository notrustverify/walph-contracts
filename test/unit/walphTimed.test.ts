import {
    web3,
    Project,
    TestContractParams,
    addressFromContractId,
    AssetOutput,
    DUST_AMOUNT,
    addressFromPublicKey,
    ZERO_ADDRESS,
    ContractState,
    NamedVals,
    sleep,
    ONE_ALPH,
  } from "@alephium/web3";
  import { PrivateKeyWallet } from "@alephium/web3-wallet";
  import {
    expectAssertionError,
    randomContractId,
    testAddress,
    testPrivateKey,
  } from "@alephium/web3-test";
  import { WalphTimed, WalphTimedTypes } from "../../artifacts/ts";
  
  describe("unit tests", () => {
    let testContractId: string;
    let testTokenId: string;
    let testContractAddress: string;
    let testParamsFixture: TestContractParams<
      WalphTimedTypes.Fields,
      { amount: bigint }
    >;
    
    // We initialize the fixture variables before all tests
    beforeAll(async () => {
      web3.setCurrentNodeProvider("http://127.0.0.1:22973", undefined, fetch);
      await Project.build();
      testContractId = randomContractId();
  
      testTokenId = testContractId;
      testContractAddress = addressFromContractId(testContractId);
      testParamsFixture = {
        // a random address that the test contract resides in the tests
        address: testContractAddress,
  
        // initial state of the test contract
        initialFields: {
          poolSize: 80n * 10n ** 18n,
          poolOwner: testAddress,
          poolFees: 1n,
          ticketPrice: 10n ** 18n,
          open: false,
          balance: 0n,
          feesBalance: 0n,
          numAttendees: 0n,
          drawTimestamp: BigInt(Date.now()+600*1000), // time now + 10 minutes
          repeatEvery: BigInt(600*1000),
          attendees: Array(80).fill(
            ZERO_ADDRESS
          ) as WalphTimedTypes.Fields["attendees"],
          lastWinner: ZERO_ADDRESS,
        },
        initialAsset: {
          alphAmount: 1n * 10n ** 18n,
        },
        // arguments to test the target function of the test contract
        testArgs: {
          amount: 1n * 10n ** 18n,
        },
        // assets owned by the caller of the function
        inputAssets: [
          {
            address: testAddress,
            asset: {
              alphAmount: 100n * 10n ** 18n,
              tokens: [
                {
                  id: "47504df5a7b18dcecdbf1ea00b7e644d0a7c93919f2d2061ba153f241f03b801",
                  amount: 2n,
                },
              ],
            },
          },
        ],
      };
    });
  
    it("test try random", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.numAttendees = 10
      let runs = [0n,0n]
  
      // open the pool
      let testResult = await WalphTimed.tests.random(testParams);
      runs[0] = testResult.returns
      sleep(1000)
      testResult = await WalphTimed.tests.random(testParams);
  
      runs[1] = testResult.returns
      console.log(runs)
  
      expect(runs[0]).not.toEqual(runs[1])
  
    })
  
    it("test opening and closing pool", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
  
      // open the pool
      let testResult = await WalphTimed.tests.openPool(testParams);
      let contractState = testResult.contracts[0] as WalphTimedTypes.State;
  
      expect(contractState.address).toEqual(testContractAddress);
      expect(contractState.fields.open).toEqual(true);
  
      //assign new state to initial fields and close the pool
      testParams.initialFields = contractState.fields;
      testResult = await WalphTimed.tests.closePool(testParams);
  
      contractState = testResult.contracts[0] as WalphTimedTypes.State;
      expect(contractState.fields.open).toEqual(false);
    });
  
    it("test try to open an opened pool", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
  
      await expectAssertionError(
        WalphTimed.tests.openPool(testParams),
        testContractAddress,
        2
      );
    });
  
    it("test try to close a closed pool", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = false;
  
      await expectAssertionError(
        WalphTimed.tests.closePool(testParams),
        testContractAddress,
        1
      );
    });
  
    it("test try to open the pool with wrong address", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      const wrongAddress = PrivateKeyWallet.Random(
        0,
        web3.getCurrentNodeProvider()
      ).account.address;
      testParams.inputAssets[0].address = wrongAddress;
      testParams.initialFields.open = false;
  
      await expectAssertionError(
        WalphTimed.tests.openPool(testParams),
        testContractAddress,
        4
      );
    });
  
    it("test buy a ticket", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.inputAssets[0].address = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
  
      const testResult = await WalphTimed.tests.buyTicket(testParams);
      const contractState = testResult.contracts[0] as WalphTimedTypes.State;
  
      expect(contractState.fields.balance).toEqual(10n ** 18n);
      expect(contractState.fields.feesBalance).toEqual(10n ** 16n)
      expect(contractState.fields.attendees.length).toEqual(80);
      expect(contractState.fields.numAttendees).toEqual(1n);
      
      const expectedArray = Array(80).fill(
        ZERO_ADDRESS
      ) as WalphTimedTypes.Fields["attendees"]
      expectedArray[0] = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      expect(contractState.fields.attendees).toEqual(expectedArray);
    });
  
  
    it("test buy 5 tickets", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.inputAssets[0].address = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      testParams.testArgs.amount = 5n * 10n ** 18n
      const testResult = await WalphTimed.tests.buyTicket(testParams);
      const contractState = testResult.contracts[0] as WalphTimedTypes.State;
  
      expect(contractState.fields.balance).toEqual(5n * 10n ** 18n);
      expect(contractState.fields.feesBalance).toEqual(5n * 10n ** 16n)
      expect(contractState.fields.attendees.length).toEqual(80);
      expect(contractState.fields.numAttendees).toEqual(5n);


      const expectedArray = Array(80).fill(
        ZERO_ADDRESS
      ) as WalphTimedTypes.Fields["attendees"]
      expectedArray[0] = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      expectedArray[1] = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      expectedArray[2] = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      expectedArray[3] = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      expectedArray[4] = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      expect(contractState.fields.attendees).toEqual(expectedArray);
    });
  
  
    it("test buy 3 tickets after 5 was bought", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.initialFields.balance = 5n * 10n ** 18n;
      testParams.initialFields.numAttendees = 5n;
      testParams.initialFields.feesBalance = 5n * 10n ** 16n
  
      testParams.inputAssets[0].address = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      testParams.testArgs.amount = 3n * 10n ** 18n
      const testResult = await WalphTimed.tests.buyTicket(testParams);
      const contractState = testResult.contracts[0] as WalphTimedTypes.State;
  
      expect(contractState.fields.balance).toEqual(8n * 10n ** 18n);
      expect(contractState.fields.feesBalance).toEqual(8n * 10n ** 16n);
      expect(contractState.fields.attendees.length).toEqual(80);
      expect(contractState.fields.numAttendees).toEqual(8n);

      const expectedArray = Array(80).fill(
        ZERO_ADDRESS
      ) as WalphTimedTypes.Fields["attendees"]
      expectedArray[5] = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      expectedArray[6] = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      expectedArray[7] = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      expect(contractState.fields.attendees).toEqual(expectedArray);
    });
  
  
  
    it("test buy a ticket more than 1 ALPH", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.inputAssets[0].address = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
  
      testParams.testArgs.amount = 11n * 10n ** 17n;
  
      await expectAssertionError(
        WalphTimed.tests.buyTicket(testParams),
        testContractAddress,
        7
      );
    });


    it("test buy a ticket more than 6 ALPH when ticket price is 5 ALPH min", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.inputAssets[0].address = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      testParams.initialFields.ticketPrice = 5n * 10n ** 18n
      testParams.testArgs.amount = 6n * 10n ** 18n;
  
      await expectAssertionError(
        WalphTimed.tests.buyTicket(testParams),
        testContractAddress,
        7
      );
    });
  
  
    it("test buy a ticket less than ticket price", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.initialFields.ticketPrice = 10n * 10n ** 18n
      testParams.inputAssets[0].address = "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
  
      testParams.testArgs.amount = 9n * 10n ** 18n;
  
      await expectAssertionError(
        WalphTimed.tests.buyTicket(testParams),
        testContractAddress,
        7
      );
    });

    it("test draw prize pool", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.initialFields.balance =  10 * 10 ** 18;
      testParams.initialAsset.alphAmount = 100 * 10 ** 18;
      testParams.initialFields.numAttendees = 10
      testParams.testArgs.amount = 10 * 10 ** 18
      testParams.initialFields.drawTimestamp = BigInt(Date.now()+1)
      testParams.initialFields.attendees = Array(80).fill(
        "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      ) as WalphTimedTypes.Fields["attendees"]

  
      const testResult = await WalphTimed.tests.draw(testParams);
      const contractState = testResult.contracts[0] as WalphTimedTypes.State;
  
      expect(contractState.fields.balance).toEqual(0n);
      expect(contractState.fields.open).toEqual(true);
      expect(contractState.fields.numAttendees).toEqual(0n);
      expect(contractState.fields.attendees.length).toEqual(80);
      expect(contractState.fields.lastWinner).toEqual("1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y");
    });
    

    it("test draw prize pool when attendees full", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.initialFields.balance =  10 * 10 ** 18;
      testParams.initialAsset.alphAmount = 100 * 10 ** 18;
      testParams.initialFields.numAttendees = 80
      testParams.testArgs.amount = 10 * 10 ** 18
      testParams.initialFields.drawTimestamp = BigInt(Date.now()+1000000)
      testParams.initialFields.attendees = Array(80).fill(
        "1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y"
      ) as WalphTimedTypes.Fields["attendees"]

  
      const testResult = await WalphTimed.tests.draw(testParams);
      const contractState = testResult.contracts[0] as WalphTimedTypes.State;
  
      expect(contractState.fields.balance).toEqual(0n);
      expect(contractState.fields.open).toEqual(true);
      expect(contractState.fields.numAttendees).toEqual(0n);
      expect(contractState.fields.attendees.length).toEqual(80);
      expect(contractState.fields.lastWinner).toEqual("1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y");
    });


    it("test draw balance 0", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.initialFields.balance =  0 * 10 ** 18;
      testParams.initialAsset.alphAmount = 100 * 10 ** 18;
      testParams.initialFields.numAttendees = 0
      testParams.testArgs.amount = 10 * 10 ** 18
      testParams.initialFields.drawTimestamp = BigInt(Date.now()+1)
      testParams.initialFields.attendees = Array(80).fill(
        ZERO_ADDRESS
      ) as WalphTimedTypes.Fields["attendees"]

  
      const testResult = await WalphTimed.tests.draw(testParams);
      const contractState = testResult.contracts[0] as WalphTimedTypes.State;
  
      expect(contractState.fields.balance).toEqual(0n);
      expect(contractState.fields.open).toEqual(true);
      expect(contractState.fields.numAttendees).toEqual(0n);
      expect(contractState.fields.attendees.length).toEqual(80);
      expect(contractState.fields.drawTimestamp).toBeGreaterThan(testParams.initialFields.drawTimestamp)
      expect(contractState.fields.lastWinner).toEqual(ZERO_ADDRESS);
    });


    it("test draw with only 1 attendee", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.initialFields.balance =  10 * 10 ** 18;
      testParams.initialAsset.alphAmount = 100 * 10 ** 18;
      testParams.initialFields.numAttendees = 1
      testParams.testArgs.amount = 10 * 10 ** 18
      testParams.initialFields.drawTimestamp = BigInt(Date.now()+1)
      testParams.initialFields.attendees = Array(80).fill(
        ZERO_ADDRESS
      ) as WalphTimedTypes.Fields["attendees"]

  
      const testResult = await WalphTimed.tests.draw(testParams);
      const contractState = testResult.contracts[0] as WalphTimedTypes.State;
  
      expect(contractState.fields.balance).toEqual(10n * ONE_ALPH);
      expect(contractState.fields.open).toEqual(true);
      expect(contractState.fields.numAttendees).toEqual(1n);
      expect(contractState.fields.attendees.length).toEqual(80);
      expect(contractState.fields.drawTimestamp).toBeGreaterThan(testParams.initialFields.drawTimestamp)
      expect(contractState.fields.lastWinner).toEqual(ZERO_ADDRESS);
    });


    it("test draw when not time", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.initialFields.balance =  10n * ONE_ALPH;
      testParams.initialAsset.alphAmount = 100 * 10 ** 18;
      testParams.initialFields.numAttendees = 10
      testParams.testArgs.amount = 10 * 10 ** 18
      testParams.initialFields.drawTimestamp = BigInt(Date.now()+600*1000)
      testParams.initialFields.attendees = Array(80).fill(
        ZERO_ADDRESS
      ) as WalphTimedTypes.Fields["attendees"]

      await expectAssertionError(
        WalphTimed.tests.draw(testParams),
        testContractAddress,
        8
      );
    });


    it("test while loop draw prize pool", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true;
      testParams.initialFields.balance =  10 * 10 ** 18;
      testParams.initialAsset.alphAmount = 100 * 10 ** 18;
      testParams.initialFields.numAttendees = 10
      testParams.testArgs.amount = 10 * 10 ** 18
      testParams.initialFields.drawTimestamp = BigInt(Date.now()+1)
      testParams.initialFields.attendees = Array(80).fill(
        ZERO_ADDRESS
      ) as WalphTimedTypes.Fields["attendees"]

      await expectAssertionError(
        WalphTimed.tests.draw(testParams),
        testContractAddress,
        10
      );
    });


  
    it("test withdraw fees", async () => {
      const testParams = JSON.parse(JSON.stringify(testParamsFixture));
      testParams.initialFields.open = true
      testParams.initialFields.balance =  0
      testParams.initialAsset.alphAmount = 100 * 10 ** 18
      testParams.initialFields.feesBalance = 3 * 10 ** 18
      
      const testResult = await WalphTimed.tests.withdraw(testParams);
      const contractState = testResult.contracts[0] as WalphTimedTypes.State;
  
      expect(contractState.fields.feesBalance).toEqual(0n);
  
    });

  });
  