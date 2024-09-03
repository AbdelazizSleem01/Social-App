import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dragon App',
  description: 'Social media app built with Next.js',
  
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <div className='w-full bg-white px-4 md:px-8 lg:px-16 xl:px32 2xl:64px'>
            <Navbar />
          </div>
          <div className=' bg-slate-200 px-4 md:px-8 lg:px-16 xl:px32 2xl:64px'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
