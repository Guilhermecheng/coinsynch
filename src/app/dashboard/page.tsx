'use client';

import { useContext } from "react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GlobalContext } from "@/contexts/GlobalContext";
import { VerticalMenu } from "@/components/VerticalMenu";


export default function Dashboard() {
    const { isVertMenuOpen, setIsVertMenuOpen } = useContext(GlobalContext);

    return (
        <div className="h-[100vh]">
            <DropdownMenu.Root>
                <Header />
            </DropdownMenu.Root>
            
            <div className="h-full bg-dashback">
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

                    <div 
                        id="wallet"
                        className=" text-basecolor flex flex-col items-center justify-center mx-6 sm:mx-14 lg:mx-16 py-6 sm:py-10 lg:py-14 border-t-2 border-secondary-300"
                    >
                        <div className="flex w-full justify-between items-center">
                            <div className="flex gap-x-4 items-center">
                                <img src="/wallet.svg" alt="My Wallet" />
                                <h1 className="text-lg sm:text-2xl font-bold whitespace-nowrap">My Wallet</h1>
                            </div>
                            <button className="py-2 px-4 bg-primary-500 text-white flex rounded-full">+<span className="hidden sm:flex sm:ml-2">Add crypto</span></button>
                        </div>


                        <ul id="mobile-wallet" className="grid grid-cols-2 sm:hidden">
                            <li>
                                <h1>
                                    Bitcoin BTC
                                </h1>

                                <div>
                                    <h3>Holdings</h3>
                                    <span>US$ 25.499,52</span>
                                    <span>434 BTC</span>
                                </div>

                                <div>
                                    <h3>Change</h3>
                                    <button>Trade</button>
                                </div>
                            </li>

                            <li>
                                <h1>
                                    Bitcoin BTC
                                </h1>

                                <div>
                                    <h3>Holdings</h3>
                                    <span>US$ 25.499,52</span>
                                    <span>434 BTC</span>
                                </div>

                                <div>
                                    <h3>Change</h3>
                                    <button>Trade</button>
                                </div>
                            </li>
                        </ul>

                        <table id="desktop-wallet" className="hidden sm:flex sm:flex-col sm:w-full">
                            <tr>
                                <th>#</th>
                                <th>Crypto</th>
                                <th>Holdings</th>
                                <th>Change</th>
                                <th>Trade</th>
                            </tr>

                            <tr>
                                <td>1</td>
                                <td>Bitcoin BTC</td>
                                <td>
                                    US$ 25.499,52
                                    <span>434 BTC</span>
                                </td>
                                <td>+5.2%</td>
                                <td>trade symboel</td>
                            </tr>
                            
                        </table>
                    </div>

                </div>
            </div>  

            <Footer />
        </div>
    )
}