'use client'

import { useRef, useEffect, useState, MutableRefObject } from "react";
import { motion, useScroll } from "framer-motion";

export function Cards() {
    const [width, setWidth] = useState(0);
    const carousel = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        setWidth(carousel?.current.scrollWidth - carousel?.current.offsetWidth);
    }, [])

    return(
        <motion.div ref={carousel} className="cursor-grab overflow-hidden pt-6 px-6">
            <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex w-full">
                <motion.div id="card-1" className='h-[260px] min-w-[200px] p-6 shadow-xl rounded-md'>
                    <img src="/coins.svg" className='h-10 sm:h-16' alt="" />
                    <h3 className='text-primary-500 text-sm sm:text-base mt-4 font-bold'>For your company</h3>
                    <h1 className='text-xl text-basecolor font-bold'>Crypto Solutions</h1>
                    <p className='text-basecolor text-sm mt-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, lorem.
                    </p>
                </motion.div>

                <motion.div id="card-2" className='h-[260px] min-w-[200px] ml-4 p-6 shadow-xl rounded-md'>
                    <img src="/trade.svg" className='h-10 sm:h-16' alt="" />
                    <h3 className='text-primary-500 text-sm sm:text-base mt-4 font-bold'>For your company</h3>
                    <h1 className='text-xl text-basecolor font-bold'>Crypto Solutions</h1>
                    <p className='text-basecolor text-sm mt-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, lorem.
                    </p>
                </motion.div>

                <motion.div id="card-3" className='h-[260px] min-w-[200px] ml-4 p-6 shadow-2xl'>
                    <img src="/charts.svg" className='h-10 sm:h-16' alt="" />
                    <h3 className='text-primary-500 text-sm sm:text-base mt-4 font-bold'>For your company</h3>
                    <h1 className='text-xl text-basecolor font-bold'>Crypto Solutions</h1>
                    <p className='text-basecolor text-sm mt-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, lorem.
                    </p>
                </motion.div>

                <motion.div id="card-4" className='h-[260px] min-w-[200px] p-6 ml-4 shadow-xl rounded-md'>
                    <img src="/computer.svg" className='h-10 sm:h-16' alt="Lorem" />
                    <h3 className='text-primary-500 text-sm sm:text-base mt-4 font-bold'>For your company</h3>
                    <h1 className='text-xl text-basecolor font-bold'>Crypto Solutions</h1>
                    <p className='text-basecolor text-sm mt-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, lorem.
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}