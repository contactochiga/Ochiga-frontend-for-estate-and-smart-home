// src/app/manager-dashboard/page.tsx
"use client";

import ManagerHeaderCard from "../components/ManagerHeaderCard";
import EstateStatsCard from "../components/EstateStatsCard";

export default function ManagerDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* 🔝 Estate header with name + address */}
      <ManagerHeaderCard />

      {/* 📊 Stats overview */}
      <EstateStatsCard />

      {/* 🛠️ Future: Add more cards like Requests, Payments, Security Feed, etc */}
    </div>
  );
}
