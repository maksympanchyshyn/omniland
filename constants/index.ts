export type Chain = {
  name: string;
  rpc: string;
  chainId: number;
  currency: string;
  explorer: string;
  icon?: string;
};

export const CHAINS: Chain[] = [
  {
    name: 'Ethereum',
    rpc: 'https://eth.llamarpc.com',
    chainId: 1,
    currency: 'ETH',
    explorer: 'https://etherscan.io',
    icon: 'ethereum.svg',
  },
  {
    name: 'Arbitrum',
    rpc: 'https://arbitrum-one.public.blastapi.io',
    chainId: 42161,
    currency: 'ETH',
    explorer: 'https://arbiscan.io',
    icon: 'arbitrum.svg',
  },
  {
    name: 'Optimism',
    rpc: 'https://optimism-mainnet.public.blastapi.io',
    chainId: 10,
    currency: 'ETH',
    explorer: 'https://optimistic.etherscan.io',
    icon: 'optimism.svg',
  },
  {
    name: 'zkSync',
    rpc: 'https://mainnet.era.zksync.io',
    chainId: 324,
    currency: 'ETH',
    explorer: 'https://explorer.zksync.io',
    icon: 'zksync.svg',
  },
  {
    name: 'Polygon',
    rpc: 'https://polygon.llamarpc.com',
    chainId: 137,
    currency: 'MATIC',
    explorer: 'https://polygonscan.com',
    icon: 'polygon.svg',
  },
  {
    name: 'BSC',
    rpc: 'https://rpc.ankr.com/bsc',
    chainId: 56,
    currency: 'BNB',
    explorer: 'https://bscscan.com',
    icon: 'bnb.svg',
  },
  {
    name: 'Avalanche',
    rpc: 'https://avalanche.blockpi.network/v1/rpc/public',
    chainId: 43114,
    currency: 'AVAX',
    explorer: 'https://snowtrace.io',
    icon: 'avalanche.svg',
  },
];
