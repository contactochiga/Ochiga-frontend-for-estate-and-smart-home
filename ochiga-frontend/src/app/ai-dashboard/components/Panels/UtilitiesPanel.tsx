"use client";

export default function UtilitiesPanel() {
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-amber-300 font-semibold">⚡ Utilities</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-xs">Electricity</div>
        <div className="font-semibold">OK</div>
        <div className="text-xs">Water</div>
        <div className="font-semibold">OK</div>
      </div>
    </div>
  );
}
