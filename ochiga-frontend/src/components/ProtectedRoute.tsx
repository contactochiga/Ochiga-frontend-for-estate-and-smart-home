"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "resident" | "manager";
}) {
  const { token, user, loading } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.push("/login");
      } else if (role && user?.role !== role) {
        router.push("/unauthorized");
      } else {
        setChecked(true);
      }
    }
  }, [loading, token, user, role, router]);

  if (!checked) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return <>{children}</>;
}
