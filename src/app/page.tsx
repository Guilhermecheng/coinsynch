'use client';
import { useContext } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { Header } from "@/components/Header";
import { LogInModal } from "@/components/LogInModal";
import { GlobalContext } from '@/contexts/GlobalContext';
import { Footer } from '@/components/Footer';
import { Carousel } from '@/components/Carousel';
import { Solutions } from '@/components/Solutions';

export default function Home() {
  const { setModalType } = useContext(GlobalContext);

  return (
    <main className="flex w-full flex-col items-center">
      <Dialog.Root>
        <Header />

        <Carousel />
        <Solutions />


        <LogInModal />
      </Dialog.Root>

      <Footer />
    </main>
  )
}
