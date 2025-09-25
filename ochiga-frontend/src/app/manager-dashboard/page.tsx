"use client";

import React from "react";
import ManagerHeaderCard from "../../components/ManagerHeaderCard";
import EstateStatsCard from "../../components/EstateStatsCard";
import CommunityFeedCard from "../../components/CommunityFeedCard";
import TasksCard from "../../components/TasksCard";

export default function ManagerDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <ManagerHeaderCard />

      {/* Estate Stats */}
      <EstateStatsCard />

      {/* Community Feed */}
      <CommunityFeedCard />

      {/* Tasks */}
      <TasksCard />
    </div>
  );
}
