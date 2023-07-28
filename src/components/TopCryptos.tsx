"use client"
import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';
import { BiChevronDown } from "react-icons/bi";

export function TopCryptos() {
    return (
        <section className="w-full flex items-center justify-center px-6 sm:px-12 py-14 sm:py-20 lg:py-40">

            <div className="flex flex-col w-full items-center">
                <h1 className="text-basecolor texl-xl sm:text-2xl lg:text-4xl font-bold">Top Cryptos</h1>

                <div className='md:hidden flex w-full px-8 justify-between mb-2 mt-4'>
                    <span className='text-xs text-secondary-500'>Crypto</span>
                    <span className='text-xs text-secondary-500'>Trade</span>
                </div>

                <Accordion.Root type='single' collapsible className="md:hidden w-full text-secondary-500 [&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-secondary-100">
                    <Accordion.Item value='BTC'>
                        <Accordion.Trigger className="group flex justify-between w-full h-14 items-center px-4">
                            <div className='flex'>
                                <img src="/bitcoin.svg" alt="" />
                                <span className='ml-2 text-base'>Bitcoin BTC</span>
                            </div>
                            <BiChevronDown size={36} className="text-primary-500 transform group-radix-state-open:rotate-180 transition-all" />
                        </Accordion.Trigger>

                        <Accordion.Content className='p-4 border-t-2 border-secondary-200'>
                                <div className='flex justify-between items-center'>
                                    <h3 className='text-xs'>Price</h3>
                                    <span className='text-sm text-basecolor'>230000</span>
                                </div>
                                <div className='flex justify-between items-center mt-2'>
                                    <h3 className='text-xs'>Change</h3>
                                    <span className={`text-sm text-tertiary-700`}>+5.56</span>
                                </div>
                        </Accordion.Content>

                    </Accordion.Item>

                    <Accordion.Item value='ETH'>
                        <Accordion.Trigger className="group flex justify-between w-full h-14 items-center px-4">
                            <div className='flex'>
                                <img src="/bitcoin.svg" alt="" />
                                <span className='ml-2 text-base'>Bitcoin BTC</span>
                            </div>
                            <BiChevronDown size={36} className="text-primary-500 transform group-radix-state-open:rotate-180 transition-all"  />
                        </Accordion.Trigger>

                        <Accordion.Content className='p-4 border-t-2 border-secondary-200'>
                                <div className='flex justify-between items-center'>
                                    <h3 className='text-xs'>Price</h3>
                                    <span className='text-sm text-basecolor'>230000</span>
                                </div>
                                <div className='flex justify-between items-center mt-2'>
                                    <h3 className='text-xs'>Change</h3>
                                    <span className={`text-sm text-quartenary-700`}>-5.56</span>
                                </div>
                        </Accordion.Content>

                    </Accordion.Item>
                </Accordion.Root>
               

                <span className='mt-16 text-base text-primary-500 cursor-pointer'>View more +</span>
                
                <table className="hidden md:flex flex-col">
                    <thead>

                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </section>
    )
};
  