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
  role: "resident" | "manager";
}) {
  const { token, role: userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      // 🔥 Fix: redirect to /auth instead of /login
      router.push("/auth");
    } else if (role && userRole !== role) {
      router.push("/auth");
    }
  }, [token, userRole, router, role]);

  if (!token) return null;

  return <>{children}</>;
}
