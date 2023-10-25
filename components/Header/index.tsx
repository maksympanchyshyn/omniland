'use client';

import Link from 'next/link';
import { useContext } from 'react';

import { WalletContext } from '@/hooks/useBrowserWallet';

export default function Header() {
  const menuItems = [
    {
      text: 'Gas Refuel',
      link: '/refuel',
    },
    {
      text: 'Quests',
      link: '/quests',
    },
    {
      text: 'Achievements',
      link: '#',
    },
  ];

  const context = useContext(WalletContext);

  return (
    <div className="w-full fixed border-b border-b-slate-700 bg-gray-900 z-50">
      <header className="flex justify-between w-full px-12 py-4 font-mono">
        <div className="flex">
          <Link href="/">WEB3QUESTS</Link>
        </div>
        <div className="flex items-center gap-10">
          {menuItems.map((item) => (
            <div key={item.text} className="flex hover:text-sky-500 px-2 py-1">
              <a href={item.link}>{item.text}</a>
            </div>
          ))}
          {context?.account ? (
            <div className="flex hover:text-sky-500 px-2 py-1">{`${context.account.slice(
              0,
              6
            )}..${context.account.slice(-4)}`}</div>
          ) : (
            <button className="btn-default px-2 py-1" onClick={context?.connect}>
              Sign in
            </button>
          )}
        </div>
      </header>
    </div>
  );
}
