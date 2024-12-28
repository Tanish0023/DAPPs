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
import { toast } from "react-toastify";
import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

import { useTransition } from "react";

const formSchema = z.object({
  message: z.string().min(1, { message: "Message should have at least 1 character." })
});

const SignMessageForm = () => {
  const { publicKey, signMessage, connected } = useWallet();

  const [isPending, startTransaction] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message:"",
    },
    mode: "onChange", // Enable live validation
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   
      if (!publicKey){
        toast.error("Please connect your wallet to request an airdrop!");
        return;
      };
      if (!signMessage){
        toast.error("Wallet does not support message signing!");
        return;
      }
      
      const message = values.message;   
    
      startTransaction(async () => {
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())){
          toast.error("Message signature invalid!");
          throw new Error('Message signature invalid!');
        }

        const encodedSign = bs58.encode(signature);
        toast.success(`Message signature: ${encodedSign}`)
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
          name="message"
          render={({ field }) => (
            <FormItem className="space-y-5">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="string"
                  placeholder="Enter message here"
                />
              </FormControl>
              <FormDescription>
                Enter the message you want to sign
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!connected || !form.formState.isValid}>
            Submit
        </Button>
      </form>
    </Form>
    ) :(
        <div>
            Signing Message..
        </div>
    )
  );
};

export default SignMessageForm;
