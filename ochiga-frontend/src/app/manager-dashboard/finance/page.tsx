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
import { Bar, Line, Doughnut } from "react-chartjs-2";
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

export default function FinancePage() {
  // === Demo Data ===
  const revenueTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (₦)",
        data: [450000, 600000, 550000, 700000, 800000, 750000],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
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
        backgroundColor: ["#4f46e5", "#16a34a", "#f59e0b", "#dc2626"],
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
    <div className="p-6 space-y-8">
      {/* === Header === */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Finance Overview
        </h1>
        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow hover:opacity-90 transition">
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
            icon: <BanknotesIcon className="w-10 h-10 text-green-500" />,
          },
          {
            label: "Outstanding Balances",
            value: "₦120,000",
            icon: <ExclamationCircleIcon className="w-10 h-10 text-red-500" />,
          },
          {
            label: "Pending Payments",
            value: "₦50,000",
            icon: <DocumentTextIcon className="w-10 h-10 text-yellow-500" />,
          },
          {
            label: "Collections Rate",
            value: "85%",
            icon: <ArrowTrendingUpIcon className="w-10 h-10 text-indigo-500" />,
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl shadow bg-white dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-gray-900 flex items-center justify-between transition hover:shadow-lg"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {card.label}
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {card.value}
              </p>
            </div>
            {card.icon}
          </div>
        ))}
      </div>

      {/* === Analytics Section === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="p-5 rounded-xl shadow bg-white dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-gray-900 col-span-2">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Revenue Trend
          </h2>
          <Line data={revenueTrend} />
        </div>

        {/* Collections Rate */}
        <div className="p-5 rounded-xl shadow bg-white dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-gray-900">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Collections Rate
          </h2>
          <Doughnut data={collectionsRate} />
        </div>

        {/* Expenses Breakdown */}
        <div className="p-5 rounded-xl shadow bg-white dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-gray-900">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Expenses Breakdown
          </h2>
          <Doughnut data={expensesBreakdown} />
        </div>
      </div>

      {/* === Transactions Table === */}
      <div className="p-5 rounded-xl shadow bg-white dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-gray-900">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-600 dark:text-gray-400 uppercase text-xs">
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
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(t.date))}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100 font-medium">
                    {t.resident}
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    {t.type}
                  </td>
                  <td className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                    ₦{t.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        t.status === "Paid"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                          : t.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">
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
      <div className="p-5 rounded-xl shadow bg-white dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-gray-900">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Debt Management
        </h2>
        <ul className="space-y-2">
          {[
            { resident: "Jane Smith (Apt 3C)", amount: "₦50,000 outstanding" },
            { resident: "David Lee (Apt 2A)", amount: "₦15,000 overdue" },
          ].map((d, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
            >
              <span className="text-gray-800 dark:text-gray-200">
                {d.resident} – {d.amount}
              </span>
              <button className="px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-md text-sm shadow hover:opacity-90 transition">
                Send Reminder
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
