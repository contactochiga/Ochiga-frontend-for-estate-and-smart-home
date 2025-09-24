"use client";

import {
  UsersIcon,
  WrenchScrewdriverIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
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

// ✅ Custom ₦ Naira Icon
const CurrencyNairaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
  >
    <text
      x="4"
      y="18"
      fontSize="14"
      fontWeight="bold"
      fill="currentColor"
    >
      ₦
    </text>
  </svg>
);

export default function ManagerDashboard() {
  const [stats] = useState({
    residents: 128,
    outstanding: 452000,
    requests: 12,
    announcements: 4,
  });

  return (
    <main className="flex-1 pt-16 pb-20 px-4 space-y-4">
      {/* Snapshot Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center space-x-3">
          <UsersIcon className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Residents</p>
            <p className="text-xl font-bold">{stats.residents}</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center space-x-3">
          {/* ✅ Now defined */}
          <CurrencyNairaIcon className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Outstanding</p>
            <p className="text-xl font-bold">
              ₦{stats.outstanding.toLocaleString()}
            </p>
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

      {/* Example Chart (Analytics) */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-base font-semibold mb-2">Revenue Trend</h3>
        <Line
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [
              {
                label: "Revenue (₦)",
                data: [120000, 180000, 150000, 200000, 250000],
                borderColor: "rgb(34,197,94)", // green-500
                backgroundColor: "rgba(34,197,94,0.2)",
              },
            ],
          }}
        />
      </div>
    </main>
  );
}
