"use client";

import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Link from "next/link";

export default function ManagerDashboardPage() {
  const [activeTab, setActiveTab] = useState("payments");

  const renderContent = () => {
    switch (activeTab) {
      case "payments":
        return <div className="p-4">💳 Payment Management</div>;
      case "access":
        return <div className="p-4">🔑 Access Control</div>;
      case "requests":
        return <div className="p-4">📋 Service Requests</div>;
      case "residents":
        return (
          <div className="p-4 space-y-4">
            👥 Residents List
            <div>
              <Link
                href="/manager-dashboard/register-resident"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                ➕ Register New Resident
              </Link>
            </div>
          </div>
        );
      default:
        return <div className="p-4">Select a tab</div>;
    }
  };

  return (
    <ProtectedRoute role="manager">
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Top Bar */}
        <header className="bg-green-600 text-white p-4 text-lg font-bold shadow flex justify-between items-center">
          <span>Manager Dashboard</span>
          <span className="text-sm font-normal">Welcome, Manager</span>
        </header>

        {/* Main Content */}
        <main className="flex-1">{renderContent()}</main>

        {/* Bottom Nav (Mobile) */}
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow flex justify-around text-sm">
          <button
            className={`p-3 flex-1 ${
              activeTab === "payments"
                ? "text-green-600 font-bold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("payments")}
          >
            Payments
          </button>
          <button
            className={`p-3 flex-1 ${
              activeTab === "access"
                ? "text-green-600 font-bold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("access")}
          >
            Access
          </button>
          <button
            className={`p-3 flex-1 ${
              activeTab === "requests"
                ? "text-green-600 font-bold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            Requests
          </button>
          <button
            className={`p-3 flex-1 ${
              activeTab === "residents"
                ? "text-green-600 font-bold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("residents")}
          >
            Residents
          </button>
        </nav>
      </div>
    </ProtectedRoute>
  );
}
