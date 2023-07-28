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
  const { setModalType, topCryptos, setTopCryptos } = useContext(GlobalContext);

    useEffect(() => {
      async function fetchExchangeRates() {
        try {
          const assets = ['BTC', 'ETH', 'XRP'];
          const promises = cryptoList.map(asset =>
            axios.get(`https://rest.coinapi.io/v1/exchangerate/${asset.crypto}/USD?apikey=${process.env.COINAPI_KEY}`)
          );
          const responses = await Promise.all(promises);
          
          cryptoList.forEach((crypto,i) => {
            crypto.price = responses[i].data.rate
          })
          setTopCryptos(cryptoList);

        } catch (err) {
          console.log(err);
        }
      }
      fetchExchangeRates();
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
