"use client";

import React from "react";
import { ManagerHeaderCard, EstateStatsCard } from "../components";

export default function ManagerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 space-y-6">
      {/* Header */}
      <ManagerHeaderCard />

      {/* Estate Stats */}
      <EstateStatsCard />

      {/* Add more cards below as we build out */}
    </div>
  );
}
