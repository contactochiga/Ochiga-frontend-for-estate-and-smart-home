import OchigaAssistant from "../components/OchigaAssistant";

export default function DashboardPage() {
  const handleAiCommand = (response) => {
    // You can parse the AI’s response here and trigger dashboard actions.
    console.log("AI Command:", response);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white p-6 space-y-6">
      <ResidentHeader
        name="John Doe"
        estate="Ochiga Estate"
        phase="Phase 2"
        address="Parklane, Lagos, Nigeria"
      />
      <ResidentWalletCard />
      <ResidentUtilitiesCard />
      <ResidentDeviceCards />
      <ResidentVisitorCard />
      <ResidentCommunityCard />

      {/* 👇 Floating AI Assistant */}
      <OchigaAssistant onCommand={handleAiCommand} />
    </div>
  );
}
