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
import {
  Destroy,
  Walph,
  WalphTypes,
  WalphTimed,
  WalphTimedTypes,
  DestroyBlitz,
} from "../artifacts/ts";

async function destroy(
  privKey: string,
  group: number,
  contractName: string,
  contractAddresses?: string
) {
  const wallet = new PrivateKeyWallet({
    privateKey: privKey,
    keyType: undefined,
    nodeProvider: web3.getCurrentNodeProvider(),
  });

  //.deployments contains the info of our `TokenFaucet` deployement, as we need to now the contractId and address
  //This was auto-generated with the `cli deploy` of our `scripts/0_deploy_faucet.ts`
  const deployments = await Deployments.from(
    "./to-destroy/.deployments." + networkToUse + ".json"
  );
  //Make sure it match your address group
  const accountGroup = group;
  let deployed;
  let walpheContractId;
  let walpheContractAddress;
  if (contractAddresses === undefined) {
    deployed = deployments.getDeployedContractResult(
      accountGroup,
      contractName
    );
    walpheContractId = deployed.contractInstance.contractId;
    walpheContractAddress = deployed.contractInstance.address;
  }

  console.log("Destroying " + contractName);

  if (deployed !== undefined || contractAddresses !== undefined) {
    if (contractAddresses !== undefined) {
      walpheContractId = binToHex(contractIdFromAddress(contractAddress));
      walpheContractAddress = contractAddress;
    }

    try {
      const balanceContract =
        await nodeProvider.addresses.getAddressesAddressBalance(
          walpheContractAddress
        );
      console.log(
        walpheContractAddress +
          " - Balance contract is " +
          balanceContract.balanceHint
      );

      let destroyTx;
      if (contractName.includes("WalphTimed")) {
        console.log("destroy blitz");
        destroyTx = await DestroyBlitz.execute(wallet, {
          initialFields: { walphContract: walpheContractId },
          attoAlphAmount: 5n * DUST_AMOUNT,
        });
      } else if (contractName.includes("Walph")) {
        destroyTx = await Destroy.execute(wallet, {
          initialFields: { walphContract: walpheContractId },
          attoAlphAmount: 5n * DUST_AMOUNT,
        });
      }

      console.log("Wait for " + destroyTx.txId + " to destroy the contract ");

      await waitTxConfirmed(nodeProvider, destroyTx.txId, 1, 1000);

      console.log(walpheContractAddress + " destroyed");
    } catch (error) {
      console.error(error)
      console.log("Contract " + walpheContractAddress + " not found, continue");
    }
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

const numberOfKeys = configuration.networks[networkToUse].privateKeys.length;

if (contractAddress !== undefined){
destroy(
  configuration.networks[networkToUse].privateKeys[group],
  group,
  "WalphTimed:BlitzOneDay",
  contractAddress
);

}

if (contractAddress === undefined){
Array.from(Array(numberOfKeys).keys()).forEach((group) => {
  //distribute(configuration.networks[networkToUse].privateKeys[group], group, "Walph");
  //distribute(configuration.networks[networkToUse].privateKeys[group], group, "Walph50HodlAlf");

  // destroy(configuration.networks[networkToUse].privateKeys[group], group, "Walph");

  
  destroy(
    configuration.networks[networkToUse].privateKeys[group],
    group,
    "WalphTimed:BlitzOneDay"
  );
  destroy(
    configuration.networks[networkToUse].privateKeys[group],
    group,
    "WalphTimed:BlitzOneDayOneAlph"  );
  destroy(
    configuration.networks[networkToUse].privateKeys[group],
    group,
    "WalphTimed:BlitzThreeDays"
  );
  destroy(
    configuration.networks[networkToUse].privateKeys[group],
    group,
    "WalphTimedToken:BlitzThreeDaysAlf"
  );
  destroy(
    configuration.networks[networkToUse].privateKeys[group],
    group,
    "WalphTimedToken:BlitzThreeDaysAyin"
  );

  /*destroy(configuration.networks[networkToUse].privateKeys[group], group, "Walf");
  destroy(configuration.networks[networkToUse].privateKeys[group], group, "Walph50HodlAlf");*/

  

})}
