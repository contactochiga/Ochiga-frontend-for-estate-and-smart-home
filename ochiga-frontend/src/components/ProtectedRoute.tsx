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
    if (loading) return; // ✅ wait until auth context is done
    if (!token) {
      router.replace("/auth");
    } else if (role && userRole !== role) {
      router.replace("/auth");
    }
  }, [token, userRole, role, loading, router]);

  // ✅ While still loading, show a spinner or nothing
  if (loading) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  // ✅ After loading, only block if token missing
  if (!token) {
    return null;
  }

  return <>{children}</>;
}
