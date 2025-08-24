import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ochiga App',
  description: 'Smart Home & Estate Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
