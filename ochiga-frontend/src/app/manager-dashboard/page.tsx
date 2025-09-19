// src/app/dashboard/manager/page.tsx
"use client";

import { useState } from "react";
import ProtectedRoute from "../../../components/ProtectedRoute";
import WalletCard from "../../components/WalletCard";
import UtilitiesCard from "../../components/UtilitiesCard";
import DeviceCards from "../../components/DeviceCards";
import VisitorsCard from "../../components/VisitorsCard";
import CommunityCard from "../../components/CommunityCard";

export default function ManagerDashboardPage() {
  const [modal, setModal] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({ open: false, title: "", message: "" });

  const showNotification = (title: string, message: string) => {
    setModal({ open: true, title, message });
  };

  return (
    <ProtectedRoute role="manager">
      <div className="min-h-screen overflow-x-hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        
        {/* ✅ Header */}
        <header className="w-full bg-white dark:bg-gray-800 shadow-md">
          <div className="px-4 md:px-8 flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold">Manager Dashboard</h1>
            <div>⚙️ Profile</div>
          </div>
        </header>

        {/* ✅ Main Grid */}
        <main className="px-0 sm:px-4 md:px-8 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Manager’s view could have analytics + estate-wide tools */}
          <div className="col-span-1 md:col-span-2">
            <WalletCard />
          </div>

          <UtilitiesCard />
          <DeviceCards />
          <VisitorsCard />
          <CommunityCard />
        </main>

        {/* ✅ Notification Modal */}
        {modal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg max-w-sm mx-4 shadow-xl">
              <h3 className="font-bold text-lg mb-2">{modal.title}</h3>
              <p className="mb-4">{modal.message}</p>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setModal({ ...modal, open: false })}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
