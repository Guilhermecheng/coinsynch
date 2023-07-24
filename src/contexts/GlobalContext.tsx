'use client';

import { SetStateAction } from "react";
import { createContext, Dispatch, ReactNode, useState } from "react";

interface GlobalContextProps {
    modalType: "signin"| "signup";
    setModalType: Dispatch<SetStateAction<"signin"| "signup">>;
}

export const GlobalContext = createContext<GlobalContextProps>({
    modalType: "signin",
    setModalType: () => {},
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modalType, setModalType] = useState<"signin"| "signup">("signin");

    return (
        <GlobalContext.Provider value={{ 
            modalType,
            setModalType,
         }}>
            {children}
        </GlobalContext.Provider>
    )
}