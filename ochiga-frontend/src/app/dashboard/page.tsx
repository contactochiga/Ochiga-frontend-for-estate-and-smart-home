// app/dashboard/page.tsx
"use client";

import { FC } from "react";

// -----------------------------
// Interfaces (Types)
// -----------------------------
interface Visitor {
  id: number;
  name: string;
  lastVisit: string;
}

interface Wallet {
  balance: number;
}

interface CommunityUpdate {
  id: number;
  title: string;
  message: string;
}

// -----------------------------
// Mock Data
// -----------------------------
const visitors: Visitor[] = [
  { id: 1, name: "John Doe", lastVisit: "Visited 2 days ago" },
  { id: 2, name: "Jane Smith", lastVisit: "Visited last week" },
];

const wallet: Wallet = {
  balance: 12500,
};

const communityUpdates: CommunityUpdate[] = [
  {
    id: 1,
    title: "Reminder",
    message: "Community meeting on Saturday at 5PM",
  },
  {
    id: 2,
    title: "Notice",
    message: "Pool maintenance tomorrow morning",
  },
];

// -----------------------------
// Dashboard Component
// -----------------------------
const Dashboard: FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Smart Home Controls */}
      <div className="bg-gray-800 rounded-xl p-4 shadow">
        <h2 className="text-sm font-semibold text-gray-400 mb-4">SMART HOME CONTROLS</h2>
        <div className="flex space-x-4 mb-4">
          <button className="flex flex-col items-center bg-gray-700 p-3 rounded-lg">
            💡
            <span className="text-xs mt-1">Lights</span>
          </button>
          <button className="flex flex-col items-center bg-gray-700 p-3 rounded-lg">
            ❄️
            <span className="text-xs mt-1">AC</span>
          </button>
          <button className="flex flex-col items-center bg-gray-700 p-3 rounded-lg">
            🔒
            <span className="text-xs mt-1">Door</span>
          </button>
        </div>
        <a href="#" className="text-xs text-gray-400">Rooms & Devices →</a>
      </div>

      {/* Visitors */}
      <div className="bg-gray-800 rounded-xl p-4 shadow">
        <h2 className="text-sm font-semibold text-gray-400 mb-4">VISITORS</h2>
        <button className="w-full bg-red-600 py-2 rounded-lg text-white font-semibold mb-4">
          Invite Visitor
        </button>
        {visitors.map((visitor) => (
          <div
            key={visitor.id}
            className="bg-gray-100 text-black p-3 rounded-lg flex justify-between items-center mb-2"
          >
            <span>
              <strong>{visitor.name}</strong>
              <br />
              <span className="text-xs text-gray-600">{visitor.lastVisit}</span>
            </span>
            <span>→</span>
          </div>
        ))}
      </div>

      {/* Wallet */}
      <div className="bg-gray-800 rounded-xl p-4 shadow">
        <h2 className="text-sm font-semibold text-gray-400 mb-2">WALLET</h2>
        <p className="text-2xl font-bold mb-4">
          ₦{wallet.balance.toLocaleString()}
        </p>
        <button className="w-full bg-gray-700 py-2 rounded-lg text-white font-semibold mb-2">
          Fund Wallet
        </button>
        <button className="w-full bg-gray-700 py-2 rounded-lg text-white font-semibold">
          Pay Bills
        </button>
      </div>

      {/* Community */}
      <div className="bg-gray-800 rounded-xl p-4 shadow">
        <h2 className="text-sm font-semibold text-gray-400 mb-2">COMMUNITY</h2>
        {communityUpdates.map((update) => (
          <div
            key={update.id}
            className="bg-gray-100 text-black p-3 rounded-lg flex justify-between items-center mb-2"
          >
            <span>
              <strong>{update.title}</strong>
              <br />
              <span className="text-xs text-gray-600">{update.message}</span>
            </span>
            <span>→</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
