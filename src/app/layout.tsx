import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextTopLoader
          color='#212020'
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing='ease'
          speed={200}
          shadow='0 0 10px #2299DD,0 0 5px #2299DD'
        />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
