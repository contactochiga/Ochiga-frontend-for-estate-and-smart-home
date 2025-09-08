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
      router.push("/auth"); // ✅ redirect if not logged in
    } else if (role && userRole !== role) {
      router.push("/auth"); // ✅ redirect if wrong role
    }
  }, [token, userRole, router, role]);

  if (!token) return null;

  return <>{children}</>;
}
