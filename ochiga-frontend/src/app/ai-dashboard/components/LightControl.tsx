"use client";

export default function LightControl() {
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-blue-400 font-semibold">💡 Light Control</p>
      <div className="flex items-center gap-2">
        <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full text-white">On</button>
        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">Off</button>
        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">Dim</button>
      </div>
    </div>
  );
}
