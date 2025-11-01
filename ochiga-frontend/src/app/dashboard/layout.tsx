// src/app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import { DashboardProvider } from "../context/DashboardContext";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProvider>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
        <Footer />
      </div>
    </DashboardProvider>
  );
}
