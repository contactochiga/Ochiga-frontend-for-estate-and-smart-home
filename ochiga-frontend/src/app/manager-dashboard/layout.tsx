// src/app/manager-dashboard/layout.tsx
"use client";

import ManagerHeader from "../components/ManagerHeader";
import ManagerFooter from "../components/ManagerFooter";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-800">
      {/* Header */}
      <ManagerHeader />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      {/* Footer */}
      <ManagerFooter />
    </div>
  );
}
