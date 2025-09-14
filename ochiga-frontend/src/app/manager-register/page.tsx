"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../data/authContext";

export default function ManagerRegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          role: "MANAGER", // ✅ enforce manager role
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Registration failed");
      }

      const data = await res.json();

      // ✅ Auto-login the manager after registration
      login(data.user, data.token);

      setMessage(`✅ Manager registered: ${data.user.email}`);

      // Redirect to dashboard
      router.push("/manager-dashboard");
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-600">
          Manager Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Manager"}
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/manager-login" className="text-green-600 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
