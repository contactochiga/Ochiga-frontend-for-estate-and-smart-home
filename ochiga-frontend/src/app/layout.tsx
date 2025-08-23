import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";  // using alias
import { GeistSans, GeistMono } from "geist/font";  // ✅ import fonts

// ✅ initialize fonts
const geistSans = GeistSans({ subsets: ["latin"] });
const geistMono = GeistMono({ subsets: ["latin"] });

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
      {/* ✅ apply Geist font to body */}
      <body className={`${geistSans.className} flex flex-col min-h-screen`}>
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
