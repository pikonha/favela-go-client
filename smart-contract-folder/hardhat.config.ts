import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

let mnemonic = process.env.mmemonic;
const mnemonicAccounts = {
  mnemonic,
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const mmemonic = process.env.mmemonic ? process.env.mmemonic : "";
  const wallet = await hre.ethers.Wallet.fromMnemonic(mmemonic);
  // console.log(wallet.privateKey);
});

task("generateAccounts", "generate a mmemonic", async (taskArgs, hre) => {
  const wallet = await hre.ethers.Wallet.createRandom();
  const mmenonic = wallet._mnemonic();
  console.log(mmenonic);
});
task("balance", "check balance", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  //let wallet = hre.ethers.Wallet.fromMnemonic(mmemonic);

  for (let index = 0; index < 1; index++) {
    const account = accounts[index];
    const balance = await account.getBalance();
    // console.log(`${account.address} ${balance} ${}`);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },

  networks: {
    harmony_testnet: {
      chainId: 1666700000,
      accounts: mnemonicAccounts,
      url: "https://api.s0.b.hmny.io",
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      harmonyTest: String(process.env.harmonyApi),
    },
  },
};

export default config;
