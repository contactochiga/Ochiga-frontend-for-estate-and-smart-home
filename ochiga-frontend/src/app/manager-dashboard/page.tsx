"use client";
import { useState } from "react";
import { ClipboardDocumentIcon, ChatBubbleOvalLeftEllipsisIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function ManagerDashboard() {
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
          <UserCircleIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20 px-4">
        {/* Estate Identity Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Good afternoon, Manager
          </p>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Greenfield Estate
          </h2>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
              123 Palm Street, Lagos
            </p>
            <button
              className="ml-2 p-1 text-gray-500 hover:text-green-600"
              onClick={() => navigator.clipboard.writeText("123 Palm Street, Lagos")}
            >
              <ClipboardDocumentIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        {activeTab === "dashboard" && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="text-base font-semibold">Payments Overview</h3>
              <p className="text-sm text-gray-500">Summary of estate payments...</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="text-base font-semibold">Requests</h3>
              <p className="text-sm text-gray-500">Pending service requests...</p>
            </div>
          </div>
        )}

        {activeTab === "payments" && <div className="p-4">💳 Payment Management</div>}
        {activeTab === "requests" && <div className="p-4">📋 Service Requests</div>}
        {activeTab === "residents" && <div className="p-4">👥 Residents List</div>}
      </main>

      {/* Footer (Mobile Nav) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t shadow flex justify-around text-sm">
        <button
          className={`p-3 flex-1 ${activeTab === "dashboard" ? "text-green-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`p-3 flex-1 ${activeTab === "payments" ? "text-green-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
          onClick={() => setActiveTab("payments")}
        >
          Payments
        </button>
        <button
          className={`p-3 flex-1 ${activeTab === "requests" ? "text-green-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
        </button>
        <button
          className={`p-3 flex-1 ${activeTab === "residents" ? "text-green-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
          onClick={() => setActiveTab("residents")}
        >
          Residents
        </button>
      </nav>
    </div>
  );
}
