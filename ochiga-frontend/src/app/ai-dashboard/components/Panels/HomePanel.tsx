"use client";

export default function HomePanel() {
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-emerald-300 font-semibold">🏠 Home Controls</p>
      <div className="flex gap-2">
        <button className="bg-emerald-600 px-3 py-1 rounded-full text-white">Doors</button>
        <button className="bg-emerald-600 px-3 py-1 rounded-full text-white">Lights</button>
        <button className="bg-gray-700 px-3 py-1 rounded-full">Scenes</button>
      </div>
    </div>
  );
}
