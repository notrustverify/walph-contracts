import { Deployer, DeployFunction, getNetwork, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { Walph, Walph50HodlAlf, WalphTypes, Walph50HodlAlfTypes, Walf, WalfTypes, WalphTimedTokenTypes, Wayin, WayinTypes, WalphTimedToken } from '../artifacts/ts'
import { DUST_AMOUNT, ZERO_ADDRESS } from '@alephium/web3'
import { mintToken, transfer } from '@alephium/web3-test'



const deployWalph: DeployFunction<Settings> = async (
  deployer: Deployer
): Promise<void> => {
 
  const tokenContractId = (await mintToken(deployer.account.address, 2000n * 10n ** 18n)).contractId
  const tokenDecimal = 18n

  const poolSize = 83

  let ticketPrice = 1
  let repeatEvery = 259200*1000
  let drawTimestamp = BigInt(Date.now()+repeatEvery)
  const resultTimedThreeDaysWalph = await deployer.deployContract(WalphTimedToken, {
    // The initial states of the faucet contract
    initialFields: {
      poolSize: BigInt(poolSize * ticketPrice) * 10n ** tokenDecimal,
      poolOwner: deployer.account.address,
      poolFees: 1n,
      tokenId: tokenContractId,
      ticketPrice: BigInt(ticketPrice) * 10n ** tokenDecimal,
      open: true,
      balance: 0n,
      feesBalance: 0n,
      dustBalance: 0n,
      numAttendees: 0n,
      drawTimestamp: drawTimestamp,
      repeatEvery: BigInt(repeatEvery),
      attendees: Array(poolSize).fill(ZERO_ADDRESS) as WalphTimedTokenTypes.Fields["attendees"],
      lastWinner: ZERO_ADDRESS

    },
},"BlitzThreeDaysAyin")


  console.log("First draw in: "+ new Date(Number(drawTimestamp)))
  console.log('Walph Ayin Timed 3d contract id: ' + resultTimedThreeDaysWalph.contractInstance.contractId)
  console.log('Walph Ayin Timed 3d contract address: ' + resultTimedThreeDaysWalph.contractInstance.address)

}

export default deployWalph