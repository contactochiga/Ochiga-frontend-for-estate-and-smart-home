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
      {/* 👇 this makes sure the footer can "float" properly */}
      <body className="relative min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Navbar */}
        <NavBar />

        {/* Main content grows */}
        <main className="flex-1">{children}</main>

        {/* Floating footer */}
        <Footer />
      </body>
    </html>
  )
}
