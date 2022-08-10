require("hardhat-gas-reporter");
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");


const accounts =
  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];

const url =
  process.env.RPC_URL !== undefined ? process.env.RPC_URL : "";


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
        },
      },
    ],
  },
  gasReporter: {
    enabled: true // set false to see durations by mocha
  },
  mocha: {
    timeout: 400000, // updated for tests 
  },
  gasReporter: {
    currency: "USD",
  },
  networks: {
    rinkeby: {
      chainId : 4,
      url,
      accounts
    }
  }

}

