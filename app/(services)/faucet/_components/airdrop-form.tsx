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
import { requestAirdrop } from "@/actions/requestAirdrop";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTransition } from "react";

const formSchema = z.object({
  amount: z
    .number()
    .positive("Amount must be a positive number")
    .min(0.01, "Amount must be at least 0.01 SOL"),
});

const AirdropForm = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [isPending, startTransaction] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

        startTransaction(async () => {
            await connection.requestAirdrop(publicKey, amount*LAMPORTS_PER_SOL)
                .then(() => toast.success(`Airdrop of ${amount} SOL requested successfully.`))
                .catch(() => toast.error("Unable to airdrop SOL. Please try again."))
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

export default AirdropForm;
