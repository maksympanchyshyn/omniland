'use client';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useContext, useEffect, useState } from 'react';

import Dropdown from '@/components/Dropdown';
import { WalletContext } from '@/hooks/useBrowserWallet';
import { ethers } from 'ethers';
import { CHAINS } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';

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
  const [chains, setChains] = useState<any[]>([]);
  const [chainFromId, setChainFromId] = useState<any>(1);
  const [chainToId, setChainToId] = useState<any>(10);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const [txSummary, setTxSummary] = useState<any>(null);

  const debouncedAmount = useDebounce(amount, 750);
  const walletContext = useContext(WalletContext);

  useEffect(() => {
    const getChainsData = async () => {
      const res = await fetch('https://refuel.socket.tech/chains');
      const json = await res.json();
      setChains(json.result);
    };
    getChainsData();
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      if (walletContext && walletContext.account) {
        setIsFetchingBalance(true);
        const chainInfo = CHAINS.find((ch) => ch.chainId === chainFromId);
        const provider = new ethers.JsonRpcProvider(chainInfo?.rpc);
        const balanceWei = await provider.getBalance(walletContext.account);
        setBalance(Number(ethers.formatEther(balanceWei)));
        setIsFetchingBalance(false);
      }
    };
    getBalance();
  }, [walletContext, chainFromId]);

  useEffect(() => {
    const getTxSummary = async () => {
      const amountWei = ethers.parseEther(debouncedAmount.toString());
      const params = `?fromChainId=${chainFromId}&toChainId=${chainToId}&amount=${amountWei}`;
      const response = await fetch(`https://refuel.socket.tech/quote${params}`);
      const json = await response.json();
      if (json.success) {
        const result = json.result;
        setTxSummary({
          estimatedOutput: ethers.formatEther(result.estimatedOutput),
          estimatedOutputUsd: result.usdValues.estimatedOutput,
          destinationFee: ethers.formatEther(result.destinationFee),
          destinationFeeUsd: result.usdValues.destinationFee,
          contractAddr: result.contractAddress,
          estimatedTimeMs: result.estimatedTime,
        });
      }
    };
    getTxSummary();
  }, [chainFromId, chainToId, debouncedAmount]);

  let chainFrom: any;
  let chainTo: any;

  chains.forEach((chain) => {
    chainFrom = chain.chainId === chainFromId ? chain : chainFrom;
    chainTo = chain.chainId === chainToId ? chain : chainTo;
  });

  let limits = { minAmount: 0, maxAmount: 0 };
  if (chainFrom && chainFrom.limits) {
    chainFrom.limits.forEach((limitObj: any) => {
      if (limitObj.chainId === chainToId) {
        limits.minAmount = Number(ethers.formatEther(limitObj.minAmount));
        limits.maxAmount = Number(ethers.formatEther(limitObj.maxAmount));
      }
    });
  }

  return (
    <div className="w-[520px] bg-slate-800 rounded-xl flex flex-col p-6 border border-gray-600">
      <div className="mb-3">
        <span className="text-xl font-semibold">Refuel Gas</span>
      </div>
      {chains && chains.length > 0 && (
        <div className="flex flex-col">
          <div className="flex space-x-4">
            <div className="w-5/12 flex-1 rounded-md px-2 py-3 bg-slate-700">
              <Dropdown
                label="Transfer from"
                selected={chainFrom}
                options={chains.filter((chain: any) => chain.isSendingEnabled)}
                onSelect={(option) => setChainFromId(option.chainId)}
              />
            </div>
            <div className="w-2/12"></div>
            <div className="w-5/12 flex-1 rounded-md px-2 py-3 bg-slate-700">
              <Dropdown
                label="Transfer to"
                selected={chainTo}
                options={chains.filter((chain: any) => chain.isReceivingEnabled && chain.name !== chainFrom.name)}
                onSelect={(option) => setChainToId(option.chainId)}
              />
            </div>
          </div>

          <div className="mb-4 sm:mb-8"></div>
          {/* Input and Slider */}
          <div className="flex justify-between text-sm font-medium sm:text-base">
            <p>Enter Refuel Amount</p>

            {!isFetchingBalance && (
              <div className="flex items-center">
                <span className="text-socket-secondary">Bal:</span>
                <span>
                  <div className="flex items-center pl-1 font-semibold text-socket-primary">
                    <span>{balance.toFixed(4)}</span>
                    <span className="mx-1 hidden sm:block">{chainFrom.nativeAsset}</span>
                  </div>
                </span>
                <button className="ml-1 rounded-[2px] bg-purple-900 text-purple-300 px-[5px] py-[3px] text-sm font-semibold leading-[16.8px]">
                  MAX
                </button>
              </div>
            )}
          </div>
          <div>
            <div className="my-1 rounded-md border bg-slate-700 border-slate-600 px-3 py-2 text-base font-medium">
              <input
                type="number"
                className="bg-transparent text-[22px] font-bold pt-0.5 focus-visible:outline-none w-full"
                placeholder="0.0"
                min={Number(limits.minAmount.toFixed(3))}
                max={Number(limits.maxAmount.toFixed(3))}
                step={0.001}
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="rounded border border-slate-600 px-2 py-2 font-medium text-socket-primary sm:px-3">
                {limits.minAmount.toFixed(3)}
              </div>
              <div className="mx-6 -mt-2 w-full">
                <Slider
                  min={Number(limits.minAmount.toFixed(3))}
                  max={Number(limits.maxAmount.toFixed(3))}
                  step={0.001}
                  value={amount}
                  onChange={(value) => setAmount(Array.isArray(value) ? value[0] : value)}
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
                {limits.maxAmount.toFixed(3)}
              </div>
            </div>
          </div>

          <div className="mb-4 sm:mb-7"></div>
          {/* TX SUMMARY */}
          {txSummary && (
            <div className="flex flex-col bg-slate-700 px-4 pt-5 pb-2 rounded">
              <p className="border-b border-slate-600 pb-3 font-medium sm:text-lg">Transaction Summary</p>
              <div className="p-1">
                <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                  <span>Estimated Transfer Time:</span>
                  <span className="text-white">~{txSummary.estimatedTimeMs / 1000} secs</span>
                </div>
                <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                  <span>Refuel Fee:</span>
                  <span className="text-white">$0</span>
                </div>
                <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                  <span>Destination Gas Fee:</span>
                  <span className="text-white">
                    {Number(txSummary.destinationFee).toFixed(6)} {chainTo.nativeAsset} ($
                    {Number(txSummary.destinationFeeUsd).toFixed(3)})
                  </span>
                </div>
                <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                  <span>Expected Output:</span>
                  <span className="text-white">
                    {Number(txSummary.estimatedOutput).toFixed(6)} {chainTo.nativeAsset} ($
                    {Number(txSummary.estimatedOutputUsd).toFixed(3)})
                  </span>
                </div>
              </div>
            </div>
          )}
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
