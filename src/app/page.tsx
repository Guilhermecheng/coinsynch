'use client';
import { useContext, useEffect } from 'react';

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

export default function Home() {
  const { setTopAssets } = useContext(GlobalContext);

    useEffect(() => {
      async function getTopAssets() {
        const response = await axios.get(`https://api.coincap.io/v2/assets`);
        setTopAssets(response.data);
      }
      getTopAssets();

      // Fetch exchange rates every 5 seconds
      const intervalId = setInterval(getTopAssets, 5000);
      return () => clearInterval(intervalId);
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
