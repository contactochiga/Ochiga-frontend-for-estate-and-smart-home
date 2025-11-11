"use client";

export default function VisitorsPanel() {
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-yellow-300 font-semibold">👥 Visitor Access</p>
      <div className="flex gap-2">
        <button className="bg-yellow-600 px-3 py-1 rounded-full">Allow</button>
        <button className="bg-gray-700 px-3 py-1 rounded-full">Deny</button>
      </div>
    </div>
  );
}
