// ochiga-frontend/src/app/auth/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * OPTIONAL: If you have these helpers in your project (as earlier),
 * keep these imports. If not, the UI still works and will show alerts.
 */
import {
  signInWithGoogle,
  signInWithApple,
  loginWithEmail,
  signupWithEmail,
  sendPasswordResetEmail,
} from "../../lib/firebaseAuth";

/* -------------------------
   Small UI subcomponents
   ------------------------- */

function IconGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 12.23c0-.68-.06-1.33-.17-1.96H12v3.71h5.34c-.23 1.26-.93 2.32-1.98 3.04v2.54h3.2C19.78 18.34 21 15.49 21 12.23z" fill="#4285F4"/>
      <path d="M12 22c2.7 0 4.97-.9 6.63-2.45l-3.2-2.54c-.9.6-2.05.96-3.43.96-2.64 0-4.88-1.78-5.68-4.16H2.97v2.6C4.66 19.9 8.06 22 12 22z" fill="#34A853"/>
      <path d="M6.32 13.81A6.99 6.99 0 0 1 6 12c0-.66.1-1.3.32-1.81V7.59H2.97A10.98 10.98 0 0 0 2 12c0 1.78.37 3.46 1.03 4.99l3.29-3.18z" fill="#FBBC05"/>
      <path d="M12 6.5c1.47 0 2.79.5 3.84 1.49l2.87-2.87C16.95 3.67 14.7 2.8 12 2.8 8.06 2.8 4.66 4.9 2.97 7.59l3.35 2.6C7.12 8.28 9.36 6.5 12 6.5z" fill="#EA4335"/>
    </svg>
  );
}

function IconApple() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M16.365 1.43c-.63.74-1.29 1.68-1.06 2.78.27 1.32 1.43 2.25 2.37 2.38.2-.9.08-1.99-.57-2.85-.44-.58-1.05-1.12-1.74-2.31z" fill="currentColor"/>
      <path d="M20.95 14.3c-.1-2.07.82-3.66 2.6-4.8-1.7-2.43-4.34-3.43-6.87-3.48-2.9-.06-4.48 1.46-6.68 1.46-2.2 0-3.82-1.42-6.38-1.42C1.35 6.06.05 9.7.05 12.92c0 2.66 1.33 5.92 3.77 8.25 2.58 2.47 4.9 3.86 8.16 3.86 2.42 0 3.24-1.46 6.07-1.46 2.78 0 4.03 1.46 6.07 1.46 1.68 0 4.12-1.68 6.54-4.5-2.95-1.99-3.86-5.73-3.59-6.99z" fill="currentColor"/>
    </svg>
  );
}

/* -------------------------
   Main Auth Page
   ------------------------- */

