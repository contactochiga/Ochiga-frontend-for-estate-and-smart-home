"use client";

import ManagerHeaderCard from "../../components/ManagerHeaderCard";
import EstateStatsCard from "../../components/EstateStatsCard";
import CommunityFeedCard from "../../components/CommunityFeedCard";
import TasksCard from "../../components/TasksCard";

export default function ManagerDashboardPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ManagerHeaderCard />
      <EstateStatsCard />
      <CommunityFeedCard />
      <TasksCard />
    </div>
  );
}
