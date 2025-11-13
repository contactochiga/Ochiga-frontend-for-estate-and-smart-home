"use client";

import { useState } from "react";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleRegister = (inviteCode: string, username: string, password: string) => {
    setLoading(true);
    setTimeout(() => {
      alert(`Registered ${username} with code: ${inviteCode}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Register</h1>
      <RegisterForm onRegister={handleRegister} loading={loading} />
    </div>
  );
}
