"use client";

import ThemeButton from "@/components/theme-button";
import { useConnection } from "@solana/wallet-adapter-react";

import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";


import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <nav>
        <WalletMultiButton />
      <ThemeButton />
    </nav>
  );
};
