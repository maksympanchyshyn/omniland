'use client';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import Dropdown from '@/components/Dropdown';
import { WalletContext } from '@/hooks/useBrowserWallet';
import { ethers } from 'ethers';
import { CHAINS } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { toFixedNoRounding } from '@/utils';
import { BUNGEE_REFUEL_ABI } from '../abi/refuel.abi';

export default function Refuel() {
  const walletContext = useContext(WalletContext);

  const [chains, setChains] = useState<any[]>([]);
  const [selectedChainIds, setSelectedChainIds] = useState({ from: walletContext?.chainId || 1, to: 10 });
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const [txSummary, setTxSummary] = useState<any>(null);

  const debouncedAmount = useDebounce(amount, 750);
  const isChainValid = walletContext?.chainId === selectedChainIds.from;

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
        const chainInfo = CHAINS.find((ch) => ch.chainId === selectedChainIds.from);
        const provider = new ethers.JsonRpcProvider(chainInfo?.rpc);
        const balanceWei = await provider.getBalance(walletContext.account);
        setBalance(Number(ethers.formatEther(balanceWei)));
        setIsFetchingBalance(false);
      }
    };
    getBalance();
  }, [walletContext, selectedChainIds.from]);

  const getChainById = (chainId: number, chains: any[]) => chains.find((chain) => chain.chainId === chainId);

  const chainFrom = useMemo(() => getChainById(selectedChainIds.from, chains), [selectedChainIds.from, chains]);
  const chainTo = useMemo(() => getChainById(selectedChainIds.to, chains), [selectedChainIds.to, chains]);

  const calculateLimits = (chainFrom: any, chainTo: any) => {
    const result = { minAmount: 0, maxAmount: 0, step: 0.001 };
    if (chainFrom && chainTo && chainFrom.limits) {
      const limitObj = chainFrom.limits.find((i: any) => i.chainId === chainTo.chainId);
      const minAmount = Number(ethers.formatEther(limitObj.minAmount));
      const maxAmount = Number(ethers.formatEther(limitObj.maxAmount));
      const minAmountDecimals = -Math.floor(Math.log10(minAmount) - 1);
      const maxAmountDecimals = -Math.floor(Math.log10(maxAmount) - 1);

      result.minAmount = Number(toFixedNoRounding(minAmount, minAmountDecimals));
      result.maxAmount = Number(toFixedNoRounding(maxAmount, maxAmountDecimals));
      result.step = Number(toFixedNoRounding((result.maxAmount - result.minAmount) / 60, minAmountDecimals));
    }
    return result;
  };
  const limits = useMemo(() => calculateLimits(chainFrom, chainTo), [chainFrom, chainTo]);

  const swapSelectedChains = () => {
    const from = chainTo.isSendingEnabled
      ? chainTo.chainId
      : chains.find((ch) => ch.isSendingEnabled && ![chainFrom.chainId, chainTo.chainId].includes(ch.chainId)).chainId;
    const to = chainFrom.isReceivingEnabled
      ? selectedChainIds.from
      : chains.find((ch) => ch.isReceivingEnabled && ![from, chainTo.chainId].includes(ch.chainId)).chainId;
    setSelectedChainIds({ from, to });
  };

  const handleChainFromSelect = (chainId: number) => {
    if (chainId === chainTo.chainId) {
      const to = chains.find((ch) => ch.isReceivingEnabled && ch.chainId !== chainId).chainId;
      setSelectedChainIds({ from: chainId, to });
    } else {
      setSelectedChainIds({ ...selectedChainIds, from: chainId });
    }
  };
  useEffect(() => {
    const getTxSummary = async () => {
      const amountWei = ethers.parseEther(debouncedAmount.toString());
      const params = `?fromChainId=${selectedChainIds.from}&toChainId=${selectedChainIds.to}&amount=${amountWei}`;
      const response = await fetch(`https://refuel.socket.tech/quote${params}`);
      const json = await response.json();
      if (json.success) {
        const result = json.result;
        setTxSummary({
          estimatedOutput: toFixedNoRounding(ethers.formatEther(result.estimatedOutput), 5),
          destinationFee: toFixedNoRounding(ethers.formatEther(result.destinationFee), 5),
          estimatedOutputUsd: toFixedNoRounding(result.usdValues.estimatedOutput, 2),
          destinationFeeUsd: toFixedNoRounding(result.usdValues.destinationFee, 2),
          contractAddr: result.contractAddress,
          estimatedTimeMs: result.estimatedTime,
        });
      }
    };
    if (debouncedAmount >= limits.minAmount && debouncedAmount <= limits.maxAmount) {
      getTxSummary();
    } else {
      setTxSummary(null);
    }
  }, [selectedChainIds, limits, debouncedAmount]);

  const handleRefuel = async () => {
    try {
      if (!isChainValid) {
        console.log('switchingChain');
        await walletContext?.switchChain(chainFrom);
        console.log('switchingChainFinished');
      }
      const signer = await walletContext?.provider?.getSigner();
      const contract = new ethers.Contract(txSummary.contractAddr, BUNGEE_REFUEL_ABI, signer);
      const tx = await contract.depositNativeToken(selectedChainIds.to, signer?.address, {
        value: ethers.parseEther(debouncedAmount.toString()),
      });
      console.log('pushed tx');
      await tx.wait();
      console.log('finished tx');
    } catch (error) {
      console.log('rejectedTx');
    }
  };

  return (
    <div className="w-[520px] bg-slate-800 rounded-xl flex flex-col p-6 border border-gray-600">
      <div className="mb-3">
        <span className="text-xl font-semibold">Refuel Gas</span>
      </div>
      {chains && chains.length > 0 && (
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex-1 rounded-md px-2 py-3 bg-slate-700">
              <Dropdown
                label="Transfer from"
                selected={chainFrom}
                options={chains.filter((chain: any) => chain.isSendingEnabled)}
                onSelect={(option) => handleChainFromSelect(option.chainId)}
              />
            </div>
            <button
              onClick={swapSelectedChains}
              className="flex mx-6 h-10 w-10 items-center justify-center rounded-full border-4 border-slate-700 bg-slate-600 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </button>
            <div className="flex-1 rounded-md px-2 py-3 bg-slate-700">
              <Dropdown
                label="Transfer to"
                selected={chainTo}
                options={chains.filter((chain: any) => chain.isReceivingEnabled && chain.name !== chainFrom.name)}
                onSelect={(option) => setSelectedChainIds({ ...selectedChainIds, to: option.chainId })}
              />
            </div>
          </div>

          <div className="mb-4 sm:mb-8"></div>
          {/* Input and Slider */}
          <div className="flex justify-between text-sm font-medium sm:text-base">
            <p>Enter Refuel Amount</p>

            <div className="flex items-center">
              <span className="text-socket-secondary">Bal:</span>
              {!isFetchingBalance ? (
                <>
                  <span>
                    <div className="flex items-center pl-1 font-semibold text-socket-primary">
                      <span>{toFixedNoRounding(balance, 4)}</span>
                      <span className="mx-1 hidden sm:block">{chainFrom.nativeAsset}</span>
                    </div>
                  </span>
                  <button className="ml-1 rounded-[2px] bg-purple-900 text-purple-300 px-[5px] py-[3px] text-sm font-semibold leading-[16.8px]">
                    MAX
                  </button>
                </>
              ) : (
                <svg className="h-6 w-6 animate-spin ml-3 fill-purple-600" viewBox="0 0 24 24">
                  <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" />
                </svg>
              )}
            </div>
          </div>
          <div>
            <div className="my-1 rounded-md border bg-slate-700 border-slate-600 px-3 py-2 text-base font-medium">
              <input
                type="number"
                className="bg-transparent text-[22px] font-bold pt-0.5 focus-visible:outline-none w-full"
                placeholder="0.0"
                min={limits.minAmount}
                max={limits.maxAmount}
                step={limits.step}
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="rounded border border-slate-600 px-2 py-2 font-medium text-socket-primary sm:px-3">
                {limits.minAmount}
              </div>
              <div className="mx-6 -mt-2 w-full">
                <Slider
                  min={limits.minAmount}
                  max={limits.maxAmount}
                  step={limits.step}
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
                {limits.maxAmount}
              </div>
            </div>
          </div>

          <div className="mb-4 sm:mb-7"></div>
          {/* TX SUMMARY */}

          <div className="flex flex-col bg-slate-700 px-4 pt-5 pb-2 rounded">
            <p className="border-b border-slate-600 pb-3 font-medium sm:text-lg">Transaction Summary</p>
            <div className="p-1">
              <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                <span>Estimated Transfer Time:</span>
                <span className="text-white">{txSummary && `~${txSummary.estimatedTimeMs / 60000} mins`}</span>
              </div>
              <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                <span>Refuel Fee:</span>
                <span className="text-white">{txSummary && '$0'}</span>
              </div>
              <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                <span>Destination Gas Fee:</span>
                <span className="text-white">
                  {txSummary && `${txSummary.destinationFee} ${chainTo.nativeAsset} ($${txSummary.destinationFeeUsd})`}
                </span>
              </div>
              <div className="text-sm sm:text-base flex items-center justify-between border-gray-600 font-medium text-gray-400 whitespace-nowrap border-b py-3">
                <span>Expected Output:</span>
                <span className="text-white">
                  {txSummary &&
                    `${txSummary.estimatedOutput} ${chainTo.nativeAsset} ($${txSummary.estimatedOutputUsd})`}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6"></div>

          <button
            className="transition-all flex items-center justify-center w-full font-semibold leading-[24px] rounded px-4 py-[13px] sm:text-lg bg-violet-800 hover:bg-violet-700 text-white capitalize disabled:bg-slate-700"
            disabled={!txSummary || balance < debouncedAmount}
            onClick={handleRefuel}
          >
            {balance < debouncedAmount && 'Insufficient balance'}
            {balance > debouncedAmount && (isChainValid ? 'Refuel' : `Switch network to ${chainFrom.name}`)}
          </button>
        </div>
      )}
    </div>
  );
}
