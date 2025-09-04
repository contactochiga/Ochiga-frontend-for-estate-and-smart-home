// src/app/resident-login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../data/authContext";

export default function ResidentLogin() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Invalid login credentials");
      }

      const data = await res.json();

      // Save user + token in context
      login(data.user, data.token);

      // Redirect
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-2xl font-bold mb-4">Resident Login</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm bg-white p-6 rounded shadow"
      >
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login as Resident"}
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/resident-register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </main>
  );
}
