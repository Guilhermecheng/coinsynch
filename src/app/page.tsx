'use client';
import dynamic from 'next/dynamic';
import { useContext } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { GlobalContext } from '@/contexts/GlobalContext';

export default function Home() {
  const { setModalType } = useContext(GlobalContext);

  return (
    <main className="flex w-full flex-col items-center justify-between">
      <Dialog.Root>
        <Header />
        Home
        <Modal />
      </Dialog.Root>
    </main>
  )
}
