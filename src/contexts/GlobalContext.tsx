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
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modalType, setModalType] = useState<"signin"| "signup">("signin");
    const [isVertMenuOpen, setIsVertMenuOpen] = useState(false);

    const [userData, setUserData] = useState<UserDataProps | null>(null);
    const [topAssets, setTopAssets] = useState<TopCoinsProps | null>(null);
    const [walletUpdated, setWalletUpdated] = useState<WalletProps[]>([]);

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
            setWalletUpdated
         }}>
            {children}
        </GlobalContext.Provider>
    )
}