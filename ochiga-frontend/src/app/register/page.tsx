"use client";

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const { registerManager } = useAuth();
  const [estateName, setEstateName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerManager({ estateName, managerName, managerEmail, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register Estate</h2>
        <input
          type="text"
          placeholder="Estate Name"
          className="w-full p-2 border rounded"
          value={estateName}
          onChange={(e) => setEstateName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Manager Name"
          className="w-full p-2 border rounded"
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Manager Email"
          className="w-full p-2 border rounded"
          value={managerEmail}
          onChange={(e) => setManagerEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Estate
        </button>
      </form>
    </div>
  );
}
