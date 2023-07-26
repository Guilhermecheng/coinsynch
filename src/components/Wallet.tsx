import * as Dialog from '@radix-ui/react-dialog';

import { GlobalContext } from "@/contexts/GlobalContext";
import { useContext, useState } from "react";
import { AddCrypto } from './AddCrypto';

export function Wallet() {
    const { setUserData, userData } = useContext(GlobalContext);
    const [addCryptoModal, setAddCryptoModal] = useState(false);

    if(!userData) {
        return (
            <div>
                No data found
            </div>
        )
    }

    return(
        <div 
            id="wallet"
            className=" text-basecolor flex flex-col items-center justify-center mx-6 sm:mx-14 lg:mx-16 py-6 sm:py-10 lg:py-14 border-t-2 border-secondary-300"
        >
            <div className="flex w-full justify-between items-center">
                <div className="flex gap-x-4 items-center">
                    <img src="/wallet.svg" alt="My Wallet" />
                    <h1 className="text-lg sm:text-2xl font-bold whitespace-nowrap">My Wallet</h1>
                </div>


                <Dialog.Root open={addCryptoModal} onOpenChange={setAddCryptoModal}>
                    <Dialog.Trigger asChild aria-controls="modal-addcrypto">
                        <button className="py-2 px-4 bg-primary-500 text-white flex rounded-full">+<span className="hidden sm:flex sm:ml-2">Add crypto</span></button>
                    </Dialog.Trigger>
                    <AddCrypto setModalState={setAddCryptoModal} />
                </Dialog.Root>
            </div>


            <ul id="mobile-wallet" className="grid grid-cols-2 sm:hidden">
                { userData.wallet.map((wallet_item, i) => {
                    return (
                        <li key={i}>
                            <h1>
                                {wallet_item.crypto}
                            </h1>

                            <div>
                                <h3>Holdings</h3>
                                <span>{ wallet_item.average_price }</span>
                                <span>{ wallet_item.quantity } BTC</span>
                            </div>

                            <div>
                                <h3>Change</h3>
                                <button>Trade</button>
                            </div>
                        </li>
                    )
                }) }
            </ul>

            <table id="desktop-wallet" className="hidden sm:flex sm:flex-col sm:w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Crypto</th>
                        <th>Holdings</th>
                        <th>Change</th>
                        <th>Trade</th>
                    </tr>
                </thead>

                <tbody>

                    { userData.wallet.map((wallet_item, i) => {
                        return (
                            <tr key={i + 1}>
                                <td>{i}</td>
                                <td>{wallet_item.crypto}</td>
                                <td>
                                    { wallet_item.average_price }
                                    <span>{ wallet_item.quantity } <span>{wallet_item.crypto}</span></span>
                                </td>
                                <td>+5.2%</td>
                                <td>trade symboel</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}