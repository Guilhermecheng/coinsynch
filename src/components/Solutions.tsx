'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { GlobalContext } from '@/contexts/GlobalContext';
import { Cards } from './Cards';

export function Solutions() {
    const { setModalType, isVertMenuOpen, setIsVertMenuOpen, setUserData, userData } = useContext(GlobalContext);

    return (
        <div className='w-full bg-linear-gradient pt-14 pb-6'>
            <div id="solutions-title" className="px-6">
                <h1 className='text-primary-500 text-base sm:text-lg font-bold'>Lorem Ipsum</h1>
                <h1 className='text-basecolor text-2xl sm:text-2xl font-bold'>Lorem Ipsum</h1>
                <p className='text-sm mt-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
                </p>

                <span className='hidden lg:flex mt-10'>
                    <Dialog.Trigger asChild aria-controls="modal-content" id="header-signup" onClick={() => setModalType("signup")}>
                        <span className="px-6 py-3 rounded-full bg-primary-500 text-white cursor-pointer">Sign up now</span>
                    </Dialog.Trigger>
                </span>
            </div>

            <div id="full-cards" className="hidden sm:flex w-full sm:pt-10 sm:flex-wrap sm:gap-6 sm:items-center justify-center">
                {/* <div className='w-full'> */}
                    <div id="card-1" className='w-[280px] p-6 shadow-xl rounded-md'>
                        <img src="/coins.svg" className='h-10 sm:h-16' alt="" />
                        <h3 className='text-primary-500 text-sm sm:text-base mt-4 font-bold'>For your company</h3>
                        <h1 className='text-xl text-basecolor font-bold'>Crypto Solutions</h1>
                        <p className='text-basecolor text-sm mt-2'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, lorem.
                        </p>
                    </div>
                    <div id="card-2" className='w-[280px] p-6 shadow-xl rounded-md'>
                        <img src="/trade.svg" className='h-10 sm:h-16' alt="" />
                        <h3 className='text-primary-500 text-sm sm:text-base mt-4 font-bold'>For your company</h3>
                        <h1 className='text-xl text-basecolor font-bold'>Crypto Solutions</h1>
                        <p className='text-basecolor text-sm mt-2'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, lorem.
                        </p>
                    </div>
                    
                {/* </div> */}
                <div id="card-3" className='w-[280px] p-6 shadow-2xl'>
                    <img src="/charts.svg" className='h-10 sm:h-16' alt="" />
                    <h3 className='text-primary-500 text-sm sm:text-base mt-4 font-bold'>For your company</h3>
                    <h1 className='text-xl text-basecolor font-bold'>Crypto Solutions</h1>
                    <p className='text-basecolor text-sm mt-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, lorem.
                    </p>
                </div>
                <div id="card-4" className='w-[280px] p-6 shadow-xl rounded-md'>
                    <img src="/computer.svg" className='h-10 sm:h-16' alt="Lorem" />
                    <h3 className='text-primary-500 text-sm sm:text-base mt-4 font-bold'>For your company</h3>
                    <h1 className='text-xl text-basecolor font-bold'>Crypto Solutions</h1>
                    <p className='text-basecolor text-sm mt-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, lorem.
                    </p>
                </div>
            </div>
            <div id="mobile-cards" className="flex w-full sm:hidden">
                <Cards />
            </div>
        </div>
    )
}