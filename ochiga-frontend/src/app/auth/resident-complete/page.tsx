"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function ResidentActivationPage() {
  const router = useRouter();
  const params = useSearchParams();

  // --- Temporary token simulation ---------------------------
  const token = params.get("token") || "FAKE_TOKEN_PLACEHOLDER";

  const fakeValidateToken = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (token && token !== "") resolve(true);
        else resolve(false);
      }, 700);
    });
  };
  // -----------------------------------------------------------

  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const validate = async () => {
      const valid = await fakeValidateToken();
      setTokenValid(valid);
    };
    validate();
  }, []);

  const handleActivation = () => {
    if (!username.trim()) return setError("Username is required");
    if (pass.length < 6) return setError("Password must be at least 6 characters");
    if (pass !== confirmPass) return setError("Passwords do not match");

    // Fake saving activation
    document.cookie = "ochiga_resident_auth=true; path=/";

    router.push("/ai-dashboard");
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden relative px-6">
      {/* Top Back Button */}
      <button
        onClick={() => router.push("/auth")}
        className="absolute top-4 left-4 text-gray-400 hover:text-white transition"
      >
        <AiOutlineArrowLeft size={26} />
      </button>

      {/* If token invalid */}
      {tokenValid === false && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-400 text-lg"
        >
          Invalid or expired activation link.
        </motion.div>
      )}

      {/* If token still loading */}
      {tokenValid === null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 text-lg"
        >
          Validating activation...
        </motion.div>
      )}

      {/* Main UI */}
      {tokenValid === true && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-[90%] max-w-md bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-xl"
        >
          {/* OYI LOGO TITLE */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white tracking-wide">
              OYI
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Activate Your Home Profile
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-3">{error}</p>
          )}

          {/* Username */}
          <input
            type="text"
            placeholder="Choose a Username"
            className="w-full p-3 mb-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 mb-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-6 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={handleActivation}
            className="w-full p-3 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-700 transition"
          >
            Activate Home
          </button>

          <p className="text-gray-600 text-xs text-center mt-6">
            This activation link can only be used once.
          </p>
        </motion.div>
      )}
    </div>
  );
}
