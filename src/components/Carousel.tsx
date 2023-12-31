'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import { BsArrowRight } from 'react-icons/bs';
import { GlobalContext } from '@/contexts/GlobalContext';

export function Carousel() {
    const { setModalType } = useContext(GlobalContext);

    return (
        <section id="carousel-section" className="w-full h-[480px] md:h-[398px] lg:h-[655px] flex flex-col items-center pt-14 md:pt-16">
            <div className='flex flex-col items-center w-full h-[60%] lg:h-full px-8 md:flex-row md:gap-x-16 max-w-[1264px]'>
                <div className='flex flex-col items-center md:items-start lg:pt-12'>
                    <h1 className='text-xl leading-8 md:text-3xl lg:text-5xl text-primary-500 font-bold text-center md:text-start'>Lorem ipsum dolor sit amet, consectetur</h1>
                    <p className='text-sm leading-6 md:text-base lg:text-xl text-basecolor text-center md:text-start mt-2 mb-6'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
                    </p>

                    <Dialog.Trigger asChild aria-controls="modal-content" id="header-signup" onClick={() => setModalType("signup")}>
                        <button className="px-4 py-2 flex items-center rounded-full bg-primary-500 text-white cursor-pointer">
                            <span>Sign Up Now</span>
                            <BsArrowRight size={12} className="ml-4" />
                        </button>
                    </Dialog.Trigger>

                    <div className='flex gap-x-8 mt-6 md:mt-10 lg:mt-20 text-xs sm:text-base lg:text-xl'>
                        <span className='text-primary-500 bg-primary-100 py-1 px-4 rounded font-normal'>Crypto</span>
                        <span className='text-primary-500 bg-primary-100 py-1 px-4 rounded font-normal'>Games</span>
                        <span className='text-primary-500 bg-primary-100 py-1 px-4 rounded font-normal'>NFT</span>
                    </div>
                </div>

                    <ReactCarousel 
                        className="hidden md:block h-[280px] md:w-[45%]"
                        infiniteLoop
                        autoPlay
                        stopOnHover
                        dynamicHeight
                        swipeable
                        showIndicators={false}
                        showStatus={false}
                        showArrows={false}
                        showThumbs={false}
                        interval={3000}
                    >
                        <img src="/carousel1.png" alt="Lorem the Ipsum!" />
                        <img src="/carousel2.png" alt="Lorem the Ipsum!" />
                        <img src="/carousel3.png" alt="Lorem the Ipsum!" /> 
                    </ReactCarousel>
            </div>

            <div className=" w-full bg-[url('/wave.png')] h-[200px] lg:h-[499px] bg-cover bg-top bg-no-repeat"></div>
        </section>
    )
}