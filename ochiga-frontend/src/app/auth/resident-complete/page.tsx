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

    document.cookie = "ochiga_resident_auth=true; path=/";
    router.push("/ai-dashboard");
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black flex items-center justify-center overflow-hidden relative">
      
      {/* Back Button */}
      <button
        onClick={() => router.push("/auth")}
        className="absolute top-4 left-4 text-gray-400 hover:text-white transition z-10"
      >
        <AiOutlineArrowLeft size={26} />
      </button>

      {/* Invalid Token */}
      {tokenValid === false && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center text-red-400 text-lg"
        >
          Invalid or expired activation link.
        </motion.div>
      )}

      {/* Loading Token */}
      {tokenValid === null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-gray-400 text-lg"
        >
          Validating activation...
        </motion.div>
      )}

      {tokenValid === true && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-[92%] max-w-md bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-xl flex flex-col justify-center overflow-hidden"
          style={{ maxHeight: "85vh" }} // Lock card height
        >

          {/* Logo & Title */}
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold text-white">OYI</h1>
            <p className="text-gray-400 text-sm">Activate Your Home Profile</p>
          </div>

          {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}

          <input
            type="text"
            placeholder="Choose a Username"
            className="w-full p-3 mb-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 mb-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          <button
            onClick={handleActivation}
            className="w-full p-3 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-700 transition"
          >
            Activate Home
          </button>

          <p className="text-gray-600 text-xs text-center mt-4 opacity-80">
            This activation link can only be used once.
          </p>

        </motion.div>
      )}

    </div>
  );
}
