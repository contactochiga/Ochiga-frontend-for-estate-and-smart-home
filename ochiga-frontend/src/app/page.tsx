"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-8">Welcome to Ochiga</h1>
      <div className="space-y-4 w-full max-w-sm">
        {/* Manager button */}
        <button
          onClick={() => router.push("/manager-dashboard")}
          className="w-full bg-gradient-to-r from-maroon-700 to-black text-white py-3 px-4 rounded-lg font-semibold shadow"
        >
          Manager Dashboard
        </button>

        {/* Resident button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-lg font-semibold shadow"
        >
          Resident Dashboard
        </button>

        {/* ✅ Temporary Login button */}
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold shadow"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
