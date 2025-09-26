"use client";

import { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// ✅ ChartJS registration
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// ✅ Hydration-safe date formatting
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" }); // Always 3 letters
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

// Dummy data
const transactions = [
  { date: "2025-09-01", resident: "John Doe", type: "Rent", amount: 120000 },
  { date: "2025-09-02", resident: "Mary Johnson", type: "Service Charge", amount: 35000 },
  { date: "2025-09-05", resident: "Samuel Okoro", type: "Utility", amount: 15000 },
];

const revenueTrend = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [500000, 600000, 750000, 700000, 820000, 900000],
      borderColor: "#2563eb",
      backgroundColor: "rgba(37,99,235,0.2)",
    },
  ],
};

const collectionsRate = {
  labels: ["Collected", "Outstanding"],
  datasets: [
    {
      data: [75, 25],
      backgroundColor: ["#16a34a", "#dc2626"],
    },
  ],
};

const expensesBreakdown = {
  labels: ["Maintenance", "Utilities", "Security", "Others"],
  datasets: [
    {
      data: [200000, 100000, 150000, 50000],
      backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#6366f1"],
    },
  ],
};

export default function FinancePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6 space-y-6">
      {/* === Search Bar === */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-64"
        />
      </div>

      {/* === Analytics Section === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <div className="flex-1">
            <Line
              data={revenueTrend}
              options={{
                plugins: { legend: { display: false } },
                scales: { y: { ticks: { callback: (v) => `₦${v}` } } },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        {/* Collections Rate */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Collections Rate</h2>
          <div className="flex-1 flex items-center justify-center">
            <Doughnut
              data={collectionsRate}
              options={{ plugins: { legend: { position: "bottom" } } }}
            />
          </div>
        </div>

        {/* Expenses Breakdown */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Expenses Breakdown</h2>
          <div className="flex-1 flex items-center justify-center">
            <Doughnut
              data={expensesBreakdown}
              options={{ plugins: { legend: { position: "bottom" } } }}
            />
          </div>
        </div>
      </div>

      {/* === Transactions === */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Resident</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr
                  key={i}
                  className="bg-gray-50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition"
                >
                  <td className="px-4 py-2">{formatDate(t.date)}</td>
                  <td className="px-4 py-2">{t.resident}</td>
                  <td className="px-4 py-2">{t.type}</td>
                  <td className="px-4 py-2">₦{t.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === Debt Management === */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Debt Management</h2>
        <ul className="space-y-3">
          {[
            { name: "Jane Smith (Apt 3C)", amount: "₦50,000 outstanding" },
            { name: "David Lee (Apt 2A)", amount: "₦15,000 overdue" },
          ].map((debtor, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-red-50 dark:bg-red-900/30 p-4 rounded-lg"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {debtor.name} – {debtor.amount}
              </span>
              <button className="px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition">
                Remind
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ✅ Shared Card Style
const card = `
  p-5 bg-white dark:bg-gray-900 shadow-sm rounded-xl h-full flex flex-col
`;
