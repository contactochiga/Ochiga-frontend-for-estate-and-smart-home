"use client";

import { useState } from "react";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  GlobeAltIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-lg font-bold text-green-600 dark:text-green-400">
          Ochiga
        </h1>
        <div className="flex items-center space-x-4">
          <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <UserCircleIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20 px-4">{children}</main>

      {/* Footer (Mobile Nav - Ochiga Manager Style) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t shadow flex justify-around text-xs">
        <button
          className={`flex flex-col items-center p-2 ${
            activeTab === "dashboard"
              ? "text-green-600 font-bold"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <HomeIcon className="w-5 h-5 mb-1" />
          Dashboard
        </button>

        <button
          className={`flex flex-col items-center p-2 ${
            activeTab === "residents"
              ? "text-green-600 font-bold"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("residents")}
        >
          <UserGroupIcon className="w-5 h-5 mb-1" />
          Residents
        </button>

        <button
          className={`flex flex-col items-center p-2 ${
            activeTab === "requests"
              ? "text-green-600 font-bold"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          <ClipboardDocumentListIcon className="w-5 h-5 mb-1" />
          Requests
        </button>

        <button
          className={`flex flex-col items-center p-2 ${
            activeTab === "finance"
              ? "text-green-600 font-bold"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("finance")}
        >
          <CreditCardIcon className="w-5 h-5 mb-1" />
          Finance
        </button>

        <button
          className={`flex flex-col items-center p-2 ${
            activeTab === "community"
              ? "text-green-600 font-bold"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("community")}
        >
          <GlobeAltIcon className="w-5 h-5 mb-1" />
          Community
        </button>
      </nav>
    </div>
  );
}
