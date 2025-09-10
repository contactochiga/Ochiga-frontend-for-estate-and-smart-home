"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "resident") {
        router.replace("/dashboard");
      } else if (role === "manager") {
        router.replace("/manager-dashboard");
      } else {
        router.replace("/auth");
      }
    } else {
      router.replace("/auth");
    }
  }, [router]);

  return (
    <main className="flex items-center justify-center h-screen">
      <p className="text-gray-600">Redirecting...</p>
    </main>
  );
}
