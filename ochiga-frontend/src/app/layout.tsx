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
      <body className="flex flex-col min-h-screen">
        {/* Top header bar */}
        <TopBar />

        {/* Main content with bottom padding so it doesn’t get hidden by footer */}
        <main className="flex-1 pb-16">{children}</main>

        {/* Fixed footer nav */}
        <Footer />
      </body>
    </html>
  );
}
