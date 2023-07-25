'use client'
import * as Dialog from '@radix-ui/react-dialog';
import { RiCloseLine } from "react-icons/ri";


export function CryptoModal() {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed w-full h-full inset-0 bg-basecolor opacity-70 border-none" />

            <Dialog.Content aria-controls="modal-content" className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <div className="bg-white rounded-xl flex flex-col items-center justify-center p-6 md:p-8 text-basecolor w-[320px] md:w-[450px] relative">
                <Dialog.Close>
                    <RiCloseLine size={18} className="absolute right-4 top-4 cursor-pointer text-secondary-500" />
                </Dialog.Close>
                    <h1 className="text-xl">Add Crypto</h1>

                </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
}