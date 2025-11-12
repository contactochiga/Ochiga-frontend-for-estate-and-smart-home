"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const params = useSearchParams();
  const estateName = params.get("name");

  useEffect(() => {
    setTimeout(() => router.push("/auth"), 3000);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <div className="text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-semibold mb-2">
          Welcome, {estateName || "Your Estate"}!
        </h1>
        <p className="text-gray-400 mb-6">Your registration is complete.</p>
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
