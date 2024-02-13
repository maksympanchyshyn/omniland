'use client';

import { ethers } from 'ethers';
import { useContext } from 'react';

import { CHAINS } from '@/constants';
import Dropdown from '@/components/Dropdown';
import { WalletContext } from '@/hooks/useBrowserWallet';

export default function Bridge() {
  const walletContext = useContext(WalletContext);
  const chainFrom = CHAINS.find((c) => c.chainId === walletContext?.chainId) || CHAINS[0];

  return (
    <div className="flex w-full justify-center items-start">
      <div className="flex flex-col w-[520px] mt-20 bg-slate-800 rounded-xl p-6 border border-gray-600">
        <div className="mb-3">
          <span className="text-xl font-semibold">NFT Bridge</span>
        </div>
        <div className="flex flex-col bg-slate-700 px-4 pt-5 pb-2 rounded">Select NFT to bridge</div>
        <div className="mb-4"></div>
        {CHAINS && CHAINS.length > 0 && (
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex-1 rounded-md px-2 py-3 bg-slate-700">
                <Dropdown
                  selected={chainFrom}
                  options={CHAINS.filter((ch) => ch.chainId != chainFrom.chainId)}
                  onSelect={() => {}}
                />
              </div>
              <button
                onClick={() => {}}
                className="flex mx-6 h-10 w-10 items-center justify-center rounded-full border-4 border-slate-700 bg-slate-600 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <div className="flex-1 rounded-md px-2 py-3 bg-slate-700">
                <Dropdown
                  selected={chainFrom}
                  options={CHAINS.filter((ch) => ch.chainId != chainFrom.chainId)}
                  onSelect={() => {}}
                />
              </div>
            </div>

            <div className="mb-4 sm:mb-8"></div>
            {/* Input and Slider */}

            {/* TX SUMMARY */}

            <div className="flex flex-col bg-slate-700 px-4 pt-5 pb-2 rounded">
              <p className="border-b border-slate-600 pb-3 font-medium sm:text-lg">Transaction Summary</p>
              <div className="p-1">
                <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                  <span>Estimated Transfer Time:</span>
                  <span className="text-white"></span>
                </div>
                <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                  <span>Refuel Fee:</span>
                  <span className="text-white"></span>
                </div>
                <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                  <span>Destination Gas Fee:</span>
                  <span className="text-white"></span>
                </div>
                <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                  <span>Expected Output:</span>
                  <span className="text-white"></span>
                </div>
              </div>
            </div>
            <div className="mt-6"></div>
            <button
              className="transition-all flex items-center justify-center w-full font-semibold leading-[24px] rounded px-4 py-[13px] sm:text-lg bg-violet-800 hover:bg-violet-700 text-white capitalize disabled:bg-slate-700"
              disabled={false}
              onClick={() => {}}
            >
              Bridge
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
