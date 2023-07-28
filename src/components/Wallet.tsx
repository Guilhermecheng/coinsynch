import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';

import { GlobalContext } from "@/contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { AddCrypto } from './AddCrypto';
import { TransferCrypto } from './TransferCrypto';
import axios from 'axios';

export function Wallet() {
    const { setUserData, userData } = useContext(GlobalContext);

    const [addCryptoModal, setAddCryptoModal] = useState(false);
    const [transferCryptoModal, setTransferCryptoModal] = useState(false);
    const [viewMore, setViewMore] = useState(5);
    
    function viewMoreFunc() {
        if(viewMore === 5) {
            setViewMore(10)
        } else {
            setViewMore(5)
        }
    }

    const [selectedTransferCrypto, setSelectedTransferCrypto] = useState({
        crypto: "",
        average_price: 0,
        quantity: 0,
    });

    async function getCryptoValues() {
        const response = await axios.get(`https://api.coincap.io/v2/assets`);
    }

    useEffect(() => {
        if(userData) {
            getCryptoValues();
        }

    }, [userData, ])


    if(!userData) {
        return (
            <div>
                No data found
            </div>
        )
    }

    return(
        <div 
            id="wallet"
            className=" text-basecolor flex flex-col items-center justify-center mx-6 sm:mx-14 lg:mx-16 py-6 sm:py-10 lg:py-14 border-t-2 border-secondary-300"
        >
            <div className='w-full sm:p-6 sm:bg-white sm:rounded-lg sm:shadow-lg'>

            
                <div className="flex w-full justify-between items-center">
                    <div className="flex gap-x-4 items-center">
                        <img src="/wallet.svg" alt="My Wallet" />
                        <h1 className="text-lg sm:text-2xl font-bold whitespace-nowrap">My Wallet</h1>
                    </div>


                    <Dialog.Root open={addCryptoModal} onOpenChange={setAddCryptoModal}>
                        <Dialog.Trigger asChild aria-controls="modal-addcrypto">
                            <button className="py-2 px-4 bg-primary-500 text-white flex rounded-full">+<span className="hidden sm:flex sm:ml-2">Add crypto</span></button>
                        </Dialog.Trigger>
                        <AddCrypto setModalState={setAddCryptoModal} />
                    </Dialog.Root>
                </div>

                <Dialog.Root open={transferCryptoModal} onOpenChange={setTransferCryptoModal}>

                    <ul id="mobile-wallet" className="grid grid-cols-2 gap-4 sm:hidden mt-4">
                        { userData.wallet.map((wallet_item, i) => {
                            return (
                                <li key={i} className="bg-white  w-full rounded-lg flex flex-col">
                                    <h1 className='w-full align-center text-xs px-5 py-4 bg-primary-100 rounded-t-lg'>
                                        {wallet_item.crypto}
                                    </h1>

                                    <div className='p-4'>
                                        <h3 className='text-xs text-secondary-500'>Holdings</h3>
                                        <h3 className='text-basecolor text-sm mt-1'>{ wallet_item.average_price }</h3>
                                        <span className='text-xs text-primary-500 mt-1'>{ wallet_item.quantity } BTC</span>
                                    </div>

                                    <div className='border-t-2 border-secondary-200 p-4 pb-4'>
                                        <h3 className='text-xs text-secondary-500'>Change</h3>
                                        <h3 className='text-sm'>+5,00</h3>

                                        <Dialog.Trigger aria-controls="modal-transfercrypto" className='bg-primary-500 text-sm text-white w-full mt-4 py-2 rounded-full'>
                                            Trade
                                        </Dialog.Trigger>

                                    </div>
                                </li>
                            )
                        }) }
                    </ul>

                    <div className="hidden sm:flex sm:flex-col sm:w-full pt-6">
                        <div className="overflow-x-auto">
                            <div className="py-2 inline-block min-w-full ">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-t-2 text-base text-basecolor">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-center">
                                                #
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-center">
                                                Crypto
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-center">
                                                Holdings
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-center">
                                                Change
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-center">
                                                Trade
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-secondary-100">
                                        { userData.wallet.map((wallet_item, i) => {
                                            return (
                                                <tr className="border-b text-base text-basecolor">
                                                    <td className="text-center px-6 py-4 whitespace-nowrap">
                                                        {i + 1}
                                                    </td>
                                                    <td className="text-center px-6 py-4 whitespace-nowrap">
                                                        {wallet_item.crypto}
                                                    </td>
                                                    <td className="text-center flex flex-col px-6 py-4 whitespace-nowrap">
                                                        { wallet_item.average_price }
                                                        <span className='text-xs text-primary-500'>{ wallet_item.quantity } <span>{wallet_item.crypto}</span></span>
                                                    </td>
                                                    <td className="text-center px-6 py-4 whitespace-nowrap">
                                                        @mdo
                                                    </td>

                                                    <td className="text-center whitespace-nowrap px-6 py-4  align-center justify-center">
                                                        <Dialog.Trigger aria-controls="modal-transfercrypto" onClick={() => setSelectedTransferCrypto(wallet_item)}>
                                                            <Tooltip.Provider>
                                                                <Tooltip.Root>
                                                                    <Tooltip.Trigger asChild>
                                                                            <img src="/exchange.svg" alt={`Trade ${wallet_item.crypto}`} />
                                                                    </Tooltip.Trigger>
                                                                    
                                                                    <Tooltip.Portal>
                                                                        <Tooltip.Content className="bg-primary-500 px-4 py-2 rounded-md text-xs text-white" sideOffset={5}>
                                                                            Trade {wallet_item.crypto}
                                                                            <Tooltip.Arrow className="fill-primary-500" />
                                                                        </Tooltip.Content>
                                                                    </Tooltip.Portal>
                                                                </Tooltip.Root>
                                                            </Tooltip.Provider>
                                                        </Dialog.Trigger>
                                                    </td>
                                                </tr>

                                            )})}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>

                    <span className='mt-16 text-base text-primary-500 cursor-pointer' onClick={viewMoreFunc}>
                        { viewMore === 5 ? (
                            "View more +"
                        ) : (
                            "View less -"
                        ) }
                    </span>

                    <TransferCrypto setModalState={setTransferCryptoModal} selectedCrypto={selectedTransferCrypto} />
                </Dialog.Root>
            </div>
        </div>
    )
}