export default function AuthPage() {
  const router = useRouter();

  // tabs: sign-in | sign-up | join
  const [tab, setTab] = useState<"signin" | "signup" | "join">("signin");

  // common
  const [loading, setLoading] = useState(false);
  const [roleVariant, setRoleVariant] = useState<"resident" | "estate">("resident"); // quick role selector

  // signin
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");

  // signup
  const [suUsername, setSuUsername] = useState("");
  const [suFullName, setSuFullName] = useState("");
  const [suPhone, setSuPhone] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suConfirm, setSuConfirm] = useState("");

  // join home
  const [inviteCode, setInviteCode] = useState(""); // paste link or code
  const [qrScanning, setQrScanning] = useState(false); // placeholder state

  // forgot password modal
  const [showForgot, setShowForgot] = useState(false);
  const [fpEmail, setFpEmail] = useState("");

  // redirect if already role in localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole === "estate") router.push("/estate-dashboard");
    if (savedRole === "resident") router.push("/resident-dashboard");
  }, [router]);

  /* -------------------------
     Helpers that call your auth layer (if present)
     ------------------------- */

  const handleGoogle = async () => {
    setLoading(true);
    try {
      if (typeof signInWithGoogle === "function") {
        const user = await signInWithGoogle();
        // use user info to pick role — here we default to resident (adapt after backend)
        localStorage.setItem("userRole", roleVariant);
        alert(`Welcome ${user.email || user.displayName}`);
        router.push(roleVariant === "estate" ? "/estate-dashboard" : "/resident-dashboard");
      } else {
        // placeholder
        localStorage.setItem("userRole", roleVariant);
        alert("Google sign-in not wired in this environment — demo success.");
        router.push(roleVariant === "estate" ? "/estate-dashboard" : "/resident-dashboard");
      }
    } catch (err: any) {
      alert(err?.message ?? "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleApple = async () => {
    setLoading(true);
    try {
      if (typeof signInWithApple === "function") {
        const user = await signInWithApple();
        localStorage.setItem("userRole", roleVariant);
        router.push(roleVariant === "estate" ? "/estate-dashboard" : "/resident-dashboard");
      } else {
        localStorage.setItem("userRole", roleVariant);
        alert("Apple sign-in not wired — demo success.");
        router.push(roleVariant === "estate" ? "/estate-dashboard" : "/resident-dashboard");
      }
    } catch (err: any) {
      alert(err?.message ?? "Apple sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!siEmail || !siPassword) return alert("Email and password required.");
    setLoading(true);
    try {
      if (typeof loginWithEmail === "function") {
        await loginWithEmail(siEmail, siPassword);
      }
      localStorage.setItem("userRole", roleVariant);
      router.push(roleVariant === "estate" ? "/estate-dashboard" : "/resident-dashboard");
    } catch (err: any) {
      alert(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!suUsername || !suFullName || !suEmail || !suPassword) return alert("Please complete required fields.");
    if (suPassword !== suConfirm) return alert("Passwords do not match.");
    setLoading(true);
    try {
      if (typeof signupWithEmail === "function") {
        await signupWithEmail({ username: suUsername, fullName: suFullName, email: suEmail, password: suPassword, phone: suPhone });
      }
      // after signup, you might redirect to a 'complete your estate' flow for estate role
      localStorage.setItem("userRole", roleVariant);
      if (roleVariant === "estate") router.push("/auth/estate-complete");
      else router.push("/resident-dashboard");
    } catch (err: any) {
      alert(err?.message ?? "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSend = async () => {
    if (!fpEmail) return alert("Enter email to reset password.");
    setLoading(true);
    try {
      if (typeof sendPasswordResetEmail === "function") {
        await sendPasswordResetEmail(fpEmail);
        alert("Password reset email sent (check inbox).");
      } else {
        alert("Reset email not wired — demo only.");
      }
      setShowForgot(false);
    } catch (err: any) {
      alert(err?.message ?? "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinHome = () => {
    // placeholder: parse inviteCode or start QR scanning flow
    if (!inviteCode && !qrScanning) return alert("Paste invite link/code or scan QR.");
    // pretend success:
    localStorage.setItem("userRole", "resident");
    alert("Invite accepted — welcome to your home (demo).");
    router.push("/resident-dashboard");
  };

  /* -------------------------
     Small layout helpers
     ------------------------- */

  const TabButton: React.FC<{ id: "signin" | "signup" | "join"; label: string }> = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
        tab === id ? "bg-white/10 text-white" : "text-white/60 hover:text-white/80"
      }`}
    >
      {label}
    </button>
  );

  /* -------------------------
     Render
     ------------------------- */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-[#05060a] to-black px-4">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left column: Visual / headline */}
        <div className="hidden md:flex flex-col justify-center gap-6 p-8 rounded-2xl bg-[linear-gradient(180deg,#071026,rgba(7,16,38,0.6))] border border-white/3 shadow-xl">
          <h1 className="text-3xl font-bold text-white">Welcome to Ochiga</h1>
          <p className="text-sm text-white/70">Smart home & estate control — secure, simple, and fast. Sign in or join a home using an invite.</p>
          <div className="mt-4">
            <img alt="illustration" src="/illustration-auth.svg" className="w-full opacity-80" />
          </div>
        </div>

        {/* Right column: Auth card */}
        <div className="bg-gray-900/80 border border-gray-800 p-6 rounded-2xl shadow-lg backdrop-blur-md">
          {/* Role toggle (Estate / Resident) */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2">
              <TabButton id="signin" label="Sign In" />
              <TabButton id="signup" label="Sign Up" />
              <TabButton id="join" label="Join Home" />
            </div>

            <div className="flex items-center gap-2 text-xs text-white/70">
              <span>Signing as</span>
              <select
                value={roleVariant}
                onChange={(e) => setRoleVariant(e.target.value as any)}
                className="bg-transparent text-white/90 border border-gray-700 rounded-full px-3 py-1 text-sm"
              >
                <option value="resident">Resident</option>
                <option value="estate">Estate</option>
              </select>
            </div>
          </div>

          <div className="mt-3">
            {/* ---------------- Sign In ---------------- */}
            {tab === "signin" && (
              <>
                <h2 className="text-lg font-semibold text-white mb-1">Welcome back</h2>
                <p className="text-xs text-white/60 mb-4">Sign in to continue to your dashboard.</p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-2 rounded-full bg-white/6 hover:bg-white/10 transition text-white"
                  >
                    <IconGoogle /> <span className="text-sm">Continue with Google</span>
                  </button>

                  <button
                    onClick={handleApple}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-2 rounded-full bg-white/6 hover:bg-white/10 transition text-white"
                  >
                    <IconApple /> <span className="text-sm">Continue with Apple</span>
                  </button>

                  <div className="relative py-1 text-center text-xs text-white/50">
                    <span className="bg-gray-900 px-3">Or with email</span>
                  </div>

                  <form onSubmit={handleEmailLogin} className="flex flex-col gap-3">
                    <input
                      type="email"
                      placeholder="Email"
                      value={siEmail}
                      onChange={(e) => setSiEmail(e.target.value)}
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={siPassword}
                      onChange={(e) => setSiPassword(e.target.value)}
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
                    />
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <button
                        type="button"
                        onClick={() => setShowForgot(true)}
                        className="underline text-white/60"
                      >
                        Forgot password?
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {loading ? "Signing in…" : "Sign in"}
                      </button>
                    </div>
                  </form>
                </div>

                <p className="text-xs text-white/60 mt-4">
                  Don’t have an account?{" "}
                  <button onClick={() => setTab("signup")} className="underline text-white">
                    Create one
                  </button>
                </p>
              </>
            )}

            {/* ---------------- Sign Up ---------------- */}
            {tab === "signup" && (
              <>
                <h2 className="text-lg font-semibold text-white mb-1">Create account</h2>
                <p className="text-xs text-white/60 mb-4">Quick sign up — you can complete details later.</p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-2 rounded-full bg-white/6 hover:bg-white/10 transition text-white"
                  >
                    <IconGoogle /> <span className="text-sm">Continue with Google</span>
                  </button>

                  <button
                    onClick={handleApple}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-2 rounded-full bg-white/6 hover:bg-white/10 transition text-white"
                  >
                    <IconApple /> <span className="text-sm">Continue with Apple</span>
                  </button>

                  <div className="relative py-1 text-center text-xs text-white/50">
                    <span className="bg-gray-900 px-3">Or sign up with email</span>
                  </div>

                  <form onSubmit={handleEmailSignup} className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Username (public)"
                      value={suUsername}
                      onChange={(e) => setSuUsername(e.target.value)}
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={suFullName}
                      onChange={(e) => setSuFullName(e.target.value)}
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number (optional)"
                      value={suPhone}
                      onChange={(e) => setSuPhone(e.target.value)}
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={suEmail}
                      onChange={(e) => setSuEmail(e.target.value)}
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={suPassword}
                      onChange={(e) => setSuPassword(e.target.value)}
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
                    />
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={suConfirm}
                      onChange={(e) => setSuConfirm(e.target.value)}
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
                    />

                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {loading ? "Creating…" : "Create account"}
                      </button>
                    </div>
                  </form>
                </div>

                <p className="text-xs text-white/60 mt-4">
                  Already have an account?{" "}
                  <button onClick={() => setTab("signin")} className="underline text-white">
                    Sign in
                  </button>
                </p>
              </>
            )}

            {/* ---------------- Join Home ---------------- */}
            {tab === "join" && (
              <>
                <h2 className="text-lg font-semibold text-white mb-1">Join a Home</h2>
                <p className="text-xs text-white/60 mb-4">Have an invite link or QR from your estate? Paste it, or scan the QR code.</p>

                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      placeholder="Paste invite link or code"
                      className="flex-1 rounded-xl bg-gray-800/60 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
                    />
                    <button
                      onClick={() => setQrScanning((v) => !v)}
                      className="px-4 py-2 rounded-xl bg-white/6 text-white"
                    >
                      {qrScanning ? "Stop" : "Scan QR"}
                    </button>
                  </div>

                  {qrScanning && (
                    <div className="rounded-xl border border-gray-700 p-3 bg-gray-800/50 text-sm text-white/70">
                      QR scanner placeholder — integrate camera scanner here.
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button onClick={handleJoinHome} className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-full text-sm font-medium">
                      Join Home
                    </button>
                  </div>
                </div>

                <p className="text-xs text-white/60 mt-4">
                  Need a new invite? Contact your estate admin.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Forgot password modal */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowForgot(false)} />
          <div className="relative w-full max-w-md bg-gray-900/95 border border-gray-800 p-6 rounded-2xl z-60">
            <h3 className="text-white font-semibold mb-2">Reset password</h3>
            <p className="text-xs text-white/60 mb-4">Enter the email linked to your account — we'll send reset instructions.</p>
            <input
              value={fpEmail}
              onChange={(e) => setFpEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-xl bg-gray-800/60 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowForgot(false)} className="px-3 py-2 rounded-xl text-white/60">Cancel</button>
              <button onClick={handleForgotSend} className="px-4 py-2 rounded-xl bg-emerald-500 text-black">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
