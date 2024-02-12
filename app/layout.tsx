'use client';

import './globals.css';
import { Inter } from 'next/font/google';

import Header from '@/components/Header';
import useBrowserWallet, { WalletContext } from '@/hooks/useBrowserWallet';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { account, chainId, provider, connect, switchChain } = useBrowserWallet();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Omniland</title>
      </head>
      <body className={inter.className}>
        <WalletContext.Provider value={{ account, chainId, provider, connect, switchChain }}>
          <Header />
          <main className="flex min-h-screen w-full px-12 pt-16">{children}</main>
          <footer className="border-t border-t-slate-700 w-full font-mono h-16">
            <div className="flex justify-center text-lg py-4">Made by @maksympanchyshyn</div>
          </footer>
        </WalletContext.Provider>
      </body>
    </html>
  );
}
