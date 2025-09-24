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
  Filler,
} from "chart.js";
import {
  UsersIcon,
  WrenchScrewdriverIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import CurrencyNairaIcon from "../components/icons/CurrencyNairaIcon";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ✅ Types
interface Stats {
  residents: number;
  outstanding: number;
  requests: number;
  announcements: number;
}

interface Request {
  id: number;
  title: string;
  location: string;
  priority: "Critical" | "High" | "Medium" | "Low" | "Resolved";
  date: string;
  resolved: boolean;
}

// ✅ Reusable Stat Card
const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center space-x-4 hover:shadow-md transition">
    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

// ✅ Priority badge utility
const getPriorityBadge = (priority: Request["priority"], resolved: boolean) => {
  if (resolved) return "bg-green-600 text-white";
  switch (priority) {
    case "Critical":
      return "bg-red-600 text-white";
    case "High":
      return "bg-red-100 text-red-600";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-200 text-gray-600";
  }
};

export default function ManagerDashboard() {
  const [stats] = useState<Stats>({
    residents: 120,
    outstanding: 450000,
    requests: 8,
    announcements: 3,
  });

  const [requests, setRequests] = useState<Request[]>([
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
        fill: true,
        borderColor: "rgb(59, 130, 246)", // Tailwind blue-500
        backgroundColor: (ctx: any) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.3)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
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
    <div className="p-6 space-y-8">
      {/* Snapshot Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          icon={<UsersIcon className="w-6 h-6 text-blue-600" />}
          label="Residents"
          value={stats.residents}
        />
        <StatCard
          icon={<CurrencyNairaIcon className="w-6 h-6 text-green-600" />}
          label="Outstanding"
          value={`₦${stats.outstanding.toLocaleString()}`}
        />
        <StatCard
          icon={<WrenchScrewdriverIcon className="w-6 h-6 text-yellow-600" />}
          label="Requests"
          value={stats.requests}
        />
        <StatCard
          icon={<MegaphoneIcon className="w-6 h-6 text-purple-600" />}
          label="Announcements"
          value={stats.announcements}
        />
      </div>

      {/* Revenue Chart */}
      <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
        <Line data={revenueData} />
      </div>

      {/* Maintenance Requests Feed */}
      <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold mb-4">Recent Maintenance Requests</h2>
        {requests.length === 0 ? (
          <p className="text-sm text-gray-500">No recent requests 🎉</p>
        ) : (
          <ul className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {requests.map((req) => (
              <li
                key={req.id}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center border border-gray-200 dark:border-gray-700 hover:shadow transition"
              >
                <div>
                  <p className="font-medium">{req.title}</p>
                  <p className="text-sm text-gray-500">{req.location}</p>
                  <p className="text-xs text-gray-400">{req.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${getPriorityBadge(
                      req.priority,
                      req.resolved
                    )}`}
                  >
                    {req.priority}
                  </span>
                  <button
                    onClick={() => handleResolve(req.id)}
                    disabled={req.resolved}
                    className={`px-3 py-1 text-xs rounded-md transition ${
                      req.resolved
                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {req.resolved ? "Resolved" : "Mark as Resolved"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
