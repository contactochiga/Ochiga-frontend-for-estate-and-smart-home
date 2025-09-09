// src/components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "resident" | "manager";
}) {
  const { token, role: userRole } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait until auth context finishes loading
    if (token === undefined) return;

    if (!token) {
      router.replace("/auth"); // 🔥 safer redirect
    } else if (role && userRole !== role) {
      router.replace("/auth");
    } else {
      setIsChecking(false);
    }
  }, [token, userRole, role, router]);

  // Prevent flashing "blank" or redirect loop
  if (isChecking) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return <>{children}</>;
}
