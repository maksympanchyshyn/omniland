'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { WalletContext } from '@/hooks/useBrowserWallet';

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

  const context = useContext(WalletContext);
  const currentRoute = usePathname();

  return (
    <div className="w-full h-16 fixed top-0 border-b border-b-slate-700 bg-gray-900 z-50">
      <header className="flex justify-between w-full px-12 py-4 font-mono">
        <div className="flex">
          <Link href="/">Omniland</Link>
        </div>
        <div className="flex items-center gap-10">
          {menuItems.map((item) => (
            <div key={item.text} className="flex hover:text-sky-500 px-2 py-1">
              <Link href={item.link} className={(currentRoute === item.link && '') || ''}>
                {item.text}
              </Link>
            </div>
          ))}
        </div>
        <div className="flex items-center">
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
