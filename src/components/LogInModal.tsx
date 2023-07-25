'use client';

import { GlobalContext } from "@/contexts/GlobalContext";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox';

import { useContext } from "react";

import { RiCloseLine } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";

export function LogInModal() {
    const { modalType, setModalType } = useContext(GlobalContext);


    return(
        <Dialog.Portal>
            <Dialog.Overlay className="fixed w-full h-full inset-0 bg-basecolor opacity-70 border-none" />

            <Dialog.Content aria-controls="modal-content" className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <div className="bg-white rounded-xl flex flex-col items-center justify-center p-6 md:p-8 text-basecolor w-[320px] md:w-[450px] relative">
                <Dialog.Close>
                    <RiCloseLine size={18} className="absolute right-4 top-4 cursor-pointer text-secondary-500" />
                </Dialog.Close>

                    <h1 className="text-xl">Sign { modalType === "signin" ? "in" : "up" } to <span className="font-bold"><span className="text-primary-500">Coin</span><span className="text-secondary-500">Synch</span></span></h1>

                    {modalType  === "signin" ? (

                        <div className="flex flex-col w-full mt-3.5 sm:mt-6 md:mt-8">
                            <input type="text" placeholder="Email"  className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4"/>
                            <input type="password" placeholder="Password" className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4 mt-3.5 md:mt-6" />

                            <span className="w-full flex justify-end text-xs mt-2 cursor-pointer">Forgot password?</span>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full gap-y-3.5 md:gap-y-6 mt-3.5 sm:mt-6 md:mt-8">
                            <input type="text" placeholder="Name"  className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4"/>
                            <input type="text" placeholder="Email"  className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4"/>
                            <input type="password" placeholder="Password" className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4" />
                            <input type="password" placeholder="Confirm Password" className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4" />

                            <span className="w-full flex text-xs mt-2 cursor-pointer">
                            <Checkbox.Root className="w-[20px] h-[20px] bg-white border-2 border-primary-500 rounded mr-2" id="c1">
                                <Checkbox.Indicator className="flex items-center justify-center">
                                    <FiCheck size={12} />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <label htmlFor="c1">I've read and accepted the <span className="font-bold">Privacy Policy</span> and <span className="font-bold">Terms of User Sign up.</span></label>
                            </span>
                        </div>
                    )}




                    <button className="mt-3.5 md:mt-6 flex items-center justify-center w-full bg-primary-500 text-white rounded-full py-3.5">
                        {modalType  === "signin" ? "Sign In": "Sign Up" }
                    </button>

                    <div className="mt-6">
                        {modalType  === "signin" ? (
                            
                            <span>Don't have an account? <span className="font-bold cursor-pointer" onClick={() => setModalType("signup")}>Sign up to <span className="text-primary-500">Coin</span><span className="text-secondary-500">Synch</span></span></span>
                        ) : (
                            <span>Already have an account? <span className="font-bold cursor-pointer" onClick={() => setModalType("signin")}>Sign in to <span className="text-primary-500">Coin</span><span className="text-secondary-500">Synch</span></span></span>
                        ) }
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
}