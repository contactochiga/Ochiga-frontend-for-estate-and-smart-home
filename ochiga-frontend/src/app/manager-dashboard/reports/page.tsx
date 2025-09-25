"use client";

import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [data, setData] = useState({
    totalRent: 500000,
    outstanding: 120000,
    occupancy: 92,
    expenses: 200000,
  });

  return (
    <main className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-xl font-bold">Reports & Analytics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <p className="text-sm text-gray-500">Total Rent Collected</p>
          <p className="text-2xl font-bold text-green-600">₦{data.totalRent.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <p className="text-sm text-gray-500">Outstanding</p>
          <p className="text-2xl font-bold text-red-600">₦{data.outstanding.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <p className="text-sm text-gray-500">Occupancy Rate</p>
          <p className="text-2xl font-bold">{data.occupancy}%</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <p className="text-sm text-gray-500">Expenses</p>
          <p className="text-2xl font-bold text-orange-600">₦{data.expenses.toLocaleString()}</p>
        </div>
      </div>

      {/* Placeholder for charts */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded shadow text-center text-gray-500">
        📊 Charts coming soon (connect `recharts` or `chart.js`)
      </div>
    </main>
  );
}
