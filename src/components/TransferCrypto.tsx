"use client"

import { GlobalContext } from '@/contexts/GlobalContext';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { RiCloseLine } from "react-icons/ri";

import { cryptoList } from '@/lib/utils';

interface CoinProps {
    crypto: string;
    name: string;
    logo: string;
}

interface WalletProps {
    crypto: string;
    average_price: number;
    quantity: number;
}

interface TransferCryptoProps {
    setModalState: (arg: boolean) => void;
    selectedCrypto: {
        crypto: string;
        average_price: number;
        quantity: number;
    }
}

export function TransferCrypto({ setModalState, selectedCrypto }: TransferCryptoProps) {
    const { setUserData, userData } = useContext(GlobalContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [youRTransfering, setYouRTransfering] = useState<CoinProps>({
        crypto: "",
        name: "",
        logo: "",
    });
    const [wallet, setWallet] = useState<WalletProps | null>(null);
    const [max, setMax] = useState(0);
    
    useEffect(() => {
        let selection = cryptoList.find(item => item.crypto === selectedCrypto.crypto);
        let isInWallet = userData?.wallet.find(item => item.crypto === selectedCrypto.crypto);
        if(selection) {
            setYouRTransfering(selection);
        }

        if(isInWallet) {
            setWallet(isInWallet);
            setMax(isInWallet.quantity);
        }
    }, [selectedCrypto])

    function setMaxValue(e: React.ChangeEvent<HTMLSelectElement>) {
        event?.preventDefault();
        let isInWallet = userData?.wallet.find(item => item.crypto === selectedCrypto.crypto);

        if(e.target.value === "in") {
            setMax(10000000000000000000000)
        } else if(e.target.value === "out") {
            if(isInWallet) {
                setMax(isInWallet.quantity);
            }
        }
        console.log(max); // my onChange
    }

    function transferCrypto(data: FieldValues) {
        console.log(data, selectedCrypto)
        let newQty = Number(data.quantity);


        if(userData) {
            let newData = userData;
            let coinIndex = newData.wallet.findIndex(item => item.crypto === selectedCrypto.crypto);
            if(coinIndex >= 0) {
                let coin = newData.wallet[coinIndex];

                if(data.transferType === "out") {
                    if(newQty == coin.quantity) {
                        console.log("removinng")
                        newData.wallet.splice(coinIndex, 1);
                        setUserData(newData);
                        setModalState(false);
    
                    } else if (newQty < coin.quantity) {
                        let sum = coin.quantity - newQty;
                        newData.wallet[coinIndex].quantity = sum;
                        setUserData(newData);
                        setModalState(false);
    
                    }
                    
                } else if(data.transferType === "in") {
                    let sum = coin.quantity + newQty;
                    newData.wallet[coinIndex].quantity = sum;
                    setUserData(newData);
                    setModalState(false);
                }
            }
        }

    }
    

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed z-30 w-full h-full inset-0 bg-basecolor opacity-70 border-none" />
            <Dialog.Content aria-controls="modal-transfercrypto" className="z-40 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <div className="bg-white rounded-xl flex flex-col items-center justify-center p-6 md:p-8 text-basecolor w-[320px] md:w-[450px] relative">
                    <Dialog.Close>
                        <RiCloseLine size={18} className="absolute right-4 top-4 cursor-pointer text-secondary-500" />
                    </Dialog.Close>
                    <h1 className="text-xl mb-6">Transfer Crypto</h1>

                    <div className='flex w-full items-center justify-center text-sm gap-x-6 pt-6 border-t-2 border-secondary-200'>
                        <h3 className='text-secondary-400'>You are transfering</h3>
                        <div className='flex items-center justify-center text-base'>
                            <img src={youRTransfering.logo} alt={youRTransfering.crypto} />
                            <span className='text-secondary-500 ml-2'>{youRTransfering.name} {youRTransfering.crypto}</span>
                        </div>
                    </div>

                    <form className="flex flex-col w-full mt-3.5 sm:mt-6 md:mt-8" onSubmit={handleSubmit(transferCrypto)}>
                        <label htmlFor="in-or-out" className='mb-1'>Transfer</label>
                        <select
                            id="in-or-out"
                            placeholder='Choose'
                            className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4 mb-3.5 md:mb-6 outline-none text-secondary-400"
                            {...register("transferType", { required: true })}
                            onChange={(e) => setMaxValue(e)}
                        >
                            <option value="in">Transfer in</option>
                            <option value="out">Transfer out</option>
                        </select>

                        <label htmlFor="transf-qty" className='mb-1'>Quantity</label>
                        <input
                            id="transf-qty"
                            type="number" 
                            placeholder="0.00" 
                            className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4 outline-none text-secondary-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            {...register("quantity", { 
                                required: true,
                                min: 0,
                                value: 0,
                                max: max
                             })}
                        />
                        { wallet && <span className='text-sm ml-1 mt-1 text-secondary-400'>{`In wallet: ${wallet.quantity}`}</span> }
                        { errors.quantity && wallet && <span className='text-sm ml-1 mt-1 text-quartenary-500'>{`Please insert a quantity between 0 and ${wallet.quantity} ${wallet.crypto}`}</span> }


                        <button type="submit" className="mt-3.5 md:mt-6 flex items-center justify-center w-full bg-primary-500 text-white rounded-full py-3.5">
                            Transfer Crypto
                        </button>
                    </form>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
}