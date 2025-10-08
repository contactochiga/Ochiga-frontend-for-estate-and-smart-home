"use client";

import React, { useState } from "react";
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ExclamationCircleIcon,
  DocumentTextIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Helper: format date
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
};

type ChartKey = "revenue" | "collections" | "expenses";

/**
 * ChartTabs
 * - Buttons sit in their own row under "Insights"
 * - Proper spacing (no overlap)
 * - Active tab shows maroon border (#800000)
 */
function ChartTabs({
  revenueTrend,
  collectionsRate,
  expensesBreakdown,
}: {
  revenueTrend: any;
  collectionsRate: any;
  expensesBreakdown: any;
}) {
  const [active, setActive] = useState<ChartKey>("revenue");

  const TabButton: React.FC<{ id: ChartKey; label: string }> = ({ id, label }) => (
    <button
      type="button"
      aria-pressed={active === id}
      onClick={() => setActive(id)}
      className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all duration-150 border ${
        active === id
          ? "border-[#800000] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          : "border-transparent text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/60"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Insights</h2>

      {/* Buttons row below title — dedicated space and gap */}
      <div className="flex flex-wrap gap-2 mb-4">
        <TabButton id="revenue" label="Revenue" />
        <TabButton id="collections" label="Collections" />
        <TabButton id="expenses" label="Expenses" />
      </div>

      {/* Chart area — fixed height, responsive, no overlap */}
      <div className="w-full h-[280px] md:h-64 flex items-center justify-center">
        {active === "revenue" && (
          <div className="w-full h-full">
            <Line
              data={revenueTrend}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    ticks: {
                      callback: (v) => `₦${v}`,
                    },
                    grid: { color: "rgba(156,163,175,0.08)" },
                  },
                  x: { grid: { display: false } },
                },
              }}
            />
          </div>
        )}

        {active === "collections" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-xs w-full h-full">
              <Doughnut
                data={collectionsRate}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "bottom", labels: { boxWidth: 12 } },
                  },
                }}
              />
            </div>
          </div>
        )}

        {active === "expenses" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-xs w-full h-full">
              <Doughnut
                data={expensesBreakdown}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "bottom", labels: { boxWidth: 12 } },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FinancePage() {
  // --- Chart data ---
  const revenueTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (₦)",
        data: [450000, 600000, 550000, 700000, 800000, 750000],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.08)",
        pointBackgroundColor: "#2563eb",
        pointBorderWidth: 2,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const expensesBreakdown = {
    labels: ["Security", "Repairs", "Cleaning", "Utilities"],
    datasets: [
      {
        data: [200000, 120000, 80000, 100000],
        backgroundColor: ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"],
        borderWidth: 2,
      },
    ],
  };

  const collectionsRate = {
    labels: ["Paid", "Outstanding"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ["#16a34a", "#dc2626"],
        borderWidth: 2,
      },
    ],
  };

  // --- Transactions + KPIs ---
  const transactions = [
    {
      id: 1,
      date: "2025-09-01",
      resident: "John Doe (Apt 4B)",
      type: "Rent",
      amount: 250000,
      status: "Paid",
    },
    {
      id: 2,
      date: "2025-09-05",
      resident: "Jane Smith (Apt 3C)",
      type: "Service Charge",
      amount: 50000,
      status: "Pending",
    },
    {
      id: 3,
      date: "2025-09-07",
      resident: "David Lee (Apt 2A)",
      type: "Utility",
      amount: 15000,
      status: "Overdue",
    },
  ];

  const kpis = [
    {
      label: "Total Revenue (MTD)",
      value: "₦750,000",
      Icon: BanknotesIcon,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      label: "Outstanding Balances",
      value: "₦120,000",
      Icon: ExclamationCircleIcon,
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-900/30",
    },
    {
      label: "Pending Payments",
      value: "₦50,000",
      Icon: DocumentTextIcon,
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      label: "Collections Rate",
      value: "85%",
      Icon: ArrowTrendingUpIcon,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
  ];

  // --- Render ---
  return (
    <div className="p-6 space-y-8 font-inter bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Finance Overview
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track revenue, payments, and performance across your estate.
          </p>
        </div>

        {/* New Invoice: maroon border, grey bg, dark mode aware */}
        <button
          type="button"
          className="flex items-center px-4 py-2 border-2 border-[#800000] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm transition"
        >
          <PlusIcon className="w-5 h-5 mr-2 text-[#800000]" />
          New Invoice
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((card, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
              <p className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {card.value}
              </p>
            </div>

            <div className={`p-2 md:p-3 rounded-xl ${card.bg} flex items-center justify-center`}>
              <card.Icon className={`w-5 h-5 md:w-6 md:h-6 ${card.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartTabs
          revenueTrend={revenueTrend}
          collectionsRate={collectionsRate}
          expensesBreakdown={expensesBreakdown}
        />

        {/* Right summary section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Quick Summary</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Revenue is trending up. Collections at <span className="font-semibold">85%</span>.
              Keep an eye on Repairs & Utilities.
            </p>
          </div>

          {/* Small cards for doughnuts (optional visual backup) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
              <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-100">Collections Rate</h4>
              <div className="w-full h-28">
                <Doughnut
                  data={collectionsRate}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "bottom", labels: { boxWidth: 12 } } },
                  }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
              <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-100">Expenses Breakdown</h4>
              <div className="w-full h-28">
                <Doughnut
                  data={expensesBreakdown}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "bottom", labels: { boxWidth: 12 } } },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Recent Transactions</h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600 dark:text-gray-400 uppercase text-xs font-semibold border-b dark:border-gray-700">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Resident</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{formatDate(t.date)}</td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{t.resident}</td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{t.type}</td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">₦{t.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        t.status === "Paid"
                          ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                          : t.status === "Pending"
                          ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                          : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{t.resident}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">{t.type} • {formatDate(t.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">₦{t.amount.toLocaleString()}</p>
                  <p
                    className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
                      t.status === "Paid"
                        ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                        : t.status === "Pending"
                        ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                        : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {t.status}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Debt Management */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Debt Management</h2>
        <ul className="space-y-3">
          {[
            { name: "Jane Smith (Apt 3C)", amount: "₦50,000 outstanding" },
            { name: "David Lee (Apt 2A)", amount: "₦15,000 overdue" },
          ].map((debtor, i) => (
            <li key={i} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{debtor.name} – {debtor.amount}</span>
              <button className="mt-2 sm:mt-0 px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition">Remind</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
