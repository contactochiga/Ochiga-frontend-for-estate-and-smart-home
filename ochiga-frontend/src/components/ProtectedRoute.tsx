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
    if (loading) return; // Wait for authContext to finish
    if (!token) {
      router.replace("/auth");
    } else if (role && userRole !== role) {
      router.replace("/auth");
    }
  }, [token, userRole, role, loading, router]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>; // temporary loader
  }

  if (!token) return null;

  return <>{children}</>;
}
