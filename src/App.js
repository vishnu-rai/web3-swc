import "./App.css";
import { useState, useEffect } from "react";
import web3 from "./ethereum/webThree";
import election from "./ethereum/election";
const Tx = require("ethereumjs-tx").Transaction;

const publicKey = "0xD0e203A04Eb4024Fbd90768b46E37aC67F1Cd707";
const privateKey =
  "9f94794beb1b094dfa4dd85f1190703500e5179fe4b53767dcfc785eaa4620b0";
const contractAddress = "0x4e6a5bfb44c6d243a44ed5f6704be50c38ac289f";

function App() {
  useEffect(() => {
    const countVotes = async () => {
      const counts = await election.methods.voterCount().call();
      console.log(counts);
    };
    countVotes();

    const methodFunction = async () => {
      const votes = "123";
      const voterId = "12";

      const functionAbi = election.methods.store(voterId, votes).encodeABI();

      web3.eth.getTransactionCount(publicKey, function (err, nonce) {
        var details = {
          from: web3.utils.toChecksumAddress(publicKey),
          nonce: web3.utils.toHex(nonce),
          gasPrice: web3.utils.toHex(web3.utils.toWei("100", "gwei")),
          gasLimit: 500000,
          to: contractAddress,
          value: 0,
          data: functionAbi,
        };

        var tx = new Tx(details, { chain: "rinkeby" });
        tx.sign(Buffer.from(privateKey, "hex"));
        var serializedTx = tx.serialize();

        web3.eth
          .sendSignedTransaction("0x" + serializedTx.toString("hex"))
          .on("receipt", console.log)
          .on("error", console.log);
      });
    };

    methodFunction();
  }, []);

  return <div className="App">hello</div>;
}

export default App;
