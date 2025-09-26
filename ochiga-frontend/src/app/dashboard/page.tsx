// app/dashboard/page.tsx
"use client";

import ResidentHeader from "../components/ResidentHeader";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white p-6">
      {/* ✅ Resident Header */}
      <ResidentHeader
        name="John Doe"
        estate="Ochiga Estate"
        phase="Phase 2"
        address="Parklane, Lagos, Nigeria"
      />
    </div>
  );
}
