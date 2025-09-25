import ManagerHeaderCard from "../components/ManagerHeaderCard";
import EstateStatsCard from "../components/EstateStatsCard";
import CommunityFeedCard from "../components/CommunityFeedCard";
import TasksCard from "../components/TasksCard";
import PaymentsOverviewCard from "../components/PaymentsOverviewCard";

export default function ManagerDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Manager Dashboard Layout */}
      <ManagerHeaderCard />
      <EstateStatsCard />
      <CommunityFeedCard />
      <TasksCard />
      <PaymentsOverviewCard /> {/* 👈 Payment card now included */}
    </div>
  );
}
