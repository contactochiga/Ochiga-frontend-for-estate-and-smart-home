"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-8">Welcome to Ochiga</h1>
      <div className="space-y-4 w-full max-w-sm">
        <button
          onClick={() => router.push("/manager-dashboard")}
          className="w-full bg-maroon-600 hover:bg-maroon-700 text-white py-3 px-4 rounded-lg font-semibold"
        >
          Manager
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-lg font-semibold"
        >
          Resident
        </button>
      </div>
    </div>
  );
}
