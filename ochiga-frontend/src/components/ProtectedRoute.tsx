// src/components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "resident" | "manager"; // optional restriction
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token || !userRole) {
      // Not logged in → go to auth
      router.replace("/auth");
      return;
    }

    if (role && userRole !== role) {
      // Wrong role → redirect to correct dashboard
      router.replace(userRole === "manager" ? "/manager-dashboard" : "/dashboard");
      return;
    }

    setIsAuthorized(true);
    setLoading(false);
  }, [role, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
