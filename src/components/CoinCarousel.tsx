'use client'

import { GlobalContext } from "@/contexts/GlobalContext";
import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";


export function CoinCarousel() {
  const { topCryptos } = useContext(GlobalContext);
  const [width, setWidth] = useState(0);
    const carousel = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        setWidth(carousel?.current.scrollWidth - carousel?.current.offsetWidth);
    }, [])

    return (
        <div ref={carousel} className="flex text-xs md:text-sm max-w-[344px] overflow-hidden">
            <ul className="flex no-wrap gap-x-6 overflow-hidden">

                { topCryptos.map((crypto, i) => {
                    let change = (Math.random() * 2 - 1) * 10;

                    return(
                        <li key={i} className='flex gap-x-2 '>
                            <span>{crypto.crypto}</span>
                            <span>{crypto.price.toLocaleString("en-IN", { style: "currency", currency: "USD" })}</span>
                            <span className={`${change > 0 ? "text-tertiary-700" : "text-quartenary-700"}`}>{`${change.toFixed(2)} %`}</span>
                        </li>
                    )
                }) }

            </ul>
        </div>
    )
}