import "./App.css";
import { useState, useEffect } from "react";
import web3 from "./ethereum/webThree";
import election from "./ethereum/election";
import { Transaction } from "@ethereumjs/tx";
import Common, { Chain } from "@ethereumjs/common";

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
      const voterId = "1234567";

      const functionAbi = election.methods.store(voterId, votes).encodeABI();

      const common = new Common({ chain: Chain.Rinkeby });

      web3.eth.getTransactionCount(publicKey, function (err, nonce) {
        var details = {
          from: publicKey,
          nonce: nonce,
          gasPrice: web3.utils.toHex(web3.utils.toWei("100", "gwei")),
          gasLimit: 500000,
          to: contractAddress,
          value: 0,
          data: functionAbi,
        };

        var tx = new Transaction.fromTxData(details, { common });
        const signedTx = tx.sign(Buffer.from(privateKey, "hex"));
        var ss = signedTx.serialize();

        web3.eth
          .sendSignedTransaction("0x" + ss.toString("hex"))
          .on("receipt", console.log)
          .on("error", console.log)
          .on();

      });
    };

    methodFunction();
  }, []);

  return <div className="App">hello</div>;
}

export default App;
