// ochiga-frontend/src/app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import AuthContainer from "../components/AuthContainer";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    // TODO: Connect to backend register endpoint
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    console.log("Registered:", name);
  };

  return (
    <AuthContainer title="Create your Ochiga Ai account 🚀">
      <AuthInput label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <AuthInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <AuthInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <AuthButton label="Sign Up" onClick={handleRegister} loading={loading} />

      <p className="text-center text-xs text-gray-400 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:text-blue-300">
          Login
        </Link>
      </p>
    </AuthContainer>
  );
}
