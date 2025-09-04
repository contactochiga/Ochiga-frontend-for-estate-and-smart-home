// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../data/authContext";

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
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
