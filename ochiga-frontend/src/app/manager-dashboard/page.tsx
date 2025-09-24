"use client";
import { useState } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col">
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
            <p className="text-sm text-gray-500">
              Summary of estate payments...
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-base font-semibold">Requests</h3>
            <p className="text-sm text-gray-500">
              Pending service requests...
            </p>
          </div>
        </div>
      )}

      {activeTab === "payments" && (
        <div className="p-4">💳 Payment Management</div>
      )}
      {activeTab === "requests" && (
        <div className="p-4">📋 Service Requests</div>
      )}
      {activeTab === "residents" && (
        <div className="p-4">👥 Residents List</div>
      )}
    </div>
  );
}
