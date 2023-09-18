/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { RunScriptResult, DeployContractExecutionResult } from "@alephium/cli";
import { NetworkId } from "@alephium/web3";
import {
  Walph,
  WalphInstance,
  Walph50HodlAlf,
  Walph50HodlAlfInstance,
  Walf,
  WalfInstance,
  WalphTimed,
  WalphTimedInstance,
} from ".";
import { default as devnetDeployments } from "../.deployments.devnet.json";

export type Deployments = {
  deployerAddress: string;
  contracts: {
    Walph: DeployContractExecutionResult<WalphInstance>;
    Walph50HodlAlf: DeployContractExecutionResult<Walph50HodlAlfInstance>;
    Walf: DeployContractExecutionResult<WalfInstance>;
    WalphTimed: DeployContractExecutionResult<WalphTimedInstance>;
  };
};

function toDeployments(json: any): Deployments {
  const contracts = {
    Walph: {
      ...json.contracts["Walph"],
      contractInstance: Walph.at(
        json.contracts["Walph"].contractInstance.address
      ),
    },
    Walph50HodlAlf: {
      ...json.contracts["Walph50HodlAlf"],
      contractInstance: Walph50HodlAlf.at(
        json.contracts["Walph50HodlAlf"].contractInstance.address
      ),
    },
    Walf: {
      ...json.contracts["Walf"],
      contractInstance: Walf.at(
        json.contracts["Walf"].contractInstance.address
      ),
    },
    WalphTimed: {
      ...json.contracts["WalphTimed"],
      contractInstance: WalphTimed.at(
        json.contracts["WalphTimed"].contractInstance.address
      ),
    },
  };
  return {
    ...json,
    contracts: contracts as Deployments["contracts"],
  };
}

export function loadDeployments(
  networkId: NetworkId,
  deployerAddress?: string
): Deployments {
  const deployments = networkId === "devnet" ? devnetDeployments : undefined;
  if (deployments === undefined) {
    throw Error("The contract has not been deployed to the " + networkId);
  }
  const allDeployments = Array.isArray(deployments)
    ? deployments
    : [deployments];
  if (deployerAddress === undefined) {
    if (allDeployments.length > 1) {
      throw Error(
        "The contract has been deployed multiple times on " +
          networkId +
          ", please specify the deployer address"
      );
    } else {
      return toDeployments(allDeployments[0]);
    }
  }
  const result = allDeployments.find(
    (d) => d.deployerAddress === deployerAddress
  );
  if (result === undefined) {
    throw Error("The contract deployment result does not exist");
  }
  return toDeployments(result);
}
