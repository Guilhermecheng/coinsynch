'use client';

import { redirect } from 'next/navigation';
import { useContext, useEffect } from "react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GlobalContext } from "@/contexts/GlobalContext";
import { VerticalMenu } from "@/components/VerticalMenu";
import { Wallet } from "@/components/Wallet";


export default function Dashboard() {
    const { isVertMenuOpen, userData } = useContext(GlobalContext);

    if(!userData) {
        redirect("/");
    }

    return (
        <div className="h-[100vh]">
            <DropdownMenu.Root>
                <Header />
            </DropdownMenu.Root>
            
            <div className="h-full sm:h-[calc(100%-116px)] md:h-[calc(100%-128px)] bg-dashback">
                <VerticalMenu />

                <div id="dashboard" className="relative md:w-[calc(100%-90px)] h-full md:ml-[90px]">
                    {isVertMenuOpen && <div className={`absolute w-full h-full inset-0 bg-basecolor opacity-70 border-none z-10`} /> }

                    <div id="overview" className="text-basecolor flex flex-col gap-y-4 sm:gap-y-6 lg:flex-row lg:gap-y-0 lg:gap-x-8 w-full items-center justify-center px-6 sm:px-14 lg:px-16 py-6 sm:py-10 lg:py-14">
                        <div id="balance" className="grid grid-cols-2 rounded-lg shadow-xl w-full lg:max-w-[592px] h-[48px] sm:h-[64px] lg:h-[112px] bg-white">
                            <div className="flex items-center px-4 lg:px-8">
                                <img src="/balance.svg" className="w-8 sm:w-12 lg:w-16" alt="Balance" />
                                <div className="flex flex-col ml-2 lg:ml-4">
                                    <h1 className="text-sm sm:text-xl lg:text-2xl">Balance</h1>
                                    <span className="text-secondary-500 text-xs lg:text-base">in US$</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center bg-primary-100 rounded-r-lg">
                                <h1 className="font-bold text-base sm:text-2xl lg:text-3xl">US$32,256.56</h1>
                            </div>
                        </div>

                        <div className="flex w-full lg:max-w-[592px] gap-x-4 sm:gap-x-8">
                            <div id="daily-graphic" className="block w-full sm:flex lg:h-[112px] rounded-lg shadow-xl bg-white">
                                <div className="px-4 py-2 sm:w-[30%]">
                                    <h3>Daily Variation</h3>
                                    <span>Ethereum</span>
                                    <span>+5,65%</span>
                                </div>

                                <div className="sm:w-[70%]">
                                    Grafico
                                </div>
                            </div>

                            <div id="news" className="flex flex-col w-full sm:flex-row lg:h-[112px] rounded-lg shadow-xl bg-white">
                                <div className="px-4 py-2">
                                    <h1 className="font-bold text-sm">NFT`s news</h1>
                                    <p className="text-secondary-500 text-xs mt-1">New Elephant NFT to be launched!</p>
                                    <button className="hidden sm:flex cursor-pointer text-xs text-primary-400 mt-2">Read more+</button>
                                </div>
                                
                                <div className="bg-[url('/eduphant.png')] bg-cover bg-center bg-no-repeat h-[80px] sm:h-full w-full rounded-b-lg sm:rounded-l-none sm:rounded-r-lg">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Wallet />

                </div>
            </div>  

            <Footer />
        </div>
    )
}