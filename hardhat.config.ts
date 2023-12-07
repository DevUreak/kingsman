require('dotenv').config();
import { HardhatUserConfig } from 'hardhat/config';

import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
import "tsconfig-paths/register";

const config: HardhatUserConfig = {
  networks: {
      'localhost': {
          url: 'http://127.0.0.1:8545',
          allowUnlimitedContractSize: true,
      },
      'arbitrum.goerli': {
          url: `https://goerli-rollup.arbitrum.io/rpc`,
          chainId: 421613,
          accounts: [process.env.PRIVATE_KEY || '']
      },
      'arbitrum.sepolia': {
          url: `https://sepolia-rollup.arbitrum.io/rpc`,
          chainId: 421614,
          accounts: [process.env.PRIVATE_KEY || '']
      }
  },
  solidity: {
      version: '0.8.22',
      settings: {
          viaIR: true,
          optimizer: {
              enabled: true,
              runs: 4294967295,
              details: {
                  peephole: true,
                  inliner: true,
                  jumpdestRemover: true,
                  deduplicate: true,
                  cse: true,
                  constantOptimizer: true,
                  yul: true,
                  yulDetails: {
                      stackAllocation: true
                      // optimizerSteps: 'dDLtupVCsghvjei'
                  }
              }
          }
      }
  },
  // gasReporter: {
  //     enabled: true,
  //     currency: 'USD',
  //     gasPrice: 21
  // }
};

export default config;