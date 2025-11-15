"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// dynamic import, no SSR
const MapPicker = dynamic(() => import("../components/MapPicker"), { ssr: false });

export default function EstateCompletePage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [verified, setVerified] = useState(false);
  const [emailOwner, setEmailOwner] = useState<string | null>(null);
  const [estateName, setEstateName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [saving, setSaving] = useState(false);

  // On mount, verify token (mock)
  useEffect(() => {
    const invites = JSON.parse(localStorage.getItem("ochiga_invites") || "[]");
    const found = invites.find((i: any) => i.token === token && i.type === "estateInvite" && !i.used);
    if (found) {
      setVerified(true);
      setEmailOwner(found.email);
    } else {
      setVerified(false);
    }
  }, [token]);

  // reverse geocode when location changes
  useEffect(() => {
    if (!location) return;
    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
        );
        const data = await res.json();
        if (data?.results?.[0]) setAddress(data.results[0].formatted_address);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchAddress();
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verified) { alert("Invalid or used token"); return; }
    if (!estateName || !address || !location) { alert("Complete fields"); return; }
    setSaving(true);

    // Save estate in localStorage
    const estates = JSON.parse(localStorage.getItem("ochiga_estates") || "[]");
    const estateId = `estate_${Date.now()}`;
    estates.push({ id: estateId, name: estateName, address, location, createdBy: emailOwner });
    localStorage.setItem("ochiga_estates", JSON.stringify(estates));

    // mark invite used
    const invites = JSON.parse(localStorage.getItem("ochiga_invites") || "[]");
    const idx = invites.findIndex((i: any) => i.token === token);
    if (idx >= 0) { invites[idx].used = true; localStorage.setItem("ochiga_invites", JSON.stringify(invites)); }

    // attach estate to admin user
    const users = JSON.parse(localStorage.getItem("ochiga_users") || "[]");
    const userIdx = users.findIndex((u: any) => u.email === emailOwner);
    if (userIdx >= 0) {
      users[userIdx].estates = users[userIdx].estates || [];
      users[userIdx].estates.push(estateId);
      localStorage.setItem("ochiga_users", JSON.stringify(users));
    }

    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    router.push(`/auth/success?name=${encodeURIComponent(estateName)}`);
  };

  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="p-6 bg-gray-900 border border-gray-800 rounded">
          <h2 className="text-lg font-semibold mb-2">Invalid or expired invite</h2>
          <p className="text-sm text-gray-400">This invite link is invalid or already used.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h1 className="text-xl font-semibold mb-2">Complete Estate Registration</h1>
        <p className="text-sm text-gray-400 mb-4">Owner: <span className="text-emerald-300">{emailOwner}</span></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            placeholder="Estate Name"
            value={estateName}
            onChange={(e) => setEstateName(e.target.value)}
          />
          <input
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            placeholder="Address (or choose on map)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="h-56 rounded overflow-hidden border border-gray-800">
            {/* MapPicker now assumes google.maps is already loaded */}
            <MapPicker setLocation={setLocation} />
          </div>

          <button disabled={saving} className="w-full py-3 rounded bg-emerald-600 hover:bg-emerald-700">
            {saving ? "Saving..." : "Create Estate"}
          </button>
        </form>
      </div>
    </div>
  );
}
