import { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const onConnect = async () => {
    const votes = "abc";
    const enyVotes = votes;
    console.log(enyVotes);
    const rsaPublicKey =
      "MIGfMA0ABCDGSIb3DQEBAQUAA4GNADCBiQKBgQCUoxX5qq9w2iZeqeuDnBDujOfp2cf6NFd3ioY7e6cg5wNTyr+wkTLZiIzEd8Uv8zwc+jvcFKeYXVh8dfdP0r/z/puTE0m1YAGG+260rthPcqlhpqhRr9ISFN6SeWSfLaV7IYL0NIjesz0f45MwRA/fhKKw1zw0Bvf1U8BMcPPamwIDAQAB";
    // const jsEncrypt = new JSEncrypt();
    // jsEncrypt.setPublicKey(rsaPublicKey);
    // const enyVotes = jsEncrypt.encrypt(votes);

    const Web3 = require("web3");
    const EthereumTx = require("ethereumjs-tx");
    const infura =
      "https://rinkeby.infura.io/v3/bc0d1f76c95e49c08c765ce26bdb81c2";
    const web3 = new Web3(new Web3.providers.HttpProvider(infura));
    const contractAddress = "0xe2B7a0c7bC21E000B8327713513b9D4d2620A414";
    web3.eth.defaultAccount = "0xe2B7a0c7bC21E000B8327713513b9D4d2620A414";
    const privateKey =
      "b7d9e2b2868fc1cba2abdd411999510b6c619e79d2189ff9b680d60923b7a5c1";
    var abi = require("./abi.json");

    web3.eth.getTransactionCount(
      web3.eth.defaultAccount,
      function (err, nonce) {
        console.log("nonce value is ", nonce);
        const contract = new web3.eth.Contract(
          JSON.parse(abi),
          contractAddress,
          {
            from: web3.eth.defaultAccount,
            gas: 3000000,
          }
        );
        const voterId = 1;
        const functionAbi = contract.methods
          .store(voterId, enyVotes)
          .encodeABI();
        var details = {
          nonce: nonce,
          gasPrice: web3.utils.toHex(web3.utils.toWei("47", "gwei")),
          gas: 300000,
          to: contractAddress,
          value: 0,
          data: functionAbi,
        };
        const transaction = new EthereumTx(details);
        transaction.sign(Buffer.from(privateKey, "hex"));
        var rawData = "0x" + transaction.serialize().toString("hex");
        web3.eth
          .sendSignedTransaction(rawData)
          .on("transactionHash", function (hash) {
            console.log(["transferToStaging Trx Hash:" + hash]);
          })
          .on("receipt", function (receipt) {
            console.log(["transferToStaging Receipt:", receipt]);
          })
          .on("error", console.error);
      }
    );
  };

  return (
    <div className="app">
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" onClick={onConnect} />
      </form>
    </div>
  );
}

export default App;
