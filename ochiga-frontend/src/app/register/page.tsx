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
    <div className="register-container">
      <h2>Register Estate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Estate Name"
          value={estateName}
          onChange={(e) => setEstateName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Manager Name"
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Manager Email"
          value={managerEmail}
          onChange={(e) => setManagerEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create Estate</button>
      </form>
    </div>
  );
}
