"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (username: string, password: string) => {
    setLoading(true);
    setTimeout(() => {
      // ✅ Mock login
      if (username && password) router.push("/dashboard");
      else alert("Invalid login");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Login</h1>
      <LoginForm onLogin={handleLogin} loading={loading} />
    </div>
  );
}
