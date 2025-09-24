"use client";

import ManagerHeader from "../components/ManagerHeader";
import ManagerFooter from "../components/ManagerFooter";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <ManagerHeader />

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-20 px-4">{children}</main>

      {/* Footer */}
      <ManagerFooter />
    </div>
  );
}
