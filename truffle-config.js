const path = require("path");
var HDWalletProvider = require("@truffle/hdwallet-provider");

const WALLET_PRIVATE_KEY = "wallet sepolia private key "


const API_URLS = {
  
  11155111: 'https://sepolia.infura.io/v3/9cb128774f4b4f5797fc40a6ff71eded'
  
  };
  
 
module.exports = {
  contracts_build_directory: path.join(__dirname, "/src/contracts"), //path for folder abi_contracts 
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777
    },
    sepolia: {
      provider: () => new HDWalletProvider(WALLET_PRIVATE_KEY, API_URLS[11155111]),
      network_id: 11155111,
      gas: 4500000
    }
  },
  
  compilers: {
    solc: {
      version: "0.8.6"
    }
  }

};
