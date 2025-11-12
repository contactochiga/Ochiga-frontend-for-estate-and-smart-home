"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResidentCompletePage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [valid, setValid] = useState(false);
  const [homeInfo, setHomeInfo] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(()=> {
    // mock verification: find invite
    const invites = JSON.parse(localStorage.getItem("ochiga_invites") || "[]");
    const found = invites.find((i:any)=>i.token===token && i.type==="homeInvite" && i.used);
    if (found) {
      setValid(true);
      // in demo, store home info inside token (if any)
      setHomeInfo(found.meta || { homeName: "Assigned Home" });
    } else {
      setValid(false);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) { alert("Invalid token"); return; }
    if (password !== confirm) { alert("Passwords do not match"); return; }
    if (!username) { alert("Enter username"); return; }

    setSaving(true);
    await new Promise((r)=>setTimeout(r, 900));

    // Create user and link to home (mock)
    const users = JSON.parse(localStorage.getItem("ochiga_users") || "[]");
    const userObj = { id: `user_${Date.now()}`, username, email: `${username}@demo.local`, password, role: "resident", homes: [homeInfo?.id || "home_demo"] };
    users.push(userObj);
    localStorage.setItem("ochiga_users", JSON.stringify(users));
    localStorage.setItem("ochiga_current_user", JSON.stringify(userObj));

    setSaving(false);
    router.push("/ai-dashboard");
  };

  if (!valid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="p-6 bg-gray-900 rounded border border-gray-800">
          <h2 className="font-semibold mb-2">Invalid or expired invite</h2>
          <p className="text-sm text-gray-400">Make sure you used the QR link sent to your email.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h1 className="text-xl font-semibold mb-1">Finish Registration</h1>
        <p className="text-sm text-gray-400 mb-4">Set a username & password for your home access</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-700 rounded" placeholder="Username" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-700 rounded" placeholder="Password" />
          <input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-700 rounded" placeholder="Confirm password" />
          <button disabled={saving} className="w-full py-3 rounded bg-emerald-600 hover:bg-emerald-700">{saving ? "Saving..." : "Complete Setup"}</button>
        </form>
      </div>
    </div>
  );
}
