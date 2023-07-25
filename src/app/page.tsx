'use client';
import dynamic from 'next/dynamic';
import { useContext } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { Header } from "@/components/Header";
import { LogInModal } from "@/components/LogInModal";
import { GlobalContext } from '@/contexts/GlobalContext';
import { Footer } from '@/components/Footer';

export default function Home() {
  const { setModalType } = useContext(GlobalContext);

  return (
    <main className="flex w-full flex-col items-center justify-between">
      <Dialog.Root>
        <Header />
        Home
        <LogInModal />
      </Dialog.Root>

      <Footer />
    </main>
  )
}
