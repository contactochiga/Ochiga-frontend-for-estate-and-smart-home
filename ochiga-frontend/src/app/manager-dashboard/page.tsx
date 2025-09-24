"use client";

import {
  UsersIcon,
  CurrencyDollarIcon,   // ✅ valid alternative
  WrenchScrewdriverIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

export default function ManagerDashboard() {
  const [stats] = useState({
    residents: 126,
    outstanding: 2340000,
    requests: 8,
    announcements: 3,
  });

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue (₦)",
        data: [1200000, 1800000, 2000000, 1500000, 2200000],
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.2)",
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Snapshot Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center space-x-3">
          <UsersIcon className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Residents</p>
            <p className="text-xl font-bold">{stats.residents}</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center space-x-3">
          <CurrencyNairaIcon className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Outstanding</p>
            <p className="text-xl font-bold">₦{stats.outstanding.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center space-x-3">
          <WrenchScrewdriverIcon className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Requests</p>
            <p className="text-xl font-bold">{stats.requests}</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center space-x-3">
          <MegaphoneIcon className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Announcements</p>
            <p className="text-xl font-bold">{stats.announcements}</p>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
        <Line data={revenueData} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button className="p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
          Create Announcement
        </button>
        <button className="p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
          Record Payment
        </button>
        <button className="p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
          Assign Maintenance
        </button>
      </div>
    </div>
  );
}
