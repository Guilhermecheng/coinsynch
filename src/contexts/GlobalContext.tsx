'use client';

import { SetStateAction } from "react";
import { createContext, Dispatch, ReactNode, useState } from "react";

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
}

export const GlobalContext = createContext<GlobalContextProps>({
    modalType: "signin",
    setModalType: () => {},
    
    isVertMenuOpen: false,
    setIsVertMenuOpen: () => {},

    userData: null,
    setUserData: () => {},
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modalType, setModalType] = useState<"signin"| "signup">("signin");
    const [isVertMenuOpen, setIsVertMenuOpen] = useState(false);

    const [userData, setUserData] = useState<UserDataProps | null>(null);

    return (
        <GlobalContext.Provider value={{ 
            modalType,
            setModalType,

            isVertMenuOpen,
            setIsVertMenuOpen,

            userData, 
            setUserData,
         }}>
            {children}
        </GlobalContext.Provider>
    )
}