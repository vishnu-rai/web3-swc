import web3 from "./webThree.js";
import election from "./build/Storage.json";

const instance = new web3.eth.Contract(
  election.abi,
  "0xd110d49a0016D7dd7B96048F3fFfc3749cE8DEE7"
);

export default instance;
