'use client';

import { SetStateAction } from "react";
import { createContext, Dispatch, ReactNode, useState } from "react";

interface CoinProps {
    crypto: string;
    name: string;
    logo: string;
    price: number;
}

interface TopCoinsProps {
    data: {
        id: string;
        rank: string;
        symbol: string;
        name: string;
        supply: string;
        maxSupply: string;
        marketCapUsd: string;
        volumeUsd24Hr: string;
        priceUsd: string;
        changePercent24Hr: string;
        vwap24Hr: string;
        explorer: string;
    }[]
}

interface UserDataProps {
    name: string;
    email: string ;
    avatar_img: string;
    wallet: {
        crypto: string;
        average_price: number;
        quantity: number;
    }[];
}

interface GlobalContextProps {
    modalType: "signin"| "signup";
    setModalType: Dispatch<SetStateAction<"signin"| "signup">>;
    isVertMenuOpen: boolean;
    setIsVertMenuOpen: Dispatch<SetStateAction<boolean>>;

    userData: UserDataProps | null;
    setUserData: Dispatch<SetStateAction<UserDataProps | null>>;

    topCryptos: CoinProps[];
    setTopCryptos: Dispatch<SetStateAction<CoinProps[]>>;

    topAssets: TopCoinsProps | null;
    setTopAssets: Dispatch<SetStateAction<TopCoinsProps | null>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
    modalType: "signin",
    setModalType: () => {},
    
    isVertMenuOpen: false,
    setIsVertMenuOpen: () => {},

    userData: null,
    setUserData: () => {},

    topCryptos:  [],
    setTopCryptos: () => {},

    topAssets: null,
    setTopAssets: () => {},
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modalType, setModalType] = useState<"signin"| "signup">("signin");
    const [isVertMenuOpen, setIsVertMenuOpen] = useState(false);

    const [userData, setUserData] = useState<UserDataProps | null>(null);
    const [topCryptos, setTopCryptos] = useState<CoinProps[]>([]);
    const [topAssets, setTopAssets] = useState<TopCoinsProps | null>(null);


    return (
        <GlobalContext.Provider value={{ 
            modalType,
            setModalType,

            isVertMenuOpen,
            setIsVertMenuOpen,

            userData, 
            setUserData,

            topCryptos,
            setTopCryptos,

            topAssets, 
            setTopAssets
         }}>
            {children}
        </GlobalContext.Provider>
    )
}