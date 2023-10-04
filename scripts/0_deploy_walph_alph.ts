import { Deployer, DeployFunction, getNetwork, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { Walph, Walph50HodlAlf, WalphTypes, Walph50HodlAlfTypes, Walf, WalfTypes, WalphTimed, WalphTimedTypes, Wayin, WayinTypes } from '../artifacts/ts'
import { DUST_AMOUNT, ZERO_ADDRESS } from '@alephium/web3'
import { mintToken, transfer } from '@alephium/web3-test'



const deployWalph: DeployFunction<Settings> = async (
  deployer: Deployer
): Promise<void> => {
 
  //const alf = (await mintToken(deployer.account.address, 2000n * 10n ** 18n)).contractId
  //const mainnetAlf = "66da610efb5129c062e88e5fd65fe810f31efd1597021b2edf887a4360fa0800"
  const poolSize = 85

  let ticketPrice = 5
  let repeatEvery = 86400*1000
  let drawTimestamp = BigInt(Date.now()+repeatEvery)
  const resultTimedWalph = await deployer.deployContract(WalphTimed, {
    // The initial states of the faucet contract
    initialFields: {
        poolSize: BigInt(poolSize * ticketPrice) * 10n ** 18n,
        poolOwner: deployer.account.address,
        poolFees: 1n,
        ticketPrice: BigInt(ticketPrice) * 10n ** 18n,
        open: true,
        balance: 0n,
        feesBalance: 0n,
        numAttendees: 0n,
        drawTimestamp: drawTimestamp,
        repeatEvery: BigInt(repeatEvery),
        attendees: Array(poolSize).fill(ZERO_ADDRESS) as WalphTimedTypes.Fields["attendees"],
        lastWinner: ZERO_ADDRESS

      },
  },"BlitzOneDay")


  console.log("First draw in: "+ new Date(Number(drawTimestamp)))
  console.log('Walph Timed 1d contract id: ' + resultTimedWalph.contractInstance.contractId)
  console.log('Walph Timed 1d contract address: ' + resultTimedWalph.contractInstance.address)

  ticketPrice = 10
  repeatEvery = 259200*1000
  drawTimestamp = BigInt(Date.now()+repeatEvery)
  const resultTimedThreeDaysWalph = await deployer.deployContract(WalphTimed, {
    // The initial states of the faucet contract
    initialFields: {
        poolSize: BigInt(poolSize * ticketPrice) * 10n ** 18n,
        poolOwner: deployer.account.address,
        poolFees: 1n,
        ticketPrice: BigInt(ticketPrice) * 10n ** 18n,
        open: true,
        balance: 0n,
        feesBalance: 0n,
        numAttendees: 0n,
        drawTimestamp: drawTimestamp,
        repeatEvery: BigInt(repeatEvery),
        attendees: Array(poolSize).fill(ZERO_ADDRESS) as WalphTimedTypes.Fields["attendees"],
        lastWinner: ZERO_ADDRESS

      },
  },"BlitzThreeDays")


  console.log("First draw in: "+ new Date(Number(drawTimestamp)))
  console.log('Walph Timed 3d contract id: ' + resultTimedThreeDaysWalph.contractInstance.contractId)
  console.log('Walph Timed 3d contract address: ' + resultTimedThreeDaysWalph.contractInstance.address)

}

export default deployWalph