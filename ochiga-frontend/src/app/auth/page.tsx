"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithGoogle,
  loginWithEmail,
  signupWithEmail,
  resetPassword,
} from "../../lib/firebaseAuth";

import AuthContainer from "./components/AuthContainer";
import AuthInput from "./components/AuthInput";
import AuthButton from "./components/AuthButton";

export default function AuthPage() {
  const router = useRouter();

  // MODES: login | signup | join (Residents)
  const [mode, setMode] = useState<"login" | "signup" | "join">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState(""); // For Residents

  const [authLoading, setAuthLoading] = useState(false);

  // Auto-route on already logged-in user
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole === "estate") router.push("/estate-dashboard");
    if (savedRole === "resident") router.push("/resident-dashboard");
  }, [router]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
        localStorage.setItem("userRole", "estate");
        router.push("/estate-dashboard");
      } else if (mode === "signup") {
        await signupWithEmail(email, password);
        router.push("/auth/estate-complete");
      } else if (mode === "join") {
        if (!inviteCode.trim()) return alert("Enter your invite code or link");

        // Resident onboarding next step
        localStorage.setItem("pendingInviteCode", inviteCode);
        router.push("/auth/resident-onboarding");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogle = async () => {
    setAuthLoading(true);
    try {
      const user = await signInWithGoogle();
      localStorage.setItem("userRole", "estate");
      router.push("/estate-dashboard");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleApple = () =>
    alert("Apple sign-in will be enabled after backend OAuth setup");

  const handleForgotPassword = async () => {
    if (!email) return alert("Enter email first");
    try {
      await resetPassword(email);
      alert("Reset link sent to email");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <AuthContainer>
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8">
        {mode === "login"
          ? "Welcome Back"
          : mode === "signup"
          ? "Create an Estate Account"
          : "Join Your Home"}
      </h1>

      {/* FORM */}
      <form onSubmit={handleEmailAuth} className="w-full max-w-md space-y-4">
        {mode !== "join" && (
          <AuthInput
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        {mode === "login" || mode === "signup" ? (
          <AuthInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <AuthInput
            placeholder="Invite Link or QR Code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
        )}

        <AuthButton type="submit" loading={authLoading}>
          {mode === "login"
            ? "Log In"
            : mode === "signup"
            ? "Sign Up as Estate"
            : "Continue"}
        </AuthButton>
      </form>

      {/* Forgot password */}
      {mode === "login" && (
        <button
          onClick={handleForgotPassword}
          className="text-sm mt-3 underline"
        >
          Forgot password?
        </button>
      )}

      {/* OR */}
      {(mode === "login" || mode === "signup") && (
        <div className="my-6 text-sm opacity-60">OR</div>
      )}

      {(mode === "login" || mode === "signup") && (
        <div className="w-full max-w-md space-y-3">
          <AuthButton variant="secondary" onClick={handleGoogle}>
            Continue with Google
          </AuthButton>

          <AuthButton variant="secondary" onClick={handleApple}>
            Continue with Apple
          </AuthButton>
        </div>
      )}

      {/* MODE SWITCH */}
      <div className="text-sm mt-6 space-y-2">
        {mode !== "login" && (
          <button onClick={() => setMode("login")} className="underline block">
            Have an account? Sign in
          </button>
        )}

        {mode !== "signup" && (
          <button onClick={() => setMode("signup")} className="underline block">
            Create Estate Account
          </button>
        )}

        {mode !== "join" && (
          <button onClick={() => setMode("join")} className="underline block">
            Join a Home (Residents)
          </button>
        )}
      </div>
    </AuthContainer>
  );
}
