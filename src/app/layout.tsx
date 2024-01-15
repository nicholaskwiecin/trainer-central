import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './header'
import Footer from './footer'
import NavBar from './navBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen grid grid-rows-3 grid-cols-2 gr`} >
        <header className='col-span-2 bg-gradient-to-r from-cyan-500 to-blue-500'>
          <Header />
        </header>
        <nav className='row-span-2 col-span-1 bg-gradient-to-r from-purple-500 to-pink-500'>
          <NavBar />
        </nav>
        <main className='row-span-2 col-span-1 bg-gradient-to-r from-purple-500 to-pink-500'>
          {children}
        </main>
        <footer className='row-span-1 col-span-2 bg-gradient-to-r from-purple-500 to-pink-500'>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
