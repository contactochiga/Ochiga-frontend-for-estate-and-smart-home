// src/app/manager-dashboard/page.js

"use client";
import { useState } from "react";

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState("payments");

  return (
    <main className="flex flex-col h-screen bg-gray-100">
      {/* 🔹 Top Bar */}
      <header className="flex items-center justify-between bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-lg font-bold">Ochiga Manager</h1>
        <span className="text-sm">Smart Estate</span>
      </header>

      {/* 🔹 Main Content with Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar (collapsible for mobile later) */}
        <aside className="w-40 bg-white border-r shadow-sm p-3 hidden sm:block">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => setActiveTab("payments")}
              className={`p-2 rounded ${
                activeTab === "payments" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              Payments
            </button>
            <button
              onClick={() => setActiveTab("access")}
              className={`p-2 rounded ${
                activeTab === "access" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              Access Control
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`p-2 rounded ${
                activeTab === "requests" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              Service Requests
            </button>
            <button
              onClick={() => setActiveTab("residents")}
              className={`p-2 rounded ${
                activeTab === "residents" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              Residents
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <section className="flex-1 p-4">
          {activeTab === "payments" && <div>💳 Payments Dashboard</div>}
          {activeTab === "access" && <div>🔑 Access Control Panel</div>}
          {activeTab === "requests" && <div>📨 Service Requests</div>}
          {activeTab === "residents" && <div>👥 Residents Directory</div>}
        </section>
      </div>

      {/* 🔹 Footer Bar (Mobile Quick Nav) */}
      <footer className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around p-2">
        <button onClick={() => setActiveTab("payments")} className={activeTab === "payments" ? "text-blue-600 font-bold" : ""}>💳</button>
        <button onClick={() => setActiveTab("access")} className={activeTab === "access" ? "text-blue-600 font-bold" : ""}>🔑</button>
        <button onClick={() => setActiveTab("requests")} className={activeTab === "requests" ? "text-blue-600 font-bold" : ""}>📨</button>
        <button onClick={() => setActiveTab("residents")} className={activeTab === "residents" ? "text-blue-600 font-bold" : ""}>👥</button>
      </footer>
    </main>
  );
}
