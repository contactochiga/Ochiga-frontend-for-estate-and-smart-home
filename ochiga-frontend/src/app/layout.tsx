// src/app/layout.tsx
import "./globals.css";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochiga",
  description: "Live Smart. Live Ochiga.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen flex flex-col">
        {/* Top header bar */}
        <TopBar />

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer nav */}
        <Footer />
      </body>
    </html>
  );
}
