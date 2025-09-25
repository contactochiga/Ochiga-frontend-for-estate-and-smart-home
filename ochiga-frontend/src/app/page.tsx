import ManagerHeaderCard from "../components/ManagerHeaderCard";
import EstateStatsCard from "../components/EstateStatsCard";
import CommunityFeedCard from "../components/CommunityFeedCard";

export default function ManagerDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <ManagerHeaderCard />
      <EstateStatsCard />
      <CommunityFeedCard />
    </div>
  );
}
