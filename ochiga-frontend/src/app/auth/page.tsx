// src/app/auth/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"resident" | "manager">("resident");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let endpoint =
        mode === "login"
          ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/auth/login`
          : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/auth/register`;

      const body: any = { email, password, role };
      if (mode === "register") body.confirmPassword = confirmPassword;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || `${mode} failed`);
      }

      const data = await res.json();
      // TODO: Save token/user to context or localStorage
      router.push(role === "resident" ? "/dashboard" : "/manager-dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md">
        {/* Role Switch */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l-md ${role === "resident" ? "bg-[#800000] text-white" : "bg-gray-200"}`}
            onClick={() => setRole("resident")}
          >
            Resident
          </button>
          <button
            className={`px-4 py-2 rounded-r-md ${role === "manager" ? "bg-[#800000] text-white" : "bg-gray-200"}`}
            onClick={() => setRole("manager")}
          >
            Manager
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#800000] mb-6">
          {mode === "login" ? "Login" : "Register"} as {role}
        </h1>

        {/* Error */}
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />

          {mode === "register" && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#800000] text-white py-2 rounded hover:bg-red-900 disabled:opacity-50"
          >
            {loading ? (mode === "login" ? "Logging in..." : "Registering...") : mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        {/* Switch Mode */}
        <p className="text-sm text-center mt-4">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-[#800000] font-medium hover:underline"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </main>
  );
}
