// src/app/manager-dashboard/page.js
"use client";
import { useState } from "react";

export default function ManagerDashboard() {
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
        return <div className="p-4">👥 Residents List</div>;
      default:
        return <div className="p-4">Select a tab</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="bg-green-600 text-white p-4 text-lg font-bold shadow">
        Manager Dashboard
      </header>

      {/* Main Content */}
      <main className="flex-1">{renderContent()}</main>

      {/* Bottom Nav (Mobile) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow flex justify-around text-sm">
        <button
          className={`p-3 flex-1 ${activeTab === "payments" ? "text-green-600 font-bold" : "text-gray-600"}`}
          onClick={() => setActiveTab("payments")}
        >
          Payments
        </button>
        <button
          className={`p-3 flex-1 ${activeTab === "access" ? "text-green-600 font-bold" : "text-gray-600"}`}
          onClick={() => setActiveTab("access")}
        >
          Access
        </button>
        <button
          className={`p-3 flex-1 ${activeTab === "requests" ? "text-green-600 font-bold" : "text-gray-600"}`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
        </button>
        <button
          className={`p-3 flex-1 ${activeTab === "residents" ? "text-green-600 font-bold" : "text-gray-600"}`}
          onClick={() => setActiveTab("residents")}
        >
          Residents
        </button>
      </nav>
    </div>
  );
}
