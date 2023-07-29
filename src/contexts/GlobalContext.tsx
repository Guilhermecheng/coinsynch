'use client';

import { SetStateAction } from "react";
import { createContext, Dispatch, ReactNode, useState } from "react";

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

export interface UserDataProps {
    name: string;
    email: string ;
    avatar_img: string;
    wallet: {
        crypto: string;
        average_price: number;
        quantity: number;
    }[];
    total: number;
}

export interface WalletProps {
    crypto: string;
    assetName: string;
    average_price: number;
    updatedPrice: number;
    quantity: number;
    logo: string;
}

interface GlobalContextProps {
    modalType: "signin"| "signup";
    setModalType: Dispatch<SetStateAction<"signin"| "signup">>;
    isVertMenuOpen: boolean;
    setIsVertMenuOpen: Dispatch<SetStateAction<boolean>>;

    userData: UserDataProps | null;
    setUserData: Dispatch<SetStateAction<UserDataProps | null>>;

    topAssets: TopCoinsProps | null;
    setTopAssets: Dispatch<SetStateAction<TopCoinsProps | null>>;

    walletUpdated: WalletProps[],
    setWalletUpdated: Dispatch<SetStateAction<WalletProps[]>>,

    totalBalance: number;
    setTotalBalance: Dispatch<SetStateAction<number>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
    modalType: "signin",
    setModalType: () => {},
    
    isVertMenuOpen: false,
    setIsVertMenuOpen: () => {},

    userData: null,
    setUserData: () => {},

    topAssets: null,
    setTopAssets: () => {},

    walletUpdated: [],
    setWalletUpdated: () => {},

    totalBalance: 0,
    setTotalBalance: () => {},
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modalType, setModalType] = useState<"signin"| "signup">("signin");
    const [isVertMenuOpen, setIsVertMenuOpen] = useState(false);

    const [userData, setUserData] = useState<UserDataProps | null>(null);
    const [topAssets, setTopAssets] = useState<TopCoinsProps | null>(null);
    const [walletUpdated, setWalletUpdated] = useState<WalletProps[]>([]);
    const [totalBalance, setTotalBalance] = useState<number>(0);

    return (
        <GlobalContext.Provider value={{ 
            modalType,
            setModalType,

            isVertMenuOpen,
            setIsVertMenuOpen,

            userData, 
            setUserData,

            topAssets, 
            setTopAssets,

            walletUpdated, 
            setWalletUpdated,

            totalBalance, 
            setTotalBalance
         }}>
            {children}
        </GlobalContext.Provider>
    )
}