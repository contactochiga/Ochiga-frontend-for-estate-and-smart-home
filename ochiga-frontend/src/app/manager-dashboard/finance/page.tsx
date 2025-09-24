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
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
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
        <h1 className="text-2xl font-bold">Finance Overview</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <PlusIcon className="w-5 h-5 mr-2" />
          New Invoice
        </button>
      </div>

      {/* === KPI Cards === */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Revenue (MTD)</p>
            <p className="text-xl font-bold">₦750,000</p>
          </div>
          <BanknotesIcon className="w-10 h-10 text-green-500" />
        </div>
        <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Outstanding Balances</p>
            <p className="text-xl font-bold">₦120,000</p>
          </div>
          <ExclamationCircleIcon className="w-10 h-10 text-red-500" />
        </div>
        <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending Payments</p>
            <p className="text-xl font-bold">₦50,000</p>
          </div>
          <DocumentTextIcon className="w-10 h-10 text-yellow-500" />
        </div>
        <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Collections Rate</p>
            <p className="text-xl font-bold">85%</p>
          </div>
          <ArrowTrendingUpIcon className="w-10 h-10 text-blue-500" />
        </div>
      </div>

      {/* === Analytics Section === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="p-4 bg-white shadow rounded-lg col-span-2">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <Line data={revenueTrend} />
        </div>

        {/* Collections Rate */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Collections Rate</h2>
          <Doughnut data={collectionsRate} />
        </div>

        {/* Expenses Breakdown */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Expenses Breakdown</h2>
          <Doughnut data={expensesBreakdown} />
        </div>
      </div>

      {/* === Transactions Table === */}
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
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
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{t.date}</td>
                  <td className="px-4 py-2">{t.resident}</td>
                  <td className="px-4 py-2">{t.type}</td>
                  <td className="px-4 py-2">₦{t.amount.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
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
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Debt Management</h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center bg-red-50 p-3 rounded">
            <span>Jane Smith (Apt 3C) – ₦50,000 outstanding</span>
            <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">
              Send Reminder
            </button>
          </li>
          <li className="flex justify-between items-center bg-red-50 p-3 rounded">
            <span>David Lee (Apt 2A) – ₦15,000 overdue</span>
            <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">
              Send Reminder
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
