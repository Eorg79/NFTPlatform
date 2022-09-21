const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();


module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gasPrice: 2000000000,
      gas: 20000000,
    },

    ropsten: {
      provider: () =>
      new HDWalletProvider({
        mnemonic: {
          phrase: process.env.MNEMONIC
        }, providerOrUrl:`https://ropsten.infura.io/v3/${process.env.INFURA_ID}`}),
      network_id: 3,
      //gasPrice: 2000000000,
      //gas: 1152998,
    },

    rinkeby: {
      provider: () =>
      new HDWalletProvider({
        mnemonic: {
          phrase: process.env.MNEMONIC
        }, providerOrUrl:`https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`}),
      network_id: 4,
      //gasPrice: 2000000000,
      //gas: 1152998,
    },
  },

  plugins: ["solidity-coverage"],
  plugins: ['truffle-contract-size'],

  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      gasPrice: 1,
      token: "ETH",
      showTimeSpent: true,
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.14", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "constantinople"
       }
    },
  },
};
