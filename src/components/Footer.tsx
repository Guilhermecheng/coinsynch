"use client";

import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    return (
        <div className="flex w-full items-center justify-center bg-white">
            <div className={`flex w-full items-center ${pathname === "/" ? "justify-between" : "justify-center shadow-[0_-4px_8px_0_rgba(77, 77, 77, 0.10)]"} max-w-[1264px] px-12 h-14 md:h-16 text-basecolor text-sm`}>
                <span>Copyright © 2022 -  All rights reserved</span>

                <span className={pathname === "/" ? "flex" : "hidden"}>
                    <img src="/coinsynch.png" className="h-4" alt="CoinSynch Logo" />
                </span>
            </div>
        </div>
    )
}