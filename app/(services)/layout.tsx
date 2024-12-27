"use client";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import { Navbar } from "../_components/navbar";

interface ServiceLayoutProps {
  children: React.ReactNode;
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({ children }) => {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
                <div className="flex flex-col h-screen">
                    <Navbar />
                    <div className="flex flex-1 items-center justify-center ">
                        {children}
                    </div>
                </div>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  );
};

export default ServiceLayout;
