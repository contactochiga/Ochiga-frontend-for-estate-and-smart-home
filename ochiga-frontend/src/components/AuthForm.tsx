// src/components/AuthForm.tsx
"use client";

import { useState } from "react";
import { apiRequest } from "../lib/api";
import { saveToken } from "../lib/auth";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "login" | "register";
  role: "resident" | "manager";
}

export default function AuthForm({ type, role }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = type === "login" ? "/auth/login" : "/auth/register";
      const data = await apiRequest(endpoint, "POST", { email, password });

      if (data.token) {
        saveToken(data.token);
        router.push(role === "resident" ? "/dashboard" : "/manager-dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-white p-6 shadow rounded w-80"
    >
      <h1 className="text-lg font-bold mb-4">
        {role === "resident" ? "Resident" : "Manager"}{" "}
        {type === "login" ? "Login" : "Register"}
      </h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-2 p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-4 p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Please wait..." : type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
