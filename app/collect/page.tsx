'use client';

import Image from 'next/image';
import { useContext } from 'react';

import { CHAINS } from '@/constants';
import { WalletContext } from '@/hooks/useBrowserWallet';

const collection = {
  name: 'MakeMoney OmniGraph',
  symbol: 'MMOG',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid a explicabo harum nobis sapiente dicta at, quia perferendis, ratione repellat amet nesciunt quod illo necessitatibus aspernatur veritatis quaerat dignissimos ad?',
};

export default function Collect() {
  const walletContext = useContext(WalletContext);

  return (
    <div className="flex w-full items-center">
      <div className="flex w-full justify-center py-6">
        <div className="flex flex-col justify-center items-center w-full md:w-4/6">
          <div className="nft-img-wrapper">
            <Image
              className="rounded-lg border border-sky-900 p-1"
              src="/make-money-nft.gif"
              width={1200}
              height={1200}
              style={{ objectFit: 'contain' }}
              alt="nft-img"
            />
          </div>
        </div>
        <div className="flex flex-col bg-slate-700 rounded-lg md:ml-24 md:w-2/6">
          <div className="flex flex-col w-full p-6 space-y-6">
            <div className="text-neutral-400 font-light">{collection.symbol}</div>
            <div className="text-3xl font-bold">{collection.name}</div>
            <div className="text-neutral-400 text-sm">{collection.description}</div>
            <div>
              <button className="w-full btn-yellow px-8 py-4 text-xl uppercase">
                {walletContext?.account ? 'Collect' : 'Connect wallet'}
              </button>
            </div>
            <div className="flex items-center border border-slate-500 rounded-md p-2 gap-2 flex-wrap">
              {CHAINS.map(
                (chain) =>
                  chain.icon && (
                    <button key={chain.chainId} className="relative w-6 h-6 hover:opacity-60 transition-opacity">
                      <Image src={chain.icon} alt={chain.name} fill />
                    </button>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
