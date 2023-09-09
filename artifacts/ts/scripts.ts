/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  ExecutableScript,
  ExecuteScriptParams,
  ExecuteScriptResult,
  Script,
  SignerProvider,
  HexString,
} from "@alephium/web3";
import { default as BuyScriptJson } from "../Buy.ral.json";
import { default as BuyWithoutTokenScriptJson } from "../BuyWithoutToken.ral.json";
import { default as BuyTicketTokenScriptJson } from "../BuyTicketToken.ral.json";
import { default as OpenScriptJson } from "../Open.ral.json";
import { default as CloseScriptJson } from "../Close.ral.json";
import { default as DestroyScriptJson } from "../Destroy.ral.json";

export const Buy = new ExecutableScript<{
  walphContract: HexString;
  amount: bigint;
  tokenId: HexString;
  tokenIdAmount: bigint;
}>(Script.fromJson(BuyScriptJson));
export const BuyWithoutToken = new ExecutableScript<{
  walphContract: HexString;
  amount: bigint;
}>(Script.fromJson(BuyWithoutTokenScriptJson));
export const BuyTicketToken = new ExecutableScript<{
  walfContract: HexString;
  amount: bigint;
  tokenId: HexString;
}>(Script.fromJson(BuyTicketTokenScriptJson));
export const Open = new ExecutableScript<{ walphContract: HexString }>(
  Script.fromJson(OpenScriptJson)
);
export const Close = new ExecutableScript<{ walphContract: HexString }>(
  Script.fromJson(CloseScriptJson)
);
export const Destroy = new ExecutableScript<{ walphContract: HexString }>(
  Script.fromJson(DestroyScriptJson)
);
