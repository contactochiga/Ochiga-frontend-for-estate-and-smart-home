"// app/dashboard/page.tsx
"use client";

import { FC } from "react";

const Card: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={`bg-[#1c1f26] rounded-xl p-4 shadow-md text-gray-200 ${className}`}
  >
    {children}
  </div>
);

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-[#0f1115] p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Smart Home Controls */}
        <Card className="col-span-1 lg:col-span-2">
          <h2 className="text-sm text-gray-400 font-medium mb-4">
            SMART HOME CONTROLS
          </h2>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-lg">
                💡
              </div>
              <span className="text-sm mt-2">Lights</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-lg">
                ❄️
              </div>
              <span className="text-sm mt-2">AC</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-lg">
                🔒
              </div>
              <span className="text-sm mt-2">Door</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 cursor-pointer">
            Rooms & Devices →
          </p>
        </Card>

        {/* Visitors */}
        <Card>
          <h2 className="text-sm text-gray-400 font-medium mb-4">VISITORS</h2>
          <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg px-4 py-2 w-full mb-4">
            Invite Visitor
          </button>
          <div className="bg-gray-100 text-gray-800 rounded-lg p-3 text-sm flex justify-between items-center">
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-gray-500">Visited 2 days ago</p>
            </div>
            <span>→</span>
          </div>
        </Card>

        {/* Wallet */}
        <Card>
          <h2 className="text-sm text-gray-400 font-medium mb-4">WALLET</h2>
          <p className="text-2xl font-bold mb-4">₦12,500</p>
          <button className="bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 w-full mb-2 text-sm">
            Fund Wallet
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 w-full text-sm">
            Pay Bills
          </button>
        </Card>

        {/* Community */}
        <Card>
          <h2 className="text-sm text-gray-400 font-medium mb-4">COMMUNITY</h2>
          <div className="bg-gray-100 text-gray-800 rounded-lg p-3 text-sm flex justify-between items-center">
            <div>
              <p className="font-medium">Latest</p>
              <p className="text-xs text-gray-500">
                Reminder: Community meeting…
              </p>
            </div>
            <span>→</span>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default DashboardPage;
