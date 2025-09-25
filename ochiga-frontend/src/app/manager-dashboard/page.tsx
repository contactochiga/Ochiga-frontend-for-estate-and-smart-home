"use client";

import ManagerHeaderCard from "../components/ManagerHeaderCard";
import EstateStatsCard from "../components/EstateStatsCard";

export default function ManagerDashboardPage() {
  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      {/* Header card */}
      <ManagerHeaderCard />

      {/* Estate stats */}
      <EstateStatsCard />

      {/* Placeholder for more sections */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold">Upcoming Section</h2>
        <p className="text-gray-500 text-sm">
          More manager tools or community updates will appear here.
        </p>
      </div>
    </div>
  );
}
