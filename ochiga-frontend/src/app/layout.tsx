// ochiga-frontend/src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Ochiga Smart Estate",
  description: "Smart Estate Dashboard by Ochiga",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen relative z-0">
        <TopBar />
        <main className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
  {children}
</main>
        <Footer />
      </body>
    </html>
  );
}
