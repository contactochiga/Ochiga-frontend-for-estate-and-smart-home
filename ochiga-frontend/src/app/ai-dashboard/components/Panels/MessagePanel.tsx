"use client";

export default function MessagePanel() {
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-cyan-300 font-semibold">✉️ Messaging</p>
      <div className="text-sm">Open messages / send announcement</div>
    </div>
  );
}
