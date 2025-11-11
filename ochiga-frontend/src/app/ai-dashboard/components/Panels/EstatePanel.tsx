"use client";

export default function EstatePanel() {
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-indigo-300 font-semibold">🏘️ Estate Overview</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-xs">Units</div>
        <div className="font-semibold">12</div>
        <div className="text-xs">Active Alerts</div>
        <div className="font-semibold text-red-400">1</div>
      </div>
    </div>
  );
}
