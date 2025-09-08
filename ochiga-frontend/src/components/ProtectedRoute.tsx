"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../data/authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "resident" | "manager"; // optional: restrict by role
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, token } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // ✅ current route

  useEffect(() => {
    if (!token || !user) {
      // ✅ Save where the user was trying to go
      if (pathname) {
        localStorage.setItem("redirectAfterLogin", pathname);
      }
      router.replace("/auth");
    } else if (role && user.role !== role) {
      // ✅ Wrong role → redirect to correct dashboard
      router.replace(user.role === "resident" ? "/dashboard" : "/manager-dashboard");
    }
  }, [user, token, role, router, pathname]);

  if (!token || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
