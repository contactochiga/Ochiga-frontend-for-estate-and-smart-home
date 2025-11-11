"use client";

export default function CCTVPanel() {
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-red-400 font-semibold">📹 CCTV Feed</p>
      <div className="aspect-video bg-black flex items-center justify-center text-gray-500 text-xs rounded-md border border-gray-700">
        Live Feed Placeholder
      </div>
    </div>
  );
}
