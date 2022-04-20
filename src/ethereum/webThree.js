import Web3 from "web3";

let web3;

const provider = new Web3.providers.HttpProvider(
  "https://rinkeby.infura.io/v3/8c6a3e46d78044648168f270509e1fdd"
);
web3 = new Web3(provider);

export default web3;
