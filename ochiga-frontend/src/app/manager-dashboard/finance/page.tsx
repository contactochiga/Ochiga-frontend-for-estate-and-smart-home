"use client";

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
import React from "react";

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

// === Date Formatter (Fixes Hydration) ===
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
};

export default function FinancePage() {
  // === Demo Data ===
  const revenueTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (₦)",
        data: [450000, 600000, 550000, 700000, 800000, 750000],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        pointBackgroundColor: "#2563eb",
        pointBorderWidth: 2,
        tension: 0.4,
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
      },
    ],
  };

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

  return (
    <div className="p-6 space-y-10">
      {/* === Header === */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Finance Overview</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition">
          <PlusIcon className="w-5 h-5 mr-2" />
          New Invoice
        </button>
      </div>

      {/* === KPI Cards === */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Revenue (MTD)",
            value: "₦750,000",
            Icon: BanknotesIcon,
            color: "text-green-500",
          },
          {
            label: "Outstanding Balances",
            value: "₦120,000",
            Icon: ExclamationCircleIcon,
            color: "text-red-500",
          },
          {
            label: "Pending Payments",
            value: "₦50,000",
            Icon: DocumentTextIcon,
            color: "text-yellow-500",
          },
          {
            label: "Collections Rate",
            value: "85%",
            Icon: ArrowTrendingUpIcon,
            color: "text-blue-500",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="p-5 bg-white dark:bg-gray-900 shadow-sm rounded-xl flex items-center justify-between hover:shadow-md transition"
          >
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-xl font-semibold">{card.value}</p>
            </div>
            <card.Icon className={`w-10 h-10 ${card.color}`} />
          </div>
        ))}
      </div>

      {/* === Analytics Section === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="p-5 bg-white dark:bg-gray-900 shadow-sm rounded-xl col-span-2">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <Line
            data={revenueTrend}
            options={{
              plugins: { legend: { display: false } },
              scales: { y: { ticks: { callback: (v) => `₦${v}` } } },
            }}
          />
        </div>

        {/* Collections Rate */}
        <div className="p-5 bg-white dark:bg-gray-900 shadow-sm rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Collections Rate</h2>
          <Doughnut
            data={collectionsRate}
            options={{ plugins: { legend: { position: "bottom" } } }}
          />
        </div>

        {/* Expenses Breakdown */}
        <div className="p-5 bg-white dark:bg-gray-900 shadow-sm rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Expenses Breakdown</h2>
          <Doughnut
            data={expensesBreakdown}
            options={{ plugins: { legend: { position: "bottom" } } }}
          />
        </div>
      </div>

      {/* === Transactions Table === */}
      <div className="p-5 bg-white dark:bg-gray-900 shadow-sm rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-600 uppercase text-xs">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Resident</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="bg-gray-50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition"
                >
                  <td className="px-4 py-2">{formatDate(t.date)}</td>
                  <td className="px-4 py-2">{t.resident}</td>
                  <td className="px-4 py-2">{t.type}</td>
                  <td className="px-4 py-2">₦{t.amount.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        t.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : t.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:underline">
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === Debt Management === */}
      <div className="p-5 bg-white dark:bg-gray-900 shadow-sm rounded-xl">
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
              <button className="px-4 py-1.5 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition">
                Send Reminder
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
