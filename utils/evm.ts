import { ethers } from 'ethers';
import { CHAIN_NAME, GasSettings } from '../types';

export const getGasSettings = async (chain: CHAIN_NAME) => {
  const settings = <GasSettings>{};
  let provider;
  let feeData;

  switch (chain) {
    case 'ETHEREUM':
      provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
      feeData = await provider.getFeeData();
      settings.maxFeePerGas = feeData.gasPrice || BigInt(15) + ethers.parseUnits('1', 'gwei');
      settings.maxPriorityFeePerGas = ethers.parseUnits('1', 'gwei');
      break;
    case 'ARBITRUM':
      settings.maxFeePerGas = 120000000;
      settings.maxPriorityFeePerGas = 0;
      break;
    case 'POLYGON':
      const response = await fetch('https://gasstation.polygon.technology/v2').then((r) => r.json());
      const { maxPriorityFee, maxFee } = response.fast;
      settings.maxFeePerGas = ethers.parseUnits(`${maxFee}`, 'gwei');
      settings.maxPriorityFeePerGas = ethers.parseUnits(`${maxPriorityFee}`, 'gwei');
      break;
    case 'AVALANCHE':
      provider = new ethers.JsonRpcProvider('https://avalanche-c-chain.publicnode.com');
      feeData = await provider.getFeeData();
      const baseFee = feeData.gasPrice || ethers.parseUnits('25', 'gwei');
      settings.maxPriorityFeePerGas = ethers.parseUnits('3', 'gwei');
      settings.maxFeePerGas = baseFee + ethers.parseUnits('3', 'gwei');
      break;
    case 'OPTIMISM':
      provider = new ethers.JsonRpcProvider('https://optimism-mainnet.public.blastapi.io');
      feeData = await provider.getFeeData();
      const priorityFeeWei = Math.floor(Number(feeData.gasPrice) * 0.5); // add 50% as priority
      settings.maxFeePerGas = Number(feeData.gasPrice) + priorityFeeWei;
      settings.maxPriorityFeePerGas = priorityFeeWei;
      break;
    case 'BSC':
      settings.gasPrice = ethers.parseUnits('3', 'gwei');
      break;
    case 'ZKSYNC':
      provider = new ethers.JsonRpcProvider('');
      feeData = await provider.getFeeData();
      settings.maxFeePerGas = feeData.gasPrice;
      settings.maxPriorityFeePerGas = 0;
      break;
    default:
      break;
  }
  return settings;
};
