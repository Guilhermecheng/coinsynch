'use client';
import { useContext, useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { Header } from "@/components/Header";
import { LogInModal } from "@/components/LogInModal";
import { GlobalContext } from '@/contexts/GlobalContext';
import { Footer } from '@/components/Footer';
import { Carousel } from '@/components/Carousel';
import { Solutions } from '@/components/Solutions';
import { TopCryptos } from '@/components/TopCryptos';
import { Newsletter } from '@/components/Newsletter';
import axios from 'axios';
import { cryptoList } from '@/lib/utils';

export default function Home() {
  const { setModalType, topCryptos, topAssets, setTopAssets } = useContext(GlobalContext);

    useEffect(() => {
      async function getTopAssets() {
        const response = await axios.get(`https://api.coincap.io/v2/assets`);
        console.log(response)
        setTopAssets(response.data);
      }
      getTopAssets();
    }, []);

  return (
    <main className="flex w-full flex-col items-center">
      <Dialog.Root>
        <Header />

        <Carousel />
        <Solutions />


        <LogInModal />
      </Dialog.Root>

      <TopCryptos />
      <Newsletter />
      <Footer />
    </main>
  )
}
