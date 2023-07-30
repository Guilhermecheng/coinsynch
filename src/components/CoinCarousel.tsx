'use client'

import { GlobalContext } from "@/contexts/GlobalContext";
import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";


export function CoinCarousel() {
    const { topAssets } = useContext(GlobalContext);
    const carousel = useRef() as MutableRefObject<HTMLDivElement>;

    const marqueeVariants = {
        animate: {
            x: [450, -1570],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                },
            },
        },
    };

    useEffect(() => {
        console.log(topAssets)
    }, [topAssets])

    if(topAssets === null) {
        return (
            <div className='flex flex-col items-center justify-center text-basecolor'>
                Loading..
            </div>
        )
    }

    return (
        <div ref={carousel} className="flex text-xs md:text-sm relative overflow-hidden w-full h-6">
            <motion.div 
                className="flex no-wrap whitespace-nowrap gap-x-6 absolute top-1  will-change-transform"
                variants={marqueeVariants}
                animate="animate"
            >
                { topAssets.data.slice(0,10).map((asset: any, i: number) => {
                    let price = Number(asset.priceUsd);
                    let change = Number(asset.changePercent24Hr)

                    return(
                        <li key={i} className='flex gap-x-2 '>
                            <span>{asset.symbol}</span>
                            <span>{price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                            <span className={`whitespace-nowrap ${change > 0 ? "text-tertiary-700" : "text-quartenary-700"}`}>{`${change.toFixed(2)} %`}</span>
                        </li>
                    )
                }) }
            </motion.div>
        </div>
    )
}