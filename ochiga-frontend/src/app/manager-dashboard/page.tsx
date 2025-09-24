"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  UsersIcon,
  WrenchScrewdriverIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import { CurrencyNairaIcon } from "@/components/icons/CurrencyNairaIcon"; // custom icon

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ManagerDashboard() {
  const [stats] = useState({
    residents: 120,
    outstanding: 450000,
    requests: 8,
    announcements: 3,
  });

  const [requests, setRequests] = useState([
    { id: 1, title: "Leaky pipe", location: "Block B", priority: "High", date: "2025-09-20", resolved: false },
    { id: 2, title: "Broken light", location: "Block A", priority: "Medium", date: "2025-09-19", resolved: false },
    { id: 3, title: "Gate remote not working", location: "Main Gate", priority: "Low", date: "2025-09-18", resolved: false },
    { id: 4, title: "Water outage", location: "Block D", priority: "Critical", date: "2025-09-17", resolved: false },
  ]);

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (₦)",
        data: [300000, 500000, 400000, 600000, 550000, 700000],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const handleResolve = (id: number) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, resolved: true, priority: "Resolved" } : req
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Snapshot Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center space-x-3">
          <UsersIcon className="w-8 h-8 text-blue-600" />
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
          <WrenchScrewdriverIcon className="w-8 h-8 text-yellow-600" />
          <div>
            <p className="text-sm text-gray-500">Requests</p>
            <p className="text-xl font-bold">{stats.requests}</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center space-x-3">
          <MegaphoneIcon className="w-8 h-8 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Announcements</p>
            <p className="text-xl font-bold">{stats.announcements}</p>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
        <Line data={revenueData} />
      </div>

      {/* Maintenance Requests Feed */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Maintenance Requests</h2>
        <ul className="space-y-3 max-h-64 overflow-y-auto">
          {requests.map((req) => (
            <li
              key={req.id}
              className="p-4 border rounded-lg flex justify-between items-center dark:border-gray-700"
            >
              <div>
                <p className="font-medium">{req.title}</p>
                <p className="text-sm text-gray-500">{req.location}</p>
                <p className="text-xs text-gray-400">{req.date}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    req.resolved
                      ? "bg-green-600 text-white"
                      : req.priority === "Critical"
                      ? "bg-red-700 text-white"
                      : req.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : req.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {req.priority}
                </span>
                <button
                  onClick={() => handleResolve(req.id)}
                  disabled={req.resolved}
                  className={`px-3 py-1 text-xs rounded ${
                    req.resolved
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {req.resolved ? "Resolved" : "Mark as Resolved"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
