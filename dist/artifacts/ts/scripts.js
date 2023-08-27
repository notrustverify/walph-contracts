"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Destroy = exports.Close = exports.Open = exports.Distribute = exports.Buy = void 0;
const web3_1 = require("@alephium/web3");
const Buy_ral_json_1 = __importDefault(require("../Buy.ral.json"));
const Distribute_ral_json_1 = __importDefault(require("../Distribute.ral.json"));
const Open_ral_json_1 = __importDefault(require("../Open.ral.json"));
const Close_ral_json_1 = __importDefault(require("../Close.ral.json"));
const Destroy_ral_json_1 = __importDefault(require("../Destroy.ral.json"));
exports.Buy = new web3_1.ExecutableScript(web3_1.Script.fromJson(Buy_ral_json_1.default));
exports.Distribute = new web3_1.ExecutableScript(web3_1.Script.fromJson(Distribute_ral_json_1.default));
exports.Open = new web3_1.ExecutableScript(web3_1.Script.fromJson(Open_ral_json_1.default));
exports.Close = new web3_1.ExecutableScript(web3_1.Script.fromJson(Close_ral_json_1.default));
exports.Destroy = new web3_1.ExecutableScript(web3_1.Script.fromJson(Destroy_ral_json_1.default));
