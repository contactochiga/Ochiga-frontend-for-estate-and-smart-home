"use client";

export default function HealthPanel() {
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-pink-300 font-semibold">🏥 Health Monitoring</p>
      <div className="text-sm">All sensors nominal</div>
    </div>
  );
}
