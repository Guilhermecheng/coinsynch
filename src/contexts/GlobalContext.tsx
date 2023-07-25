'use client';

import { SetStateAction } from "react";
import { createContext, Dispatch, ReactNode, useState } from "react";

interface GlobalContextProps {
    modalType: "signin"| "signup";
    setModalType: Dispatch<SetStateAction<"signin"| "signup">>;
    isVertMenuOpen: boolean;
    setIsVertMenuOpen: Dispatch<SetStateAction<boolean>>;

    userLogin: string;
    setUserLogin: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
    modalType: "signin",
    setModalType: () => {},
    
    isVertMenuOpen: false,
    setIsVertMenuOpen: () => {},

    userLogin: "",
    setUserLogin: () => {},
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modalType, setModalType] = useState<"signin"| "signup">("signin");
    const [isVertMenuOpen, setIsVertMenuOpen] = useState(false);

    const [userLogin, setUserLogin] = useState("");

    return (
        <GlobalContext.Provider value={{ 
            modalType,
            setModalType,

            isVertMenuOpen,
            setIsVertMenuOpen,

            userLogin, 
            setUserLogin,
         }}>
            {children}
        </GlobalContext.Provider>
    )
}