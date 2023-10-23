'use client';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';

import Dropdown from '@/components/Dropdown';

[
  {
    name: 'Ethereum',
    chainId: 1,
    icon: 'https://movricons.s3.ap-south-1.amazonaws.com/Ether.svg',
    nativeAssetIcon: 'https://maticnetwork.github.io/polygon-token-assets/assets/eth.svg',
    isSendingEnabled: true,
    isReceivingEnabled: false,
    blockExplorer: 'https://etherscan.com',
    nativeAsset: 'ETH',
    gasLimit: '29000',
    minFeeMultiplier: 1,
    maxFeeMultiplier: 100,
    maxAmountCap: {
      type: 'BigNumber',
      hex: '0x6379da05b60000',
    },
    gasMultiplier: 2,
    serviceTime: {
      from: 60000,
      to: 0,
    },
    limits: [
      {
        chainId: 10,
        isEnabled: true,
        minAmount: '793143873030480',
        maxAmount: '19828596825762000',
      },
    ],
  },
];

export default function Refuel() {
  const [chains, setChains] = useState([]);
  const [chainFrom, setChainFrom] = useState<any>();
  const [chainTo, setChainTo] = useState<any>();

  const getChainsData = async () => {
    const res = await fetch('https://refuel.socket.tech/chains');
    const json = await res.json();
    setChainFrom(json.result[0]);
    setChainTo(json.result[1]);
    setChains(json.result);
  };

  useEffect(() => {
    getChainsData();
  }, []);

  return (
    <div className="w-[520px] bg-slate-800 rounded-xl flex flex-col p-6 border border-gray-600">
      <div className="mb-3">
        <span className="text-xl font-semibold">Refuel Gas</span>
      </div>
      {chains && chains.length > 0 && (
        <div className="flex flex-col">
          <div className="flex space-x-4">
            <div className="w-5/12 flex-1 rounded-md px-2 py-3 bg-slate-700">
              <div className="text-sm mb-2">Transfer from</div>
              <Dropdown
                selected={chainFrom}
                options={chains.filter((chain: any) => chain.isSendingEnabled)}
                onSelect={setChainFrom}
              />
            </div>
            <div className="w-2/12"></div>
            <div className="w-5/12 flex-1 rounded-md px-2 py-3 bg-slate-700">
              <div className="text-sm mb-2">Transfer to</div>
              <Dropdown
                selected={chainTo}
                options={chains.filter((chain: any) => chain.isReceivingEnabled && chain.name !== chainFrom.name)}
                onSelect={setChainTo}
              />
            </div>
          </div>

          <div className="mb-4 sm:mb-8"></div>
          {/* Input and Slider */}
          <div className="flex justify-between text-sm font-medium sm:text-base">
            <p>Enter Refuel Amount</p>
            <div className="flex items-center">
              <span className="text-socket-secondary">Bal:</span>
              <span>
                <div className="flex items-center pl-1 font-semibold text-socket-primary">
                  <span>0.0581</span>
                  <span className="mx-1 hidden sm:block">ETH</span>
                </div>
              </span>
              <button className="ml-1 rounded-[2px] bg-purple-900 px-[5px] py-[3px] text-sm font-semibold leading-[16.8px] text-purple-300">
                MAX
              </button>
            </div>
          </div>
          <div>
            <div className="my-1 rounded-md border border-slate-600 px-3 py-2 text-base font-medium">
              <input
                type="number"
                className="bg-transparent text-[22px] font-bold pt-0.5 focus-visible:outline-none w-full"
                placeholder="0.0"
                value="0.0058"
                readOnly
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="rounded border border-slate-600 px-2 py-2 font-medium text-socket-primary sm:px-3">
                0.003
              </div>
              <div className="mx-6 -mt-2 w-full">
                <Slider
                  min={0.003}
                  max={0.027}
                  step={0.001}
                  styles={{
                    rail: {
                      backgroundColor: 'rgb(34, 34, 48)',
                      height: '10px',
                    },
                    track: {
                      backgroundColor: 'rgb(170, 108, 251)',
                      height: '10px',
                    },
                    handle: {
                      height: '24px',
                      width: '24px',
                      borderColor: 'rgb(170, 108, 251)',
                      backgroundColor: 'rgb(255, 255, 255)',
                      marginTop: '-6px',
                      borderWidth: '6px',
                      boxShadow: 'none',
                    },
                  }}
                />
              </div>
              <div className="rounded border border-slate-600 px-2 py-2 font-medium text-socket-primary sm:px-3">
                0.027
              </div>
            </div>
          </div>

          <div className="mb-4 sm:mb-7"></div>
          {/* TX SUMMARY */}
          <div className="flex flex-col bg-slate-900 px-4 pt-5 pb-2 rounded">
            <p className="border-b border-gray-700 pb-3 font-medium sm:text-lg">Transaction Summary</p>
            <div className="p-1">
              <div className="text-sm sm:text-base flex items-center justify-between border-gray-700 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                <span>Estimated Transfer Time:</span>
                <span className="text-white">~1 mins</span>
              </div>
              <div className="text-sm sm:text-base flex items-center justify-between border-gray-700 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                <span>Refuel Fee:</span>
                <span className="text-white">$0</span>
              </div>
              <div className="text-sm sm:text-base flex items-center justify-between border-gray-700 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                <span>Destination Gas Fee:</span>
                <span className="text-white">0.00006 ETH ($0.10)</span>
              </div>
              <div className="text-sm sm:text-base flex items-center justify-between border-gray-700 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                <span>Expected Output:</span>
                <span className="text-white">0.00573 ETH ($9.64)</span>
              </div>
            </div>
          </div>
          <div className="mt-6"></div>

          <button
            className="transition-all flex items-center justify-center w-full font-semibold leading-[24px] rounded px-4 py-[13px] sm:text-lg bg-violet-800 hover:bg-violet-700 text-white capitalize disabled:bg-slate-700"
            disabled={true}
          >
            Refuel
          </button>
        </div>
      )}
    </div>
  );
}
