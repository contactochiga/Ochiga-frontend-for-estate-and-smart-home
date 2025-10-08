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

export default function FinancePage() {
  // --- charts data ---
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

  const [activeChart, setActiveChart] = useState<"revenue" | "collections" | "expenses">("revenue");

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

        {/* Only "New Invoice" button remains */}
        <button
          className="flex items-center px-4 py-2 border-2 border-[#800000] bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 shadow-sm transition"
        >
          <PlusIcon className="w-5 h-5 mr-2 text-[#800000]" />
          New Invoice
        </button>
      </div>

      {/* --- Insights Section --- */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Insights
          </h2>

          <div className="flex gap-2 items-center">
            {["revenue", "collections", "expenses"].map((id) => (
              <button
                key={id}
                onClick={() => setActiveChart(id as any)}
                className={`px-3 py-1 text-sm rounded-md font-medium transition ${
                  activeChart === id
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                    : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Single chart area that changes dynamically */}
        <div className="h-64 flex items-center justify-center">
          {activeChart === "revenue" && (
            <Line
              data={revenueTrend}
              options={{
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
                maintainAspectRatio: false,
              }}
            />
          )}

          {activeChart === "collections" && (
            <Doughnut
              data={collectionsRate}
              options={{
                plugins: {
                  legend: { position: "bottom", labels: { boxWidth: 14 } },
                },
              }}
            />
          )}

          {activeChart === "expenses" && (
            <Doughnut
              data={expensesBreakdown}
              options={{
                plugins: {
                  legend: { position: "bottom", labels: { boxWidth: 14 } },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
