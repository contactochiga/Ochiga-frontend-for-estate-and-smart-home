// ochiga-frontend/src/app/auth/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaApple,
  FaGoogle,
  FaQrcode,
  FaHouseUser,
  FaLock,
  FaTimes,
} from "react-icons/fa";

/**
 * Replace these imports with your real auth helpers.
 * Kept the same names so swapping is trivial.
 */
import { signInWithGoogle, loginWithEmail, signupWithEmail } from "../../lib/firebaseAuth";

/* -------------------------
   Small local UI pieces
   -------------------------*/

function PillButton({
  children,
  onClick,
  variant = "primary",
  loading = false,
  type,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  const base = "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-black text-white border border-black hover:brightness-95"
      : variant === "secondary"
      ? "bg-white text-black border border-gray-200 hover:brightness-95"
      : "bg-transparent text-gray-200 border border-gray-700";
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={`${base} ${styles}`}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

function Input({
  label,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & { label?: string }) {
  return (
    <label className="block w-full">
      {label && <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</div>}
      <input
        {...props}
        className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-700 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
}

/* -------------------------
   Auth Page
   -------------------------*/

export default function AuthPage() {
  const router = useRouter();

  // mode: login or signup
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  // email/password fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // modals
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // invite paste state
  const [inviteText, setInviteText] = useState("");

  // simple client-side routing shortcut (auto-redirect if role exists)
  useEffect(() => {
    const savedRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
    if (savedRole === "estate") router.push("/estate-dashboard");
    else if (savedRole === "resident") router.push("/ai-dashboard");
  }, [router]);

  /* -------------------------
     Handlers (wired to your helpers)
     -------------------------*/

  const handleEmailSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
        // NOTE: backend should return role — temp heuristic:
        localStorage.setItem("userRole", "estate");
        router.push("/estate-dashboard");
      } else {
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          setLoading(false);
          return;
        }
        await signupWithEmail(email, password);
        localStorage.setItem("userRole", "estate");
        router.push("/auth/estate-complete");
      }
    } catch (err: any) {
      alert(err?.message ?? "Auth failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const u = await signInWithGoogle();
      // Example: role derivation is app-specific; adjust as needed
      const roleGuess = (u?.email ?? "").endsWith("@estate.example") ? "estate" : "resident";
      localStorage.setItem("userRole", roleGuess);
      router.push(roleGuess === "resident" ? "/ai-dashboard" : "/estate-dashboard");
    } catch (err: any) {
      alert(err?.message ?? "Google sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleApple = async () => {
    setLoading(true);
    try {
      // TODO: wire real Sign in with Apple
      // Simulate resident flow for now
      localStorage.setItem("userRole", "resident");
      router.push("/ai-dashboard");
    } catch (err: any) {
      alert(err?.message ?? "Apple sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (emailToReset?: string) => {
    if (!emailToReset) {
      alert("Please enter your email to reset.");
      return;
    }
    alert(`Password reset link sent to ${emailToReset} (stub).`);
    setShowForgotModal(false);
  };

  const handlePasteInvite = () => {
    if (!inviteText || inviteText.length < 6) {
      alert("Paste a valid invite link or code.");
      return;
    }
    // Real implementation: call backend to validate invite, return assigned role
    localStorage.setItem("userRole", "resident");
    router.push("/ai-dashboard");
  };

  /* -------------------------
     UI
     -------------------------*/

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Close button top-right (floating) */}
      <button
        aria-label="Close"
        className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shadow-sm"
        onClick={() => {
          // close could navigate away or do nothing; we keep it simple
          // router.back();
        }}
      >
        <FaTimes />
      </button>

      {/* Center logo / heading area (subtle) */}
      <div className="absolute inset-x-0 top-12 flex justify-center z-40 pointer-events-none">
        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl font-bold tracking-tight">Ochiga</div>
          <div className="text-sm text-gray-500">Securely manage homes, residents & infrastructure</div>
        </div>
      </div>

      {/* Big bottom sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-t-3xl bg-black text-white shadow-2xl px-6 py-6 sm:py-8">
            {/* Top handle */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1.5 rounded-full bg-gray-700/70" />
            </div>

            {/* Primary actions */}
            <div className="space-y-3">
              {/* Apple — white pill inside dark sheet */}
              <button
                onClick={handleApple}
                className="w-full rounded-xl bg-white text-black px-4 py-3 flex items-center justify-center gap-3 font-semibold hover:brightness-95"
                disabled={loading}
                aria-label="Continue with Apple"
              >
                <FaApple /> Continue with Apple
              </button>

              {/* Google — dark pill with subtle border */}
              <button
                onClick={handleGoogle}
                className="w-full rounded-xl bg-gray-800 border border-gray-700 px-4 py-3 flex items-center justify-center gap-3 font-semibold hover:brightness-95"
                disabled={loading}
                aria-label="Continue with Google"
              >
                <FaGoogle /> Continue with Google
              </button>

              {/* Email collapsible (kept visible here) */}
              <div className="rounded-xl bg-white/6 border border-gray-800 p-4">
                <form onSubmit={(e) => handleEmailSubmit(e)} className="space-y-3">
                  <label className="block w-full text-sm text-gray-300">Sign in with email</label>

                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 placeholder-gray-400 outline-none text-white"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 placeholder-gray-400 outline-none text-white"
                  />

                  {mode === "signup" && (
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 placeholder-gray-400 outline-none text-white"
                    />
                  )}

                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:brightness-95"
                      disabled={loading}
                    >
                      {mode === "login" ? "Log in" : "Create account"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode(mode === "login" ? "signup" : "login")}
                      className="px-4 py-3 rounded-xl border border-gray-700"
                    >
                      {mode === "login" ? "Sign up" : "Log in"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Footer links area */}
            <div className="mt-5 flex items-center justify-between text-sm text-gray-400">
              <div>
                <button
                  onClick={() => setShowForgotModal(true)}
                  className="underline text-gray-400"
                >
                  Forgot password?
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="bg-white/5 text-white px-3 py-1.5 rounded-lg hover:bg-white/8"
                >
                  Enter your home
                </button>
              </div>
            </div>

            <div className="mt-4 text-center text-xs text-gray-500">
              By continuing you agree to our Terms & Privacy.
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- Invite Modal -------------------- */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowInviteModal(false)}
          />
          <div className="relative z-50 w-full max-w-md bg-white rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Enter your home</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-500 rounded-full p-2 hover:bg-gray-100"
                aria-label="Close invite modal"
              >
                <FaTimes />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-3">
              Use the QR invite sent to you or paste your invite link/code below.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  alert("QR scanning not implemented in this demo. Paste invite instead.");
                }}
                className="flex flex-col items-center gap-2 px-3 py-4 rounded-lg bg-gray-100 border text-center"
              >
                <FaQrcode size={28} />
                <div className="text-sm">Scan QR</div>
              </button>

              <div className="flex flex-col">
                <input
                  value={inviteText}
                  onChange={(e) => setInviteText(e.target.value)}
                  placeholder="Paste invite link or code"
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 outline-none"
                />
                <div className="flex gap-2 mt-3">
                  <PillButton variant="primary" onClick={handlePasteInvite}>
                    Join home
                  </PillButton>
                  <button
                    onClick={() => {
                      navigator.clipboard
                        .readText()
                        .then((t) => setInviteText(t))
                        .catch(() => alert("Clipboard read not available"));
                    }}
                    className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    Paste
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- Forgot Password Modal -------------------- */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowForgotModal(false)}
          />
          <div className="relative z-50 w-full max-w-md bg-white rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Forgot password</h3>
              <button onClick={() => setShowForgotModal(false)} className="text-gray-500 p-2 rounded-full hover:bg-gray-100">
                <FaTimes />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-3">
              Enter the email you used to sign up. We'll send a reset link.
            </p>

            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />
              <div className="flex gap-2">
                <PillButton variant="primary" onClick={() => handleForgotPassword(email)}>
                  Send reset link
                </PillButton>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="px-3 py-2 rounded-lg border border-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
