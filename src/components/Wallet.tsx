import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';

import { GlobalContext, UserDataProps, WalletProps } from "@/contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { AddCrypto } from './AddCrypto';
import { TransferCrypto } from './TransferCrypto';
import axios from 'axios';
import { cryptoList } from '@/lib/utils';

interface ResponseAssetProps {
    data: {
        id: string;
        rank: string;
        symbol: string;
        name: string;
        supply: string;
        maxSupply: string;
        marketCapUsd: string;
        volumeUsd24Hr: string;
        priceUsd: string;
        changePercent24Hr: string;
        vwap24Hr: string;
        explorer: string;
    }
}

export function Wallet() {
    const { userData, walletUpdated, setWalletUpdated } = useContext(GlobalContext);

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

    async function getCryptoValues(userWallet: UserDataProps) {
        let newWallet: WalletProps[] = [];
        
        try {
            const promises = userWallet.wallet.map((asset) => {
                const crypto = cryptoList.find(as => as.crypto === asset.crypto);
                if(crypto) {
                    return axios.get<ResponseAssetProps>(`https://api.coincap.io/v2/assets/${crypto.id}`);
                }
            })

            const responses = await Promise.all(promises);

            if(responses) {
                responses.forEach((asset, i) => {
                    const crypto = cryptoList.find(as => as.crypto === userWallet.wallet[i].crypto);
                    if(crypto) {
                        newWallet.push({
                            crypto: userWallet.wallet[i].crypto,
                            assetName: crypto.name,
                            average_price: userWallet.wallet[i].average_price,
                            quantity: userWallet.wallet[i].quantity,
                            updatedPrice: Number(asset?.data.data.priceUsd),
                            logo: crypto.logo
                        })
                    }
               })
               
               setWalletUpdated(newWallet);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(userData) {
            getCryptoValues(userData);

            // Fetch exchange rates every 5 seconds
            const intervalId = setInterval(() => getCryptoValues(userData), 5000);
            return () => clearInterval(intervalId);
        }
    }, [userData])


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
            className="text-basecolor flex flex-col items-center justify-center mx-6 sm:mx-14 lg:mx-16 py-6 sm:py-10 lg:py-14 border-t-2 border-secondary-300 z-10"
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
                    <TransferCrypto setModalState={setTransferCryptoModal} selectedCrypto={selectedTransferCrypto} />

                        {  walletUpdated.length > 0 ? (
                            <>
                                <ul id="mobile-wallet" className="grid grid-cols-2 gap-4 sm:hidden mt-4">
                                    { walletUpdated.map((walletItem, i) => {
                                        let holding = walletItem.updatedPrice * walletItem.quantity;
                                        let change = (walletItem.updatedPrice - walletItem.average_price) / walletItem.average_price;
            
                                        return (
                                            <li key={i} className="bg-white  w-full rounded-lg flex flex-col">
                                                <h1 className='w-full align-center text-xs px-5 py-4 bg-primary-100 rounded-t-lg'>
                                                    <div className='flex items-center w-full h-full'>
                                                        <img src={walletItem.logo} className="h-[32px]" alt={walletItem.crypto} />
                                                        <span className='ml-2'>{walletItem.assetName}</span>
                                                        <span className='ml-1'>{walletItem.crypto}</span>
                                                    </div>
                                                </h1>
            
                                                <div className='p-4'>
                                                    <h3 className='text-xs text-secondary-500'>Holdings</h3>
                                                    <h3 className='text-basecolor text-sm mt-1'>{ holding.toLocaleString("en-US", { style: "currency", currency: "USD" })  }</h3>
                                                    <span className='text-xs text-primary-500 mt-1'>{ walletItem.quantity } BTC</span>
                                                </div>
            
                                                <div className='border-t-2 border-secondary-200 p-4 pb-4'>
                                                    <h3 className='text-xs text-secondary-500'>Change</h3>
                                                    <h3 className='text-sm'>
                                                        <span className={change > 0 ? "text-tertiary-700" : "text-quartenary-700"}>{change.toFixed(2)} %</span>
                                                    </h3>
            
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
                                                    { walletUpdated.map((walletItem, i) => {
                                                        let holding = walletItem.updatedPrice * walletItem.quantity;
                                                        let change = (walletItem.updatedPrice - walletItem.average_price) / walletItem.average_price;

                                                        return (
                                                            <tr className="border-b text-base text-basecolor" key={i}>
                                                                <td className="text-center px-6 py-4 whitespace-nowrap">
                                                                    {i + 1}
                                                                </td>
                                                                <td className="text-center px-6 py-4 whitespace-nowrap">
                                                                    <div className='flex items-center'>
                                                                        <img src={walletItem.logo} alt={walletItem.crypto} className='mr-2 h-[32px]' />
                                                                        { walletItem.assetName } <span className='text-secondary-500 ml-2'>{walletItem.crypto}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="text-center flex flex-col px-6 py-4 whitespace-nowrap">
                                                                    { holding.toLocaleString("en-US", { style: "currency", currency: "USD" }) }
                                                                    <span className='text-xs text-primary-500'>{ walletItem.quantity } <span>{walletItem.crypto}</span></span>
                                                                </td>
                                                                <td className="text-center px-6 py-4 whitespace-nowrap">
                                                                    <span className={change > 0 ? "text-tertiary-700" : "text-quartenary-700"}>{change.toFixed(2)} %</span>
                                                                </td>

                                                                <td className="text-center whitespace-nowrap px-6 py-4  align-center justify-center">
                                                                    <Dialog.Trigger aria-controls="modal-transfercrypto" onClick={() => setSelectedTransferCrypto(walletItem)}>
                                                                        <Tooltip.Provider>
                                                                            <Tooltip.Root>
                                                                                <Tooltip.Trigger asChild>
                                                                                        <img src="/exchange.svg" alt={`Trade ${walletItem.crypto}`} />
                                                                                </Tooltip.Trigger>
                                                                                
                                                                                <Tooltip.Portal>
                                                                                    <Tooltip.Content className="bg-primary-500 px-4 py-2 rounded-md text-xs text-white" sideOffset={5}>
                                                                                        Trade {walletItem.crypto}
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
                            </>
                        ) : (
                            <div className='w-full mt-4 bg-white py-10 h-[240px] flex flex-col items-center justify-center rounded-xl shadow-xl sm:shadow-none'>
                                <img src="/empty_wallet.svg" alt="empty wallet" className='sm:h-20' />
                                <h1 className='text-base text-basecolor font-bold mt-4 sm:mt-6 sm:text-xl'>Nothing here yet...</h1>
                                <p className='mt-2 text-bascolor text-xs sm:text-base'>Add crypto and start earning</p>
                            </div>
                        )}

                    {  walletUpdated.length > 0 && (
                        <span className='mt-16 text-base text-primary-500 cursor-pointer' onClick={viewMoreFunc}>
                            { viewMore === 5 ? (
                                "View more +"
                            ) : (
                                "View less -"
                            ) }
                        </span>
                    )}
                </Dialog.Root>
            </div>
        </div>
    )
}