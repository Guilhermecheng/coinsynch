'use client';

import { GlobalContext } from '@/contexts/GlobalContext';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { RiCloseLine } from "react-icons/ri";

import { cryptoList } from '@/lib/utils';
import axios from 'axios';

interface AddCryptoProps {
    setModalState: (arg: boolean) => void;
}

export function AddCrypto({ setModalState }: AddCryptoProps) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setUserData, userData, walletUpdated, setWalletUpdated } = useContext(GlobalContext);

    async function addCrypto(data: FieldValues) {

        const crypto = cryptoList.find(as => as.crypto === data.crypto);
        if(crypto) {
            let newQty = Number(data.quantity);
            
            const response = await axios.get(`https://api.coincap.io/v2/assets/${crypto.id}`);
            const avgPrice = Number(response?.data.data.priceUsd);

            if(userData && walletUpdated) {
                let userCryptos = userData;
                let wallet = walletUpdated;

                let isOnUserWallet = userCryptos.wallet.findIndex(item => item.crypto === data.crypto);
                let isOnUpdatedWallet = walletUpdated.findIndex(item => item.crypto === data.crypto);

                if(isOnUserWallet >= 0) {
                    let oldPrice = userCryptos.wallet[isOnUserWallet].average_price;
                    let oldQty = userCryptos.wallet[isOnUserWallet].quantity;
                    userCryptos.wallet[isOnUserWallet].average_price = ( (oldPrice * oldQty) + (avgPrice * newQty) ) / (oldQty + newQty);
                    userCryptos.wallet[isOnUserWallet].quantity = oldQty + newQty;

                    wallet[isOnUpdatedWallet].average_price = ((oldPrice * oldQty) + (avgPrice * newQty) ) / (oldQty + newQty);
                    wallet[isOnUpdatedWallet].quantity = oldQty + newQty;

                    setUserData(userCryptos);
                    setWalletUpdated(wallet);
                    setModalState(false);
                } else {
                    userCryptos.wallet.push({
                        crypto: data.crypto as string,
                        average_price: avgPrice,
                        quantity: newQty,
                    })
                    
                    wallet.push({
                        crypto: data.crypto as string,
                        average_price: avgPrice,
                        quantity: newQty,
                        assetName: response?.data.data.name,
                        updatedPrice: avgPrice,
                        logo: crypto?.logo,
                    })
                }
                setUserData(userCryptos);
                setWalletUpdated(wallet);
                setModalState(false);
            }
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed z-30 w-full h-full inset-0 bg-basecolor opacity-70 border-none" />
            <Dialog.Content aria-controls="modal-addcrypto" className="z-40 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <div className="bg-white rounded-xl flex flex-col items-center justify-center p-6 md:p-8 text-basecolor w-[320px] md:w-[450px] relative">
                <Dialog.Close>
                    <RiCloseLine size={18} className="absolute right-4 top-4 cursor-pointer text-secondary-500" />
                </Dialog.Close>
                <h1 className="text-xl">Add Crypto</h1>

                <form className="flex flex-col w-full mt-3.5 sm:mt-6 md:mt-8" onSubmit={handleSubmit(addCrypto)}>
                    <select
                        placeholder='Choose'
                        className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4 outline-none"
                        {...register("crypto", { required: true })}
                    >
                        { cryptoList.map((crypto, i) => {
                            return (
                                <option key={i} value={crypto.crypto}>
                                    <div className="flex items-center justify-center">
                                        <img src={crypto.logo} alt={crypto.name} />
                                        {crypto.name} 
                                    </div>
                                </option>
                            )
                        }) }
                    </select>

                    <input 
                        type="number" 
                        placeholder="Quantity" 
                        className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4 mt-3.5 md:mt-6 outline-none[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        {...register("quantity", { required: true })}
                    />

                    <button type="submit" className="mt-3.5 md:mt-6 flex items-center justify-center w-full bg-primary-500 text-white rounded-full py-3.5">
                        Add Crypto
                    </button>
                </form>
            </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
}