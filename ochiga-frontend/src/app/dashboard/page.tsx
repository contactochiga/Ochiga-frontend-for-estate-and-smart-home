"use client";

import ResidentHeader from "../components/ResidentHeader";          // ✅ must match actual file name
import ResidentWalletCard from "../components/ResidentWalletCard";  // ✅ check capitalization
import ResidentUtilitiesCard from "../components/ResidentUtilitiesCard";
import ResidentDeviceCards from "../components/ResidentDeviceCards";
import ResidentVisitorCard from "../components/ResidentVisitorCard";
import ResidentCommunityCard from "../components/ResidentCommunityCard";
import OchigaAssistant from "../components/OchigaAssistant";        // ✅ AI assistant

export default function DashboardPage() {
  const handleAiCommand = (response) => {
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
      <OchigaAssistant onCommand={handleAiCommand} />
    </div>
  );
}
