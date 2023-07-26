'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { GlobalContext } from '@/contexts/GlobalContext';

export function Solutions() {
    const { setModalType, isVertMenuOpen, setIsVertMenuOpen, setUserData, userData } = useContext(GlobalContext);

    return (
        <div>
            <div id="solutions-title" className="">
                <h1>Lorem Ipsum</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                     It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>

                <Dialog.Trigger asChild aria-controls="modal-content" id="header-signup" onClick={() => setModalType("signup")}>
                    <span className="px-4 py-2 rounded-full bg-primary-500 text-white cursor-pointer">Sign Up</span>
                </Dialog.Trigger>
            </div>

            <div id="cards" className="">
                <div id="card-1"></div>
                <div id="card-2"></div>
                <div id="card-3"></div>
                <div id="card-4"></div>
            </div>
        </div>
    )
}