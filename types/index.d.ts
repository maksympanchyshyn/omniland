export type CHAIN_NAME =
  | 'ETHEREUM'
  | 'BSC'
  | 'POLYGON'
  | 'AVALANCHE'
  | 'ARBITRUM'
  | 'OPTIMISM'
  | 'FANTOM'
  | 'CORE'
  | 'CELO'
  | 'ZKSYNC'
  | 'AURORA'
  | 'BASE'
  | 'ZKEVM'
  | 'GNOSIS';

export type GasSettings = {
  maxFeePerGas?: number | bigint | null;
  maxPriorityFeePerGas?: number | bigint | null;
  gasPrice?: number | bigint | null;
  gasLimit?: number;
};
