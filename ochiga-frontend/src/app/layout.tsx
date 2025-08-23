import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";  // ✅ import Inter font

// ✅ initialize Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ochiga",
  description: "Smart estate & home management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ✅ apply Inter font to body */}
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
