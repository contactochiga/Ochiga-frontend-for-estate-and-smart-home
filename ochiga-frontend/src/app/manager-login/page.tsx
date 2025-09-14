"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../data/authContext";

export default function ManagerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();

      // ✅ Save manager auth
      login(data.user, data.token);

      // Redirect
      router.push("/manager-dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-600">
          Manager Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-600 text-center mt-3">{error}</p>}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/manager-register" className="text-green-600 font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
