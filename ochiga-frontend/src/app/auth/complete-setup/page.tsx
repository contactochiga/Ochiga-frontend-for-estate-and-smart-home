"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// ✅ Lazy-load Google Map component (avoids SSR crash)
const Map = dynamic(() => import("../components/MapPicker"), { ssr: false });

export default function CompleteSetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const estateId = searchParams.get("estateId");

  const [estateName, setEstateName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Optional: Reverse geocode when location changes to fill address automatically
  useEffect(() => {
    if (!location) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await res.json();
        if (data.results && data.results[0]) {
          setAddress(data.results[0].formatted_address);
        }
      } catch (err) {
        console.error("Failed to fetch address:", err);
      }
    };

    fetchAddress();
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estateName || !address || !location) return;

    setLoading(true);

    // Simulate saving to backend
    await new Promise((res) => setTimeout(res, 1200));

    console.log("✅ Estate Setup Complete:", {
      estateName,
      address,
      coordinates: location,
    });

    // Navigate to success page
    router.push(`/auth/success?name=${encodeURIComponent(estateName)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-6">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h1 className="text-xl font-semibold mb-1 text-center">
          Complete Your Estate Setup
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          You're registering for{" "}
          <span className="text-emerald-400 font-medium">{estateId || "Your Estate"}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Estate Name"
            value={estateName}
            onChange={(e) => setEstateName(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
          />

          <input
            type="text"
            placeholder="Estate Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
          />

          {/* 🌍 Map Picker */}
          <div className="rounded-xl overflow-hidden border border-gray-800 h-56">
            <Map setLocation={setLocation} />
          </div>

          <button
            type="submit"
            disabled={loading || !location}
            className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded font-semibold transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  );
}
