"use server"

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"

export const requestAirdrop = async (
    publicKey:  PublicKey, 
    connection: Connection, 
    amount:number 
) => {
    try {
        console.log("Hello Server");
        
        const request = await connection.requestAirdrop(publicKey, amount*LAMPORTS_PER_SOL);
        return `Airdrop of ${amount} SOL requested successfully. Transaction Signature: ${request}`;

        
    } catch (error) {
        throw new Error("Cannot Airdrop funds")
    }

}