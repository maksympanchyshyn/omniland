'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { WalletContext } from '@/hooks/useBrowserWallet';
import { CHAINS, Chain } from '@/constants';
import Dropdown from '../Dropdown';

export default function Header() {
  const menuItems: { text: string; link: string }[] = [
    {
      text: 'Collect',
      link: '/collect',
    },
    {
      text: 'Bridge',
      link: '/bridge',
    },
    {
      text: 'Dashboard',
      link: '/dashboard',
    },
  ];

  const currentRoute = usePathname();
  const context = useContext(WalletContext);
  const currentChain = CHAINS.find((c) => c.chainId === context?.chainId) || CHAINS[0];

  return (
    <header>
      <div className="flex w-3/12 justify-start">
        <Link href="/">Omniland</Link>
      </div>
      <div className="flex w-6/12 items-center justify-center space-x-10">
        {menuItems.map((item) => (
          <div key={item.text} className="flex hover:text-sky-500 px-2 py-1">
            <Link href={item.link} className={(currentRoute === item.link && '') || ''}>
              {item.text}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex w-3/12 justify-end items-center">
        {context?.account ? (
          <div className="flex items-center">
            <div className="mr-12 w-36">
              <Dropdown
                selected={currentChain}
                options={CHAINS.filter((ch) => ch.chainId != currentChain.chainId)}
                onSelect={(chain) => context?.switchChain(chain.chainId)}
              />
            </div>
            <div className="flex hover:text-sky-500">{`${context.account.slice(0, 6)}..${context.account.slice(
              -4
            )}`}</div>
          </div>
        ) : (
          <button className="btn-default px-2 py-1" onClick={context?.connect}>
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
