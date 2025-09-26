// app/dashboard/page.tsx
"use client";

import ResidentHeader from "../components/ResidentHeader";
import ResidentWalletCard from "../components/Residentwalletcard";
import ResidentUtilitiesCard from "../components/ResidentUtilitiesCard";
import ResidentDeviceCards from "../components/ResidentDeviceCards";
import ResidentVisitorCard from "../components/ResidentVisitorCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white p-6 space-y-6">
      {/* ✅ Resident Header */}
      <ResidentHeader
        name="John Doe"
        estate="Ochiga Estate"
        phase="Phase 2"
        address="Parklane, Lagos, Nigeria"
      />

      {/* ✅ Resident Wallet Card */}
      <ResidentWalletCard />

      {/* ✅ Resident Utilities Card */}
      <ResidentUtilitiesCard />

      {/* ✅ Resident Device Cards */}
      <ResidentDeviceCards />

      {/* ✅ Resident Visitor Card */}
      <ResidentVisitorCard />
    </div>
  );
}
