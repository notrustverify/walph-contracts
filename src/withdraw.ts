import { Deployments, waitTxConfirmed } from "@alephium/cli";
import {
  DUST_AMOUNT,
  web3,
  Project,
  NodeProvider,
  SignerProvider,
  Contract,
  ONE_ALPH,
  contractIdFromAddress,
  binToHex,
} from "@alephium/web3";
import { PrivateKeyWallet } from "@alephium/web3-wallet";
import configuration from "../alephium.config";
import { Destroy, Walph, WalphTypes, WithdrawFees } from "../artifacts/ts";

// The `TokenFaucetTypes.WithdrawEvent` is generated in the getting-started guide
const events: WalphTypes.PoolCloseEvent[] = [];
const subscribeOptions = {
  // It will check for new events from the full node every `pollingInterval`
  pollingInterval: 40000,
  // The callback function will be called for each event
  messageCallback: (event: WalphTypes.PoolCloseEvent): Promise<void> => {
    events.push(event);
    return Promise.resolve();
  },
  // This callback function will be called when an error occurs
  errorCallback: (
    error: any,
    subscription: { unsubscribe: () => void }
  ): Promise<void> => {
    console.log(error);
    subscription.unsubscribe();
    return Promise.resolve();
  },
};


async function withdraw(privKey: string, group: number, contractName?: string, addressContract?: string) {

  const wallet = new PrivateKeyWallet({
    privateKey: privKey,
    keyType: undefined,
    nodeProvider: web3.getCurrentNodeProvider(),
  });

  let walpheContractId
  let walpheContractAddress

  if (contractAddress === undefined) {
  const deployments = await Deployments.from(
    "./artifacts/.deployments." + networkToUse + ".json"
  );
  //Make sure it match your address group
  const accountGroup = group;
  const deployed = deployments.getDeployedContractResult(
    accountGroup,
    contractName
  );
    walpheContractId = deployed.contractInstance.contractId;
    walpheContractAddress = deployed.contractInstance.address;
  }

  if (contractAddress !== undefined) {
    walpheContractId = binToHex(contractIdFromAddress(contractAddress));
    walpheContractAddress = contractAddress;
  }

    const balanceContract = await nodeProvider.addresses.getAddressesAddressBalance(walpheContractAddress)
    console.log(walpheContractAddress+" - Balance contract is " + balanceContract.balanceHint )

    if (parseInt(balanceContract.balance) > ONE_ALPH){
    const withdrawTxId = await WithdrawFees.execute(wallet, {
      initialFields: { walphContract: walpheContractId},
      attoAlphAmount: DUST_AMOUNT,
    });
    
    console.log("Wait for " + withdrawTxId.txId + " to withdraw the contract ");

    const addressBalance = await nodeProvider.addresses.getAddressesAddressBalance(wallet.address)
    console.log("Address balance: "+ addressBalance.balanceHint )
    console.log(walpheContractAddress + " withdrawed")
  console.log("\n")
  }

    
}

const networkToUse = process.argv.slice(2)[0];
const group = parseInt(process.argv.slice(2)[1]);
const contractAddress = process.argv.slice(2)[2];

//Select our network defined in alephium.config.ts
const network = configuration.networks[networkToUse];

//NodeProvider is an abstraction of a connection to the Alephium network
const nodeProvider = new NodeProvider(network.nodeUrl);

//Sometimes, it's convenient to setup a global NodeProvider for your project:
web3.setCurrentNodeProvider(nodeProvider);

if (contractAddress !== undefined){
  withdraw(
    configuration.networks[networkToUse].privateKeys[group],
    group,
    "",
    contractAddress
  );
}



if (contractAddress === undefined){
const numberOfKeys = configuration.networks[networkToUse].privateKeys.length

Array.from(Array(numberOfKeys).keys()).forEach((group) => {
  //distribute(configuration.networks[networkToUse].privateKeys[group], group, "Walph");
  //distribute(configuration.networks[networkToUse].privateKeys[group], group, "Walph50HodlAlf");
  withdraw(configuration.networks[networkToUse].privateKeys[group], group, "Walph");

});
}
