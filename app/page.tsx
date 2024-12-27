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
          <Navbar />
          <WelcomePage />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
