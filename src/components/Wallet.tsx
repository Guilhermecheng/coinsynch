import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';

import { GlobalContext } from "@/contexts/GlobalContext";
import { useContext, useState } from "react";
import { AddCrypto } from './AddCrypto';
import { TransferCrypto } from './TransferCrypto';

export function Wallet() {
    const { setUserData, userData } = useContext(GlobalContext);

    const [addCryptoModal, setAddCryptoModal] = useState(false);
    const [transferCryptoModal, setTransferCryptoModal] = useState(false);

    const [selectedTransferCrypto, setSelectedTransferCrypto] = useState({
        crypto: "",
        average_price: 0,
        quantity: 0,
    });

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

            <Dialog.Root open={transferCryptoModal} onOpenChange={setTransferCryptoModal}>

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

                                <Dialog.Trigger asChild aria-controls="modal-transfercrypto">
                                    <button>Trade</button>
                                </Dialog.Trigger>

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

                                    <Dialog.Trigger aria-controls="modal-transfercrypto" onClick={() => setSelectedTransferCrypto(wallet_item)}>
                                        <Tooltip.Provider>
                                            <Tooltip.Root>
                                                <Tooltip.Trigger asChild>
                                                    <td>
                                                        <img src="/exchange.svg" alt={`Trade ${wallet_item.crypto}`} />
                                                    </td>
                                                </Tooltip.Trigger>
                                                <Tooltip.Portal>
                                                    <Tooltip.Content className="bg-primary-500 px-4 py-2 rounded-md text-xs text-white" sideOffset={5}>
                                                        Trade {wallet_item.crypto}
                                                        <Tooltip.Arrow className="fill-primary-500" />
                                                    </Tooltip.Content>
                                                </Tooltip.Portal>
                                            </Tooltip.Root>
                                        </Tooltip.Provider>
                                        
                                    </Dialog.Trigger>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <TransferCrypto setModalState={setTransferCryptoModal} selectedCrypto={selectedTransferCrypto} />
            </Dialog.Root>
        </div>
    )
}