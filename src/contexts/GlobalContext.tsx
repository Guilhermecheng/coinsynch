'use client';

import { SetStateAction } from "react";
import { createContext, Dispatch, ReactNode, useState } from "react";

interface CoinProps {
    crypto: string;
    name: string;
    logo: string;
    price: number;
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
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modalType, setModalType] = useState<"signin"| "signup">("signin");
    const [isVertMenuOpen, setIsVertMenuOpen] = useState(false);

    const [userData, setUserData] = useState<UserDataProps | null>(null);
    const [topCryptos, setTopCryptos] = useState<CoinProps[]>([]);

    return (
        <GlobalContext.Provider value={{ 
            modalType,
            setModalType,

            isVertMenuOpen,
            setIsVertMenuOpen,

            userData, 
            setUserData,

            topCryptos,
            setTopCryptos
         }}>
            {children}
        </GlobalContext.Provider>
    )
}