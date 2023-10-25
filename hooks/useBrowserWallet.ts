import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';

export const WalletContext = createContext<{
  account: string | undefined;
  provider: ethers.BrowserProvider | undefined;
  connect: () => Promise<void>;
} | null>(null);

const useBrowserWallet = () => {
  const [account, setAccount] = useState<string>();
  const [provider, setProvider] = useState<ethers.BrowserProvider>();

  useEffect(() => {
    const checkConnection = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      const accounts = await provider.send('eth_accounts', []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };

    checkConnection();
    window.ethereum?.on('accountsChanged', checkConnection);
    return () => window.ethereum.removeListener('accountsChanged', checkConnection);
  }, []);

  const connect = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);
    const accounts = await provider.send('eth_requestAccounts', []);
    setAccount(accounts[0]);
  };

  return { account, provider, connect };
};

export default useBrowserWallet;
