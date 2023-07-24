import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { GlobalContextProvider } from '@/contexts/GlobalContext'

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ["400", "700"],
  style: ['italic', 'normal']
 })

export const metadata: Metadata = {
  title: 'Coinsynch',
  description: 'Um app para gerenciamento da sua carteira crypto',
  icons: {
    icon: '/coinsynch-icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  )
}
