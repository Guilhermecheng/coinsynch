'use client'

import { usePathname } from "next/navigation";
import * as Dialog from '@radix-ui/react-dialog';

import { BiChevronDown } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CoinCarousel } from "./CoinCarousel";
import { useContext } from "react";
import { GlobalContext } from "@/contexts/GlobalContext";

export function Header() {
    const pathname = usePathname();
    const { setModalType } = useContext(GlobalContext);

    if(pathname === "/") {
        return(

            <header className="flex flex-col w-full items-center justify-center text-secondary-500 text-sm shadow-xl md:shadow-none">
                <div className="flex w-full items-center justify-between h-14 sm:h-[60px] md:h-16 max-w-[1264px] px-12">
                    <img src="/coinsynch.png" className="w-[124px]" alt="Coinsynch logo" />
                    
                    <div className="hidden md:flex">
                        <span>About us</span>
                        <span>Top Cryptos</span>
                    </div>
                    
                    <div className="hidden md:flex">
                        <CoinCarousel />
                    </div>

                    <div className="hidden sm:flex gap-x-6 items-center justify-center">
                    <Dialog.Trigger asChild aria-controls="modal-content" id="header-signin" onClick={() => setModalType("signin")}>
                        <span className="cursor-pointer">Sign In</span>
                    </Dialog.Trigger>

                    <Dialog.Trigger asChild aria-controls="modal-content" id="header-signup" onClick={() => setModalType("signup")}>
                        <span className="px-4 py-2 rounded-full bg-primary-500 text-white cursor-pointer">Sign Up</span>
                    </Dialog.Trigger>

                    </div>

                    <div className="flex sm:hidden">
                        <RxHamburgerMenu size={16} />
                    </div>

                </div>

                <div className="flex w-full items-center justify-center md:hidden h-6 border-t-2 border-t-secondary-200">
                    <span>
                        <CoinCarousel />
                    </span>
                </div>
            </header>
        )

    } else {
        // logged menu
        return(
            <header className="flex w-full items-center justify-between h-14 sm:h-[60px] md:h-16 px-10 shadow-xl text-sm text-basecolor">
                <div className="block md:hidden rounded-full p-1 border-2 border-secondary-500 text-secondary-500">
                    <RxHamburgerMenu size={16} />
                </div>
                
                <img src="/coinsynch.png" className="w-[124px] cursor-pointer" alt="Coinsynch logo" />

                <div className="flex items-center gap-x-2">
                    <img src="https://github.com/Guilhermecheng.png" className="h-8 rounded-full" alt="Avatar" />
                    <span className="hidden md:flex">Ronald</span>
                    <BiChevronDown size={16} className="cursor-pointer" />
                </div>
            </header>
        )
    }
}