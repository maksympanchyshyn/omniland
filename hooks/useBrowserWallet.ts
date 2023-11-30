import { CHAINS } from '@/constants';
import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';

export const WalletContext = createContext<{
  account: string | undefined;
  chainId: number | undefined;
  provider: ethers.BrowserProvider | undefined;
  connect: () => Promise<void>;
  switchChain: (chain: any) => Promise<void>;
} | null>(null);

const useBrowserWallet = () => {
  const [account, setAccount] = useState<string>();
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [chainId, setChainId] = useState(1);

  useEffect(() => {
    const checkConnection = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      const accounts = await provider.send('eth_accounts', []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
      const chainId = await provider.send('eth_chainId', []);
      setChainId(parseInt(chainId));
    };

    checkConnection();
    window.ethereum?.on('accountsChanged', checkConnection);
    return () => window.ethereum.removeListener('accountsChanged', checkConnection);
  }, []);

  useEffect(() => {
    const handleChainUpdate = (chainId: string) => setChainId(parseInt(chainId));
    window.ethereum.on('chainChanged', handleChainUpdate);
    return () => window.ethereum.removeListener('accountsChanged', handleChainUpdate);
  }, []);

  const connect = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);
    const accounts = await provider.send('eth_requestAccounts', []);
    const chainId = await provider.send('eth_chainId', []);
    setAccount(accounts[0]);
    setChainId(parseInt(chainId));
  };

  const switchChain = async (chainId: number) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (err: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        const chain = CHAINS.find((c) => c.chainId === chainId);
        if (chain) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                rpcUrls: [chain.rpc],
                chainName: chain.name,
                nativeCurrency: {
                  name: chain.currency,
                  symbol: chain.currency,
                  decimals: 18,
                },
                blockExplorerUrls: [chain.explorer],
              },
            ],
          });
        }
      } else {
        throw new Error(err);
      }
    }
  };

  return { account, chainId, provider, connect, switchChain };
};

export default useBrowserWallet;
