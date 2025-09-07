"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../data/authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "resident" | "manager"; // optional: restrict by role
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token || !user) {
      router.replace(`/${role ? role + "-login" : "resident-login"}`);
    } else if (role && user.role !== role) {
      // e.g. manager trying to access resident dashboard
      router.replace(`/${user.role}-dashboard`);
    }
  }, [user, token, role, router]);

  if (!token || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}