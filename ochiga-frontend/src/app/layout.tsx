// src/app/layout.tsx
import './globals.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ochiga',
  description: 'Live Smart. Live Ochiga.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Header at the top */}
        <Header />

        {/* Navbar (below header, if needed) */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer at the bottom */}
        <Footer />
      </body>
    </html>
  )
}
