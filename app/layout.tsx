'use client';

import './globals.css';
import { Inter } from 'next/font/google';

import Header from '@/components/Header';
import useBrowserWallet, { WalletContext } from '@/hooks/useBrowserWallet';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { account, provider, connect } = useBrowserWallet();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Web3Quests</title>
      </head>
      <body className={inter.className}>
        <WalletContext.Provider value={{ account, provider, connect }}>
          <Header />
          <main className="flex min-h-screen w-full flex-col items-center justify-start p-24">{children}</main>
          <footer className="border-t border-t-slate-700 w-full font-mono ">
            <div className="flex justify-center text-lg py-4">Made by @maksympanchyshyn</div>
          </footer>
        </WalletContext.Provider>
      </body>
    </html>
  );
}
