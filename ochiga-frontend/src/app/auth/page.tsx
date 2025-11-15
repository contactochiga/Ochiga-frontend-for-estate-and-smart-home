"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { signupWithEmail, loginWithEmail, signInWithGoogle } from "./authFunctions";
import AuthContainer from "./components/AuthContainer";
import AuthInput from "./components/AuthInput";
import AuthButton from "./components/AuthButton";
import AuthModal from "./components/AuthModal";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // ---------------------------------------------------
  // ✅ IMPORTANT ADD-ON: auto-redirect if user already logged in
  // ---------------------------------------------------

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");

    if (savedRole === "estate") {
      router.push("/estate-dashboard");
    } else if (savedRole === "resident") {
      router.push("/resident-dashboard");
    }
  }, []);
  // ---------------------------------------------------

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      if (mode === "login") {
        // LOGIN
        await loginWithEmail(email, password);
        alert(`Logged in as ${email}`);

        // TEMP ROLE: Estate
        localStorage.setItem("userRole", "estate");

        router.push("/estate-dashboard");
      } else {
        // SIGNUP
        await signupWithEmail(email, password);
        alert(`Signed up as ${email}`);

        // TEMP ROLE: Estate signing up
        localStorage.setItem("userRole", "estate");

        router.push("/auth/estate-complete");
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
      alert(`Logged in as ${user.email}`);

      // TEMP ROLE → Estate
      localStorage.setItem("userRole", "estate");

      router.push("/estate-dashboard");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContainer>
      <h1 className="text-3xl font-bold mb-6">
        {mode === "login" ? "Welcome Back" : "Create an Account"}
      </h1>

      {/* EMAIL + PASSWORD FORM */}
      <form onSubmit={handleEmailSubmit} className="w-full max-w-md space-y-4">
        <AuthInput
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton loading={authLoading} type="submit">
          {mode === "login" ? "Log In" : "Sign Up"}
        </AuthButton>
      </form>

      {/* GOOGLE BUTTON */}
      <AuthButton onClick={handleGoogle} variant="secondary" loading={authLoading}>
        Continue with Google
      </AuthButton>

      {/* SWITCH MODE LINK */}
      <p className="text-sm mt-4">
        {mode === "login" ? (
          <>
            Don’t have an account?{" "}
            <button onClick={() => setMode("signup")} className="underline">
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => setMode("login")} className="underline">
              Log in
            </button>
          </>
        )}
      </p>

      {/* MODAL (unchanged) */}
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AuthContainer>
  );
}
