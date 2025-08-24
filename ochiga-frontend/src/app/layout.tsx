// src/app/layout.tsx
import './globals.css'
import Header from './components/Header'
import NavBar from './components/NavBar'
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
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
        {/* 🔝 Sticky Header + Navbar */}
        <header className="fixed top-0 left-0 w-full z-50">
          <Header />
          <NavBar />
        </header>

        {/* 🔄 Page content (add padding so it doesn’t hide behind header/footer) */}
        <main className="flex-1 pt-24 pb-20">{children}</main>

        {/* 🔻 Fixed Footer Dock */}
        <Footer />
      </body>
    </html>
  )
}
