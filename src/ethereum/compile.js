const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'ElectionContract.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

var input = {
    language: "Solidity",
    sources: {
        "ElectionContract.sol": {
        content: source,
        },
    },

    settings: {
        outputSelection: {
        "*": {
            "*": [ "*" ],
        },
        },
    },
};

var output =  JSON.parse(solc.compile(JSON.stringify(input)));
  
console.log(output.contracts);
const finalOutput = output.contracts['ElectionContract.sol'];
fs.ensureDirSync(buildPath);


for(let contract in output.contracts['ElectionContract.sol']){
    fs.outputJSONSync(
        path.resolve(buildPath, contract +'.json'),
        finalOutput[contract]
    );
}