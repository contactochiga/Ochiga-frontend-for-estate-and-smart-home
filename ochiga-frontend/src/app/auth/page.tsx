// ochiga-frontend/src/app/auth/page.tsx

"use client";

import { useRouter } from "next/navigation";

export default function AuthLanding() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center shadow-xl animate-fade-in">

        {/* APP NAME */}
        <h1 className="text-4xl font-bold text-white tracking-wide">
          Oyi
        </h1>

        {/* BUILT BY */}
        <p className="text-gray-400 mt-2 text-sm">
          Built & Designed by <span className="text-blue-400">Ochiga</span>
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col gap-4">

          <button
            onClick={() => router.push("/auth/resident-complete")}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 
            text-white font-medium transition-all"
          >
            Resident Login
          </button>

          <button
            onClick={() => router.push("/auth/estate-complete")}
            className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 
            text-gray-200 border border-gray-700 font-medium transition-all"
          >
            Estate Admin Signup
          </button>

        </div>
      </div>
    </div>
  );
}
