"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
  


import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import ThemeButton from "@/components/theme-button";

export const Navbar = () => {
    const [isClient, setIsClient] = useState(false);

    const path = usePathname();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const routes = [
        {
            name: "Home",
            url: "/"
        },
        {
            name: "faucet",
            url: "/faucet"
        },
        {
            name: "transfer",
            url: "/transfer"
        },
        {
            name: "sign-message",
            url: "/sign-message"
        }

    ]


    return (
        <nav className="flex items-center justify-between h-[80px] w-full fixed">
            <div
                className="hidden  md:flex gap-5 capitalize text-lg m-4"
            >
                {routes.map((route, i) => (
                    <Link href={route.url} key={i} className={cn(
                        path === route.url && "text-violet-500"
                    )}>
                        {route.name}
                    </Link>
                ))}
            </div>

            <div className="md:hidden ml-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Menu />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle>Services</SheetTitle>
                        </SheetHeader>

                        <div
                            className="flex flex-col gap-5 capitalize text-lg m-4"
                        >
                            {routes.map((route, i) => (
                                <Link href={route.url} key={i} className={cn(
                                    path === route.url && "text-violet-500"
                                )}>
                                    {route.name}
                                </Link>
                            ))}
                        </div>

                    </SheetContent>
                </Sheet>
            </div>



            <div className="m-4  flex items-center gap-2 ">
                <WalletMultiButton className="h-4 w-8"/>
                <ThemeButton />
            </div>
        </nav>
    );
};
