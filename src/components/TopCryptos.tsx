"use client"
import { GlobalContext } from '@/contexts/GlobalContext';
import * as Accordion from '@radix-ui/react-accordion';
import { useContext } from 'react';
import { BiChevronDown } from "react-icons/bi";

export function TopCryptos() {
    const { topCryptos } = useContext(GlobalContext);

    return (
        <section className="w-full flex items-center justify-center px-6 sm:px-12 py-14 sm:py-20 lg:py-40">

            <div className="flex flex-col w-full items-center">
                <h1 className="text-basecolor texl-xl sm:text-2xl lg:text-4xl font-bold">Top Cryptos</h1>

                <div className='md:hidden flex w-full px-8 justify-between mb-2 mt-4'>
                    <span className='text-xs text-secondary-500'>Crypto</span>
                    <span className='text-xs text-secondary-500'>Trade</span>
                </div>

                <Accordion.Root type='single' collapsible className="md:hidden w-full text-secondary-500 [&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-secondary-100">
                    { topCryptos.map((crypto, i) => {
                        let change = (Math.random() * 2 - 1) * 10;

                        return (
                            <Accordion.Item value={crypto.crypto} key={crypto.crypto}>
                                <Accordion.Trigger className="group flex justify-between w-full h-14 items-center px-4">
                                    <div className='flex'>
                                        <img src={crypto.logo} alt={crypto.crypto} />
                                        <span className='ml-2 text-base'>{crypto.name} {crypto.crypto}</span>
                                    </div>
                                    <BiChevronDown size={36} className="text-primary-500 transform group-radix-state-open:rotate-180 transition-all" />
                                </Accordion.Trigger>

                                <Accordion.Content className='p-4 border-t-2 border-secondary-200'>
                                        <div className='flex justify-between items-center'>
                                            <h3 className='text-xs'>Price</h3>
                                            <span className='text-sm text-basecolor'>{crypto.price.toLocaleString("en-IN", { style: "currency", currency: "USD" })}</span>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <h3 className='text-xs'>Change</h3>
                                            <span className={`text-sm ${change > 0 ? "text-tertiary-700" : "text-quartenary-700"}`}>{`${change.toFixed(2)} %`}</span>
                                        </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        )
                    }  ) }
                </Accordion.Root>
                
                <table className="hidden md:block pt-10 table-auto">
                    <thead className=' text-secondary-500 text-sm font-normal'>
                        <tr className=''>
                            <th className='px-14 lg:px-22 py-5'>#</th>
                            <th className='px-14 lg:px-22 py-5'>Crypto</th>
                            <th className='px-14 lg:px-22 py-5'>Price</th>
                            <th className='px-14 lg:px-22 py-5'>Change</th>
                            <th className='px-14 lg:px-22 py-5'>Trade</th>
                        </tr>
                    </thead>

                    <tbody className='[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-secondary-100'>
                        { topCryptos.map((crypto, i) => {
                            let change = (Math.random() * 2 - 1) * 10;

                            return (
                                <tr key={i} className='text-base text-basecolor'>
                                    <td className='px-14 lg:px-22 py-5'>{i + 1}</td>

                                    <td className='px-14 lg:px-22 py-5 flex items-center'>
                                        <img src={crypto.logo} className='h-8 mr-4' alt={crypto.crypto} />
                                        {crypto.name} <span className='text-secondary-500'>{crypto.crypto}</span>
                                    </td>

                                    <td className='px-14 lg:px-22 py-5'>
                                        {crypto.price.toLocaleString("en-IN", { style: "currency", currency: "USD" })}
                                    </td>
                                    <td className={`px-14 lg:px-22 py-5 ${change > 0 ? "text-tertiary-700" : "text-quartenary-700"}`}>{`${change.toFixed(2)} %`}</td>
                                    <td className='px-14 lg:px-22 py-5'>
                                        <button className='py-2 px-8 bg-tertiary-700 text-white rounded-full cursor-pointer'>Buy</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <span className='mt-16 text-base text-primary-500 cursor-pointer'>View more +</span>
            </div>
        </section>
    )
};
  