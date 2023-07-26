'use client';

import { GlobalContext } from '@/contexts/GlobalContext';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { RiCloseLine } from "react-icons/ri";

import { cryptoList } from '@/lib/utils';

interface AddCryptoProps {
    setModalState: (arg: boolean) => void;
}

export function AddCrypto({ setModalState }: AddCryptoProps) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setUserData, userData } = useContext(GlobalContext);

    function addCrypto(data: FieldValues) {
        let newQty = Number(data.quantity);
        if(userData) {
            let avgPrice = 1000;
            let userCryptos = userData;
            let isOnWallet = userCryptos.wallet.findIndex(item => item.crypto === data.crypto);

            if(isOnWallet >= 0) {
                let oldPrice = userCryptos.wallet[isOnWallet].average_price;
                let oldQty = userCryptos.wallet[isOnWallet].quantity;
                userCryptos.wallet[isOnWallet].average_price = ( (oldPrice * oldQty) + (avgPrice * newQty) ) / (oldQty + newQty);
                userCryptos.wallet[isOnWallet].quantity = oldQty + newQty;

                setUserData(userCryptos);
                setModalState(false);
            } else {
                userCryptos.wallet.push({
                    crypto: data.crypto as string,
                    average_price: avgPrice,
                    quantity: newQty,
                })
            }
            setUserData(userCryptos);
            setModalState(false);
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
                                        {/* <span className='text-secondary-500 ml-2'>{crypto.crypto}</span> */}
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