import { Deployments, waitTxConfirmed } from "@alephium/cli";
import {
  DUST_AMOUNT,
  web3,
  Project,
  NodeProvider,
  SignerProvider,
  Contract,
  ONE_ALPH,
} from "@alephium/web3";
import { PrivateKeyWallet } from "@alephium/web3-wallet";
import configuration from "../alephium.config";
import { Destroy, Draw, Walph, WalphTimed, WalphTimedTypes, WalphTimedToken, WithdrawFees } from "../artifacts/ts";

// The `TokenFaucetTypes.WithdrawEvent` is generated in the getting-started guide

async function draw(privKey: string, group: number, contractName: string) {

  const wallet = new PrivateKeyWallet({
    privateKey: privKey,
    keyType: undefined,
    nodeProvider: web3.getCurrentNodeProvider(),
  });

  //.deployments contains the info of our `TokenFaucet` deployement, as we need to now the contractId and address
  //This was auto-generated with the `cli deploy` of our `scripts/0_deploy_faucet.ts`
  const deployments = await Deployments.from(
    "./artifacts/.deployments." + networkToUse + ".json"
  );
  //Make sure it match your address group
  const accountGroup = group;
  const deployed = deployments.getDeployedContractResult(
    accountGroup,
    contractName
  )
  const walpheContractId = deployed.contractInstance.contractId;
  const walpheContractAddress = deployed.contractInstance.address;
  let drawInProgress = false

  const stringWalphContractAddress = walpheContractAddress

  const drawChecker = async function() {
    const balanceContract = await nodeProvider.addresses.getAddressesAddressBalance(walpheContractAddress)
    console.log(stringWalphContractAddress+" "+ contractName+" - Balance contract is " + balanceContract.balanceHint )

    let WalphState
    WalphState = WalphTimed.at(walpheContractAddress)
    if (contractName.toLowerCase().includes("ayin") || contractName.toLowerCase().includes("alf"))
      WalphState = WalphTimedToken.at(walpheContractAddress)



    const initialState = await WalphState.fetchState()

    const poolSize = initialState.fields.poolSize / initialState.fields.ticketPrice
    
    console.log(stringWalphContractAddress+" "+ contractName + " - Next draw: "+ new Date(Number(initialState.fields.drawTimestamp)))
    if (initialState.fields.drawTimestamp <= Date.now() || initialState.fields.numAttendees >= poolSize && !drawInProgress ){
        drawInProgress = true

      if (initialState.fields.numAttendees >= poolSize)
        console.log("drawn because pool full, numAttendees "+ initialState.fields.numAttendees)
      else
        console.log("drawn because timed out")

    const txDraw = await Draw.execute(wallet, {
      initialFields: { walphContract: walpheContractId},
      attoAlphAmount: 5n * DUST_AMOUNT,
    });
    console.log(stringWalphContractAddress+" "+ contractName +" - "+"Draw tx: "+ txDraw.txId)
    await waitTxConfirmed(nodeProvider, txDraw.txId,1 ,10000 )

    drawInProgress = false
    console.log(stringWalphContractAddress+" "+ contractName + " drawn")
    
  }

    setTimeout(drawChecker, Number(initialState.fields.drawTimestamp) - Date.now());
}

drawChecker()

    
}


const networkToUse = "mainnet";
//Select our network defined in alephium.config.ts
const network = configuration.networks[networkToUse];

//NodeProvider is an abstraction of a connection to the Alephium network
const nodeProvider = new NodeProvider(network.nodeUrl);

//Sometimes, it's convenient to setup a global NodeProvider for your project:
web3.setCurrentNodeProvider(nodeProvider);

const numberOfKeys = configuration.networks[networkToUse].privateKeys.length

Array.from(Array(numberOfKeys).keys()).forEach((group) => {
  //distribute(configuration.networks[networkToUse].privateKeys[group], group, "Walph");
  //distribute(configuration.networks[networkToUse].privateKeys[group], group, "Walph50HodlAlf");
  draw(configuration.networks[networkToUse].privateKeys[group], group, "WalphTimed:BlitzOneDay");
  draw(configuration.networks[networkToUse].privateKeys[group], group, "WalphTimed:BlitzOneDayOneAlph");
  draw(configuration.networks[networkToUse].privateKeys[group], group, "WalphTimed:BlitzThreeDays");
  
  draw(configuration.networks[networkToUse].privateKeys[group], group, "WalphTimedToken:BlitzThreeDaysAlf");
  draw(configuration.networks[networkToUse].privateKeys[group], group, "WalphTimedToken:BlitzThreeDaysAyin");

});
