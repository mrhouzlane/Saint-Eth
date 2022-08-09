require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.1",
  mocha: {
    timeout: 400000, // updated for tests 
  },
  gasReporter: {
    currency: 'CHF',
    gasPrice: 21
  },
  networks: {
    hardhat: {
      accounts: {
        count: 500, // accounts for tests (loops)
      }
    }
  }
}