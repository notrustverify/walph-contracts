import { Deployer, DeployFunction, getNetwork, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { Walph, Walph50HodlAlf, WalphTypes, Walph50HodlAlfTypes, Walf, WalfTypes, WalphTimedTokenTypes, Wayin, WayinTypes, WalphTimedToken } from '../artifacts/ts'
import { DUST_AMOUNT, ZERO_ADDRESS } from '@alephium/web3'
import { mintToken, transfer } from '@alephium/web3-test'



const deployWalph: DeployFunction<Settings> = async (
  deployer: Deployer
): Promise<void> => {
 

  const udstContractId = "556d9582463fe44fbd108aedc9f409f69086dc78d994b88ea6c9e65f8bf98e00"
  let tokenDecimal = 6n

  const poolSize = 83

  let ticketPrice = 1
  let repeatEvery = 259200*1000
  let drawTimestamp = BigInt(Date.now()+repeatEvery)
  const resultTimedThreeDaysUsdt = await deployer.deployContract(WalphTimedToken, {
    // The initial states of the faucet contract
    initialFields: {
      poolSize: BigInt(poolSize * ticketPrice) * 10n ** tokenDecimal,
      poolOwner: deployer.account.address,
      poolFees: 1n,
      tokenId: udstContractId,
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
},"BlitzThreeDaysUSDT")


  console.log("First draw in: "+ new Date(Number(drawTimestamp)))
  console.log('Walph USDT Timed 3d contract id: ' + resultTimedThreeDaysUsdt.contractInstance.contractId)
  console.log('Walph USDT Timed 3d contract address: ' + resultTimedThreeDaysUsdt.contractInstance.address)


  const usdcContractId = "722954d9067c5a5ad532746a024f2a9d7a18ed9b90e27d0a3a504962160b5600"
tokenDecimal = 6n

  ticketPrice = 1
  repeatEvery = 259200*1000
  drawTimestamp = BigInt(Date.now()+repeatEvery)
  const resultTimedThreeDaysUsdc = await deployer.deployContract(WalphTimedToken, {
    // The initial states of the faucet contract
    initialFields: {
      poolSize: BigInt(poolSize * ticketPrice) * 10n ** tokenDecimal,
      poolOwner: deployer.account.address,
      poolFees: 1n,
      tokenId: usdcContractId,
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
},"BlitzThreeDaysUSDC")


  console.log("First draw in: "+ new Date(Number(drawTimestamp)))
  console.log('Walph USDC Timed 3d contract id: ' + resultTimedThreeDaysUsdc.contractInstance.contractId)
  console.log('Walph USDC Timed 3d contract address: ' + resultTimedThreeDaysUsdc.contractInstance.address)


}

export default deployWalph