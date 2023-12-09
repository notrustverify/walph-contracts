import { Deployer, DeployFunction, getNetwork, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { Walph, Walph50HodlAlf, WalphTypes, Walph50HodlAlfTypes, Walf, WalfTypes, WalphTimedTokenTypes, Wayin, WayinTypes, WalphTimedToken } from '../artifacts/ts'
import { DUST_AMOUNT, ZERO_ADDRESS } from '@alephium/web3'
import { mintToken, transfer } from '@alephium/web3-test'



const deployWalph: DeployFunction<Settings> = async (
  deployer: Deployer
): Promise<void> => {
 
  //const alfContractId = (await mintToken(deployer.account.address, 2000n * 10n ** 9n)).contractId
  const nguContractId = "df3008f43a7cc1d4a37eef71bf581fc4b9c3be4e2d58ed6d1df483bbb83bd200"
  const tokenDecimal = 7n

  const poolSize = 83

  let ticketPrice = 500
  let repeatEvery = 259200*1000
  let drawTimestamp = BigInt(Date.now()+repeatEvery)
  const resultTimedThreeDaysWalph = await deployer.deployContract(WalphTimedToken, {
    // The initial states of the faucet contract
    initialFields: {
      poolSize: BigInt(poolSize * ticketPrice) * 10n ** tokenDecimal,
      poolOwner: deployer.account.address,
      poolFees: 1n,
      tokenId: nguContractId,
      ticketPrice: BigInt(ticketPrice) * 10n ** tokenDecimal,
      open: true,
      balance: 0n,
      feesBalance: 0n,
      dustBalance: 0n,
      numAttendees: 0n,
      drawTimestamp: 0n,
      repeatEvery: BigInt(repeatEvery),
      attendees: Array(poolSize).fill(ZERO_ADDRESS) as WalphTimedTokenTypes.Fields["attendees"],
      lastWinner: ZERO_ADDRESS

    },
},"BlitzThreeDaysNgu")


  console.log("First draw in: "+ new Date(Number(drawTimestamp)))
  console.log('Walph Ngu Timed 3d contract id: ' + resultTimedThreeDaysWalph.contractInstance.contractId)
  console.log('Walph Ngu Timed 3d contract address: ' + resultTimedThreeDaysWalph.contractInstance.address)


  ticketPrice = 1000
  repeatEvery = 259200*1000
  drawTimestamp = BigInt(Date.now()+repeatEvery)
  const resultTimedFiveDaysWalph = await deployer.deployContract(WalphTimedToken, {
    // The initial states of the faucet contract
    initialFields: {
      poolSize: BigInt(poolSize * ticketPrice) * 10n ** tokenDecimal,
      poolOwner: deployer.account.address,
      poolFees: 1n,
      tokenId: nguContractId,
      ticketPrice: BigInt(ticketPrice) * 10n ** tokenDecimal,
      open: true,
      balance: 0n,
      feesBalance: 0n,
      dustBalance: 0n,
      numAttendees: 0n,
      drawTimestamp: 0n,
      repeatEvery: BigInt(repeatEvery),
      attendees: Array(poolSize).fill(ZERO_ADDRESS) as WalphTimedTokenTypes.Fields["attendees"],
      lastWinner: ZERO_ADDRESS

    },
},"BlitzFiveDaysNgu")


  console.log("First draw in: "+ new Date(Number(drawTimestamp)))
  console.log('Walph Ngu Timed 5d contract id: ' + resultTimedFiveDaysWalph.contractInstance.contractId)
  console.log('Walph Ngu Timed 5d contract address: ' + resultTimedFiveDaysWalph.contractInstance.address)



}

export default deployWalph