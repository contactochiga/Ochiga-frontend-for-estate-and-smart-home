import PaymentsOverviewCard from "../../components/PaymentsOverviewCard";

export default function ManagerDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <ManagerHeaderCard />
      <EstateStatsCard />
      <CommunityFeedCard />
      <TasksCard />
      <PaymentsOverviewCard /> {/* 👈 Added here */}
    </div>
  );
}
