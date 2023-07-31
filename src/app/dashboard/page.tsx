'use client';

import { redirect } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GlobalContext } from "@/contexts/GlobalContext";
import { VerticalMenu } from "@/components/VerticalMenu";
import { Wallet } from "@/components/Wallet";
import { Balance } from '@/components/Balance';
import { Chart } from '@/components/Chart';
import axios from 'axios';


export default function Dashboard() {
    const { isVertMenuOpen, userData } = useContext(GlobalContext);
    const [dailyVariationAsset, setDailyVariationAsset] = useState({
        id:"bitcoin",
        crypto: "BTC",
        name: "Bitcoin",
        logo: "/bitcoin.svg",
        price: 0,
    });

    const [dailyVariationPercentage, setDailyVariationPercentage] = useState(0);

    if(!userData) {
        redirect("/");
    }

    useEffect(() => {
        async function getDailyVariationData() {
            const response = await axios.get(`https://api.coincap.io/v2/assets/${dailyVariationAsset.id}`);
            if(response.status === 200) {
                let variation = Number(response.data.data.changePercent24Hr);
                setDailyVariationPercentage(variation);
            }
        }
        getDailyVariationData();
    }, [])

    return (
        <div className="sm:h-[100vh] overflow-hidden">
            <DropdownMenu.Root>
                <Header />
            </DropdownMenu.Root>
            
            <div className="h-full sm:h-[calc(100%-116px)] md:h-[calc(100%-128px)] bg-dashback">
                <VerticalMenu />
                <div id="dashboard" className="relative md:w-[calc(100%-90px)] h-full md:ml-[90px] overflow-scroll min-h-[85vh]">
                    {isVertMenuOpen && <div className={`absolute w-full h-full inset-0 bg-basecolor opacity-70 border-none z-10`} /> }

                    <div id="overview" className="text-basecolor flex flex-col gap-y-4 sm:gap-y-6 lg:flex-row lg:gap-y-0 lg:gap-x-8 w-full items-center justify-center px-6 sm:px-14 lg:px-16 py-6 sm:py-10 lg:py-14">
                        <div id="balance" className="grid grid-cols-2 rounded-lg shadow-xl w-full lg:max-w-[592px] h-[48px] sm:h-[64px] lg:h-[112px] bg-white">
                            <div className="flex items-center px-4 lg:px-8">
                                <img src="/balance.svg" className="w-8 sm:w-12 lg:w-16" alt="Balance" />
                                <div className="flex flex-col ml-2 lg:ml-4">
                                    <h1 className="text-sm sm:text-xl lg:text-2xl">Balance</h1>
                                    <span className="text-secondary-500 text-xs lg:text-base">in USD</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center bg-primary-100 rounded-r-lg">
                                <Balance />
                            </div>
                        </div>

                        <div className="flex w-full lg:max-w-[592px] gap-x-4 sm:gap-x-8">
                            <div id="daily-graphic" className="block w-full sm:flex lg:h-[112px] rounded-lg shadow-xl bg-white">
                                <div className="px-4 py-2 sm:w-[35%]">
                                    <h3 className='text-xs text-secondary-500'>Daily Variation</h3>
                                    <div className='flex mt-2 sm:flex-col items-center sm:items-start w-full justify-between'>
                                        <div className='flex items-center'>
                                            <img src={dailyVariationAsset.logo} alt={dailyVariationAsset.crypto} className="h-4" />
                                            <span className='text-xs text-basecolor ml-2'>{dailyVariationAsset.crypto}</span>
                                        </div>
                                        <span className={`text-sm ${dailyVariationPercentage > 0 ? "text-tertiary-700" : "text-quartenary-700"} sm:mt-2`}>{`${dailyVariationPercentage.toFixed(2)} %`}</span>
                                    </div>
                                </div>
                                <div className='h-[90px] sm:w-[65%] sm:h-full w-full flex justify-end'>
                                    <Chart />
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