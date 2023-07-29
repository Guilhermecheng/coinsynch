'use client'

import { GlobalContext } from "@/contexts/GlobalContext";
import { useContext, useEffect } from "react";

export function Balance() {
    const { walletUpdated, totalBalance, setTotalBalance } = useContext(GlobalContext);

    useEffect(() => {
        let newBalance = 0;
        if(walletUpdated) {
            walletUpdated.forEach(item => {
                newBalance += item.quantity * item.updatedPrice
            })
        }
        setTotalBalance(newBalance);
    }, [walletUpdated])

    return (
        <h1 className="font-bold text-base sm:text-xl lg:text-2xl">
            {totalBalance.toLocaleString("en-US", { style: "currency", currency: "USD" })}
        </h1>
    )
}