"use client";

export default function RoomPanel() {
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-sky-300 font-semibold">🚪 Room Monitoring</p>
      <div className="text-sm">Living Room — Temp: 26°C • Humidity: 48%</div>
    </div>
  );
}
