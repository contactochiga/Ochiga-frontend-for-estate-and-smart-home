// src/app/manager-dashboard/page.tsx
import ManagerHeaderCard from "../components/ManagerHeaderCard";
import EstateStatsCard from "../components/EstateStatsCard";
import CommunityFeedCard from "../components/CommunityFeedCard";
import TasksCard from "../components/TasksCard";
import PaymentsOverviewCard from "../components/PaymentsOverviewCard";
import RecentActivitiesCard from "../components/RecentActivitiesCard";
import SecurityAlertsCard from "../components/SecurityAlertsCard";
import VisitorApprovalsCard from "../components/VisitorApprovalsCard";

export default function ManagerDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Top Section: Greeting / Overview */}
      <ManagerHeaderCard />

      {/* Stats Section */}
      <EstateStatsCard />

      {/* Grid Layout for Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <CommunityFeedCard />
          <TasksCard />
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <PaymentsOverviewCard />
          <VisitorApprovalsCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <RecentActivitiesCard />
          <SecurityAlertsCard />
        </div>
      </div>
    </div>
  );
}
