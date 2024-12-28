"use client";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import { Navbar } from "./_components/navbar";
import WelcomePage from "./_components/welcomePage";

export default function Home() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 items-center justify-center p-3 lg:p-7">
                <WelcomePage />
            </div>
        </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
