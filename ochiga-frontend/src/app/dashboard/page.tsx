// app/dashboard/page.tsx
"use client";

import { FC } from "react";

const DashboardPage: FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* ✅ Welcome Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Resident 👋</h1>
        <p className="text-gray-600 mt-2">Here’s your estate overview at a glance</p>
      </header>

      {/* ✅ Quick Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Bills</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">₦25,000</p>
          <p className="text-sm text-gray-500">Outstanding</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Access</h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">2 Visitors</p>
          <p className="text-sm text-gray-500">Expected today</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Service Requests</h2>
          <p className="text-2xl font-bold text-orange-600 mt-2">3 Pending</p>
          <p className="text-sm text-gray-500">Needs attention</p>
        </div>
      </section>

      {/* ✅ Recent Updates */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Updates</h2>
        <ul className="space-y-3">
          <li className="border-b pb-2 text-gray-700">
            ✅ Power maintenance scheduled for tomorrow.
          </li>
          <li className="border-b pb-2 text-gray-700">
            🚗 Your visitor access for John Doe has been approved.
          </li>
          <li className="text-gray-700">💧 Water supply restoration completed in Block B.</li>
        </ul>
      </section>
    </main>
  );
};

export default DashboardPage;
