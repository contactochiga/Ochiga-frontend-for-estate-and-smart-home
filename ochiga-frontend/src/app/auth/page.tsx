"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";

export default function AuthPage() {
  const [role, setRole] = useState<"resident" | "manager">("resident");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === "1234") {
      if (role === "resident") {
        login("fake-resident-token", "resident");
        router.push("/dashboard");
      } else {
        login("fake-manager-token", "manager");
        router.push("/manager-dashboard");
      }
    } else {
      setError("Invalid credentials. Use any email + password: 1234");
    }
  };

  return (
    <main
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md">
        {/* Role Toggle */}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-l-md ${
              role === "resident" ? "bg-[#800000] text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("resident")}
          >
            Resident
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-r-md ${
              role === "manager" ? "bg-[#800000] text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("manager")}
          >
            Manager
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#800000] mb-6">
          Login as {role}
        </h1>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="password"
            placeholder="Password (use 1234)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-[#800000] text-white py-2 rounded hover:bg-red-900"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
