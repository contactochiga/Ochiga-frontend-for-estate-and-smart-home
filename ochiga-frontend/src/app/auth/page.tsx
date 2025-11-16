"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaApple,
  FaGoogle,
  FaQrcode,
  FaLink,
  FaHouseUser,
  FaLock,
} from "react-icons/fa";

/**
 * Replace these imports with your real auth helpers.
 * I keep the same names you used earlier so swapping is trivial.
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
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
}) {
  const base =
    "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-gray-900 text-white border border-gray-700 hover:bg-gray-800"
      : variant === "secondary"
      ? "bg-white text-gray-900 border border-gray-200 hover:brightness-95"
      : "bg-transparent text-gray-200 border border-gray-700";
  return (
    <button onClick={onClick} className={`${base} ${styles}`} disabled={loading}>
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
      {label && <div className="text-sm text-gray-400 mb-1">{label}</div>}
      <input
        {...props}
        className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"
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

  // simple client-side routing shortcut (auto-redirect if role exists)
  useEffect(() => {
    const savedRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
    if (savedRole === "estate") router.push("/estate-dashboard");
    else if (savedRole === "resident") router.push("/ai-dashboard");
  }, [router]);

  /* -------------------------
     Handlers
     -------------------------*/

  const handleEmailSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
        // NOTE: backend should tell role; we temporarily set role based on account type or add logic
        localStorage.setItem("userRole", "estate"); // <-- temp; adapt after backend role info
        router.push("/estate-dashboard");
      } else {
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
        await signupWithEmail(email, password);
        // after signup, route to onboarding for estate creation
        localStorage.setItem("userRole", "estate"); // temporary: estate signup flow
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
      // Example: your signInWithGoogle should return user and role must be derived from backend
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
      // For now we simulate successful login and choose resident flow
      localStorage.setItem("userRole", "resident");
      router.push("/ai-dashboard");
    } catch (err: any) {
      alert(err?.message ?? "Apple sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (emailToReset?: string) => {
    // TODO: call your password reset API (e.g., firebase.auth().sendPasswordResetEmail)
    if (!emailToReset) {
      alert("Please enter your email to reset.");
      return;
    }
    alert(`Password reset link sent to ${emailToReset} (stub).`);
    setShowForgotModal(false);
  };

  /* -------------------------
     Invite / Enter Home Flow
     -------------------------*/

  const [inviteText, setInviteText] = useState("");
  const handlePasteInvite = () => {
    // Very light validation (you can make strong validation client or server side)
    if (!inviteText || inviteText.length < 8) {
      alert("Paste a valid invite link or code.");
      return;
    }
    // Real implementation: call backend to validate invite, return assigned role
    // For now we assume the paste indicates resident onboarding
    localStorage.setItem("userRole", "resident");
    router.push("/ai-dashboard");
  };

  /* -------------------------
     UI
     -------------------------*/

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white text-xl font-bold">
              O
            </div>
            <div>
              <h1 className="text-xl font-semibold">Welcome to Ochiga</h1>
              <p className="text-sm text-gray-400">Securely manage homes, residents and infrastructure</p>
            </div>
          </div>

          {/* Primary action buttons (Google / Apple / Email) */}
          <div className="space-y-3">
            <PillButton variant="secondary" onClick={handleGoogle} loading={loading}>
              <FaGoogle /> Continue with Google
            </PillButton>

            <PillButton variant="secondary" onClick={handleApple} loading={loading}>
              <FaApple /> Continue with Apple
            </PillButton>

            {/* Email collapsible area */}
            <div className="rounded-xl border border-gray-800 p-4">
              <form onSubmit={(e) => handleEmailSubmit(e)} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Sign in with email"
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label=""
                  required
                />

                {mode === "signup" && (
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label=""
                    required
                  />
                )}

                <div className="flex gap-2">
                  <PillButton type="submit" onClick={() => {}} loading={loading}>
                    {mode === "login" ? "Log in" : "Create account"}
                  </PillButton>
                </div>
              </form>
            </div>
          </div>

          {/* Links: toggle sign up / login, forgot password, enter your home */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <div>
              {mode === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="underline text-gray-200"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setMode("login")} className="underline text-gray-200">
                    Log in
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowForgotModal(true)}
                className="underline text-gray-400"
              >
                Forgot password?
              </button>

              {/* "Enter your home" action (A) */}
              <button
                onClick={() => setShowInviteModal(true)}
                className="text-gray-100 bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-700"
                title="Enter your home with QR/invite"
              >
                Enter your home
              </button>
            </div>
          </div>
        </div>

        {/* Small footer note */}
        <div className="text-center text-xs text-gray-500 mt-3">
          By continuing you agree to our Terms & Privacy.
        </div>
      </div>

      {/* -------------------- Invite Modal -------------------- */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowInviteModal(false)}
          />
          <div className="relative z-50 w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Enter your home</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400"
                aria-label="Close invite modal"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-3">
              Use the QR invite sent to you or paste your invite link/code below.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  // TODO: wire a real QR scanner (mobile) — placeholder behavior
                  alert("QR scanning not implemented in this demo. Paste invite instead.");
                }}
                className="flex flex-col items-center gap-2 px-3 py-4 rounded-lg bg-gray-800 border border-gray-700 text-center"
              >
                <FaQrcode size={28} />
                <div className="text-sm">Scan QR</div>
              </button>

              <div className="flex flex-col">
                <input
                  value={inviteText}
                  onChange={(e) => setInviteText(e.target.value)}
                  placeholder="Paste invite link or code"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 outline-none"
                />
                <div className="flex gap-2 mt-3">
                  <PillButton onClick={handlePasteInvite}>Join home</PillButton>
                  <button
                    onClick={() => {
                      // quick helper to paste from clipboard (UX nicety)
                      navigator.clipboard
                        .readText()
                        .then((t) => setInviteText(t))
                        .catch(() => alert("Clipboard read not available"));
                    }}
                    className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300"
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
          <div className="relative z-50 w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Forgot password</h3>
              <button onClick={() => setShowForgotModal(false)} className="text-gray-400">
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-3">
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
                <PillButton onClick={() => handleForgotPassword(email)}>Send reset link</PillButton>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300"
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
