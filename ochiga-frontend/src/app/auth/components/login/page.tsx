// ochiga-frontend/src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import AuthContainer from "../components/AuthContainer";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // TODO: Hook up with backend API (NestJS endpoint)
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    console.log("Logged in as", email);
  };

  return (
    <AuthContainer title="Welcome back 👋🏽">
      <AuthInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <AuthInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <AuthButton label="Login" onClick={handleLogin} loading={loading} />

      <p className="text-center text-xs text-gray-400 mt-4">
        New user?{" "}
        <Link href="/register" className="text-blue-400 hover:text-blue-300">
          Create an account
        </Link>
      </p>
    </AuthContainer>
  );
}
