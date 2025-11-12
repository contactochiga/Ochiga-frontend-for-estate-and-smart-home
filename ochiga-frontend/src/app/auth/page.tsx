"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SlideUnlock from "../components/ui/SlideUnlock";

export default function LandingPage() {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
    setTimeout(() => router.push("/auth/login"), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-6">
      <h1 className="text-4xl font-bold mb-4 text-emerald-400">Welcome to Ochiga</h1>
      <p className="text-center text-gray-300 mb-12 max-w-md">
        Enter your smart estate and home management dashboard.
      </p>

      <SlideUnlock onUnlock={handleUnlock} />

      {unlocked && <p className="mt-6 text-green-400 font-semibold animate-pulse">Access Granted ✅</p>}
    </div>
  );
}
