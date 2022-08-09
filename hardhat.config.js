require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("solidity-coverage");
require("dotenv").config();
// ethers = require('ethers');
// dotenv.config()
const accounts =
  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  mocha: {
    timeout: 400000, // updated for tests 
  },
  gasReporter: {
    currency: 'CHF',
    gasPrice: 21
  },
  networks: {
    rinkeby: {
      chainId : 4,
      url: "https://rinkeby.infura.io/v3/2910e39eaa7e402a814dc2ef2022969c",
      accounts
    }
  }

}