'use client';

import { useContext } from 'react';

import { WalletContext } from '@/hooks/useBrowserWallet';

export default function Dashboard() {
  const walletContext = useContext(WalletContext);

  return (
    <div className="w-[520px] bg-slate-800 rounded-xl flex flex-col p-6 border border-gray-600">
      <div className="mb-3">
        <span className="text-xl font-semibold">Dashboard</span>
      </div>
    </div>
  );
}
