import { web3, Project, stringToHex, ONE_ALPH, DUST_AMOUNT, sleep, ZERO_ADDRESS, sign, ALPH_TOKEN_ID } from '@alephium/web3'
import { NodeWallet, PrivateKeyWallet } from '@alephium/web3-wallet'
import { WalphTimed, Buy, Open,Close, WalphTimedTypes, Destroy, BuyWithoutToken, WithdrawFees, Draw, BuyTimedWithoutToken, DestroyBlitz } from '../../artifacts/ts'
import configuration, { Settings } from '../../alephium.config'
import * as dotenv from 'dotenv'
import { waitTxConfirmed } from '@alephium/cli'
import { getSigner, testPrivateKey, transfer } from '@alephium/web3-test'

dotenv.config()


let signer
let signerAddress
let rndSignerBuy
let testGroup

const tokenIdToHold = "3f52b6bdb8678b8931d683bbae1bd7c5296f70a2ab87bbd1792cb24f9b1d1500"
const networkToUse = 'devnet'

describe('integration tests', () => {
  beforeAll(async () => {
    web3.setCurrentNodeProvider(configuration.networks[networkToUse].nodeUrl, undefined, fetch)
    await Project.build()
  
 // rndSignerBuy = new PrivateKeyWallet({privateKey: configuration.networks[networkToUse].privateKeys[1] , keyType: undefined, nodeProvider: web3.getCurrentNodeProvider()})

  signer = new PrivateKeyWallet({ privateKey: testPrivateKey })

  signerAddress = await signer.account.address
  testGroup = signer.account.group
  
  })
  
  jest.setTimeout(100000)
  it('should test Blitz', async () => {
    
    const deployResult = await WalphTimed.deploy(
      signer,
      {
        initialFields: {
            poolSize: 10n * 10n ** 18n,
            poolOwner: signerAddress,
            poolFees: 1n,
            ticketPrice: 10n ** 18n,
            minTokenAmountToHold: 0n,
            tokenIdToHold: tokenIdToHold,
            drawTimestamp: BigInt(Date.now()+5000),
            open: true,
            balance: 0n,
            feesBalance: 0n,
            numAttendees: 0n,
            attendees: Array(10).fill(ZERO_ADDRESS) as WalphTimedTypes.Fields["attendees"],
            lastWinner: ZERO_ADDRESS

          },
      }
    )

    
    const walph = deployResult.contractInstance
    const walphleContractId = deployResult.contractInstance.contractId
    const walphContractAddress = deployResult.contractInstance.address

    console.log("Contract deployed at: "+walphleContractId+" "+walphContractAddress)
    expect(deployResult.contractInstance.groupIndex).toEqual(testGroup)

    const walphleDeployed = WalphTimed.at(walphContractAddress)


    const initialState = await walphleDeployed.fetchState()
    const initialBalance = initialState.fields.balance
    expect(initialBalance).toEqual(0n)

    const getPoolSize = await walph.methods.getPoolSize()
    expect(getPoolSize.returns).toEqual(10n * 10n ** 18n)
  
    const ticketBoughtEvents: WalphTimedTypes.TicketBoughtEvent[] = []
    const subscription = walph.subscribeTicketBoughtEvent({
      pollingInterval: 1,
      messageCallback: async (event: WalphTimedTypes.TicketBoughtEvent) => {
        ticketBoughtEvents.push(event)
        return Promise.resolve()
      },
      errorCallback: async (error, subscription) => {
        console.error(error)
        subscription.unsubscribe()
        return Promise.resolve()
      }
    })

      const contractBalance = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(walphContractAddress)
      expect(parseInt(contractBalance.balance)).toBeGreaterThanOrEqual(ONE_ALPH)

      const firstAttendee = await getSigner()
      await transfer(signer,firstAttendee.address,ALPH_TOKEN_ID, 200n * ONE_ALPH)
      // simulate someone buying tickets
      for (let i = 0; i < 9; i++) {
        await BuyTimedWithoutToken.execute(firstAttendee, {
          initialFields: {walphContract: walphleContractId , amount: ONE_ALPH},
          attoAlphAmount:  ONE_ALPH + 2n * DUST_AMOUNT,
          
        })
        
      }

      const afterPoolFull = await walphleDeployed.fetchState()
      const afterPoolFullOpenState = afterPoolFull.fields.open
      const afterPoolFullBalanceState = afterPoolFull.fields.balance
      const afterPoolFullNumAttendeesState = afterPoolFull.fields.numAttendees
      const afterPoolFullAttendeesState = afterPoolFull.fields.attendees


      console.log("Pool state: "+afterPoolFullOpenState + " Balance: "+afterPoolFullBalanceState/10n**18n+ " Attendees: " + afterPoolFullAttendeesState)
      let expectedArray = Array(9).fill(firstAttendee.address) as WalphTimedTypes.Fields["attendees"]
      expectedArray[9] = ZERO_ADDRESS

      expect(afterPoolFullOpenState).toEqual(true)
      expect(afterPoolFullBalanceState).toEqual(9n * 10n ** 18n)
      expect(afterPoolFullNumAttendeesState).toEqual(9n)
      expect(afterPoolFullAttendeesState).toEqual(expectedArray)


      //expect(ticketBoughtEvents.length).toEqual(9)
      
      //buy last ticket to draw the pool
      const lastOne = await getSigner()
      await transfer(signer, lastOne.address, ALPH_TOKEN_ID, 100n *ONE_ALPH)
      await BuyTimedWithoutToken.execute(lastOne, {
        initialFields: {walphContract: walphleContractId , amount: ONE_ALPH},
        attoAlphAmount: ONE_ALPH + DUST_AMOUNT,
        
      })

      //wait for pool to be closed
      let statePoolTimeStamp = await walphleDeployed.fetchState()
      console.log(statePoolTimeStamp,Date.now())
      while(statePoolTimeStamp.fields.drawTimestamp > Date.now()){
        sleep(1000)
      }


      await Draw.execute(signer, {
        initialFields: {walphContract: walphleContractId},
        attoAlphAmount: DUST_AMOUNT,
      })


      const contractAfterPoolDistributionBalance = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(walphContractAddress)
      expect(contractAfterPoolDistributionBalance.balanceHint).toEqual("1.1 ALPH")
      const winnerBalance = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(signer.address)


      const afterPoolDistribution = await walphleDeployed.fetchState()
      const afterPoolDistributionOpenState = afterPoolDistribution.fields.open
      const afterPoolDistributionBalanceState = afterPoolDistribution.fields.balance
      const afterPoolDistributionNumAttendeesState = afterPoolDistribution.fields.numAttendees
      const afterPoolDistributionWinner = afterPoolDistribution.fields.lastWinner

      console.log("Pool state: "+afterPoolDistributionOpenState + " Balance: "+afterPoolDistributionBalanceState/10n**18n + " Fields: "+ JSON.stringify(afterPoolDistribution.fields))
      expect(afterPoolDistributionOpenState).toEqual(true)
      expect(afterPoolDistributionBalanceState).toEqual(0n)
      expect(afterPoolDistributionNumAttendeesState).toEqual(0n)
      expect([firstAttendee.address,lastOne.address].includes(afterPoolDistributionWinner)).toBe(true)

      subscription.unsubscribe()

      await WithdrawFees.execute(signer, {
        initialFields: { walphContract: walphleContractId},
        attoAlphAmount: DUST_AMOUNT
      })

      const afterWhitdraw = await walphleDeployed.fetchState()
      expect(afterWhitdraw.fields.feesBalance).toEqual(0n)
      const afterWhitdrawBalance = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(walphContractAddress)
      expect(afterWhitdrawBalance.balanceHint).toEqual("1 ALPH")

     await DestroyBlitz.execute(signer, {
        initialFields: { walphContract: walphleContractId},
        attoAlphAmount: DUST_AMOUNT

      })
      /*
      const contractBalance = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(walphContractAddress)
      expect(web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(walphContractAddress)).toEqual(0n)*/

  }
)

})
