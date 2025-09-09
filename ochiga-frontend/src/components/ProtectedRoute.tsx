// src/components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "resident" | "manager";
}) {
  const { token, role: userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // wait for auth context to finish
    if (!token) {
      router.replace("/auth"); // ✅ correct path for your login page
    } else if (role && userRole !== role) {
      router.replace("/auth"); // prevent role mismatch access
    }
  }, [token, userRole, role, loading, router]);

  // While loading or redirecting, don't render children
  if (loading || !token) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return <>{children}</>;
}
