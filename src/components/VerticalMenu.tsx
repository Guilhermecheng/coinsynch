'use client';

import { GlobalContext } from "@/contexts/GlobalContext";
import { useContext } from "react";

export function VerticalMenu() {
    const { isVertMenuOpen, setIsVertMenuOpen } = useContext(GlobalContext);

    return (
        <div 
            id="vertical-menu" 
            className={`absolute h-full sm:h-[calc(100%-116px)] md:h-[calc(100%-128px)] ${isVertMenuOpen ? "w-[240px]" : "w-0 md:w-[86px]"} z-20 transition-all items-center justify-center bg-white border-t-2 border-b-2 border-secondary-300`}
            onMouseOver={() => setIsVertMenuOpen(true)}
            onMouseOut={() => setIsVertMenuOpen(false)}
        >
                    
            <ul className="flex flex-col items-center justify-center py-12 gap-y-8 text-basecolor text-sm">
                <li className="flex items-center justify-center cursor-pointer">
                    <img src="/wallet.svg" alt="Lorem Ipsum" />
                    <span className={`${isVertMenuOpen ? "flex" : "hidden"} ml-2`}>Lorem Ipsum</span>
                </li>
                <li className="flex items-center justify-center cursor-pointer">
                    <img src="/trade.svg" alt="Lorem Ipsum" />
                    <span className={`${isVertMenuOpen ? "flex" : "hidden"} ml-2`}>Lorem Ipsum</span>
                </li>
                <li className="flex items-center justify-center cursor-pointer">
                    <img src="/coins.svg" alt="Lorem Ipsum" />
                    <span className={`${isVertMenuOpen ? "flex" : "hidden"} ml-2`}>Lorem Ipsum</span>
                </li>
                <li className="flex items-center justify-center cursor-pointer">
                    <img src="/charts.svg" alt="Lorem Ipsum" />
                    <span className={`${isVertMenuOpen ? "flex" : "hidden"} ml-2`}>Lorem Ipsum</span>
                </li>
            </ul>

            <span className={`${isVertMenuOpen ? "flex md:hidden" : "hidden"} flex-col items-center justify-center`} onClick={() => setIsVertMenuOpen(!isVertMenuOpen)}>
                <img src="/backbutton.svg" alt="Close menu" />
            </span>
        </div>
    )
}