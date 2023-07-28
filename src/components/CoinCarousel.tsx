'use client'

import { GlobalContext } from "@/contexts/GlobalContext";
import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";


export function CoinCarousel() {
  const { topAssets } = useContext(GlobalContext);
  const [width, setWidth] = useState(0);
    const carousel = useRef() as MutableRefObject<HTMLDivElement>;

    // useEffect(() => {
    //     setWidth(carousel?.current.scrollWidth - carousel?.current.offsetWidth);
    // }, [])

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
        <div ref={carousel} className="flex text-xs md:text-sm max-w-[344px] overflow-hidden">
            <ul className="flex no-wrap gap-x-6 overflow-hidden">

                { topAssets.data.map((asset: any, i: number) => {
                    let price = Number(asset.priceUsd);
                    let change = Number(asset.changePercent24Hr)

                    return(
                        <li key={i} className='flex gap-x-2 '>
                            <span>{asset.symbol}</span>
                            <span>{price.toLocaleString("en-IN", { style: "currency", currency: "USD" })}</span>
                            <span className={`whitespace-nowrap ${change > 0 ? "text-tertiary-700" : "text-quartenary-700"}`}>{`${change.toFixed(2)} %`}</span>
                        </li>
                    )
                }) }

            </ul>
        </div>
    )
}