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
  const { token, role: userRole, loading } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return; // wait until auth context finishes

    if (!token) {
      router.replace("/auth");
    } else if (role && userRole !== role) {
      router.replace("/auth");
    } else {
      setChecked(true); // ✅ safe to render
    }
  }, [token, userRole, role, loading, router]);

  if (loading || !checked) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return <>{children}</>;
}
