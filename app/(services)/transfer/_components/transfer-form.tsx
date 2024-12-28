"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";

import { useTransition } from "react";

const formSchema = z.object({
  toPublicKey: z.string().refine((key) => {
    try {
      const publicKey = new PublicKey(key); // Validate the public key format
      return PublicKey.isOnCurve(publicKey.toBytes()); // Check if it's on the curve
    } catch {
      return false; // Invalid public key format
    }
  }, {
    message: "Please enter a valid public key", // Error message for invalid public keys
  }),
  amount: z
    .number()
    .positive("Amount must be a positive number")
    .min(0.01, "Amount must be at least 0.01 SOL"),
});

const TransferForm = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [isPending, startTransaction] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      toPublicKey:"",
      amount: 0, // Default value is a number
    },
    mode: "onChange", // Enable live validation
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   
      if (!wallet.publicKey) {
        toast.error("Please connect your wallet to request an airdrop!");
        return;
      }
      
      const amount = values.amount;
      const publicKey = wallet.publicKey;    
      const toPublicKey = values.toPublicKey;   

      startTransaction(async () => {
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(toPublicKey),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection)
          .then(() => toast.success(`Transfer requested successfully.`))
          .catch(() => toast.error("Unable to transfer SOL. Please try again."))
      })
  }

  return (
    !isPending ? (
        <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10"
      >
        <FormField
          control={form.control}
          name="toPublicKey"
          render={({ field }) => (
            <FormItem className="space-y-5">
              <FormLabel>To Public Key</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="string"
                  step="0.01"
                  placeholder="Enter public key"
                />
              </FormControl>
              <FormDescription>
                Enter the public key where you want to transfer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="space-y-5">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  placeholder="Enter Amount (SOL)"
                  min="0.01"
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>
                Enter the amount of SOL you want to airdrop.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!wallet.connected || !form.formState.isValid}>
            Submit
        </Button>
      </form>
    </Form>
    ) :(
        <div>
            Transferring..
        </div>
    )
  );
};

export default TransferForm;
