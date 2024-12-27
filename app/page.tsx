"use client";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
// import { useEffect, useState } from "react";
import { Navbar } from "./_components/navbar";

export default function Home() {
  // const [isClient, setIsClient] = useState(false);

  // // Ensure the component only renders on the client
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return null; // Avoid rendering during SSR
  // }

  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Navbar />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
