"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const BRAND = {
  primary: "#8A1A20",
  primaryHover: "#701218",
};

type Props = {
  onSave?: (payload: any) => void;
  onShare?: (email: string, payload: any) => void;
};

export default function EstateHomeCreationPanel({ onSave, onShare }: Props) {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [onboardingLink, setOnboardingLink] = useState("");
  const [loading, setLoading] = useState(false); // NEW
  const [form, setForm] = useState({
    name: "",
    unit: "",
    block: "",
    description: "",
    residentEmail: "",
    residentName: "",
    electricityMeter: "",
    waterMeter: "",
    internetId: "",
    gateCode: "",
    iotDevices: [] as string[],
  });

  const updateField = (key: string, value: any) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const addIoTDevice = () => {
    const id = prompt("Enter IoT Device ID or Name:");
    if (id) {
      setForm((p) => ({
        ...p,
        iotDevices: [...p.iotDevices, id],
      }));
    }
  };

  const removeIoT = (id: string) => {
    setForm((p) => ({
      ...p,
      iotDevices: p.iotDevices.filter((x) => x !== id),
    }));
  };

  const handleSave = async () => {
    setLoading(true); // NEW
    try {
      const res = await fetch("/api/estate/create-home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error creating home");
        setLoading(false); // NEW
        return;
      }

      alert("Home created successfully!");
      console.log("Backend response:", data);

      const link = data.onboardingLink || `https://app.ochiga.com/onboarding/TEST-${Date.now()}`;
      setOnboardingLink(link);
      setShowModal(true);

      if (onSave) onSave(form);
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false); // NEW
    }
  };

  const handleShare = () => {
    if (!form.residentEmail.trim()) {
      alert("Enter resident email first");
      return;
    }
    if (onShare) onShare(form.residentEmail, form);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="text-gray-200 text-sm space-y-6">
      {/* STEP INDICATOR */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-xs text-gray-400">Step {step} of 3</div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                step === i ? "bg-[var(--brand-primary)]" : "bg-gray-700"
              }`}
              style={{
                backgroundColor: step === i ? BRAND.primary : "#3f3f46",
              }}
            />
          ))}
        </div>
      </div>

      {/* STEP 1 — HOME BASIC DETAILS */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h3 className="font-semibold text-lg">Home Details</h3>
          <div>
            <label className="text-gray-400 text-xs">Home Name</label>
            <input
              className="w-full mt-1 rounded-lg px-3 py-2 bg-gray-900 border border-gray-700 focus:outline-none"
              placeholder="DT3 Unit 3"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs">Unit</label>
              <input
                className="w-full mt-1 rounded-lg px-3 py-2 bg-gray-900 border border-gray-700"
                placeholder="5B"
                value={form.unit}
                onChange={(e) => updateField("unit", e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs">Block / Street</label>
              <input
                className="w-full mt-1 rounded-lg px-3 py-2 bg-gray-900 border border-gray-700"
                placeholder="Block D"
                value={form.block}
                onChange={(e) => updateField("block", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-xs">Description</label>
            <textarea
              className="w-full mt-1 rounded-lg px-3 py-2 bg-gray-900 border border-gray-700"
              placeholder="Optional notes about this home..."
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full text-white py-2 rounded-lg mt-2"
            style={{ backgroundColor: BRAND.primary }}
          >
            Next
          </button>
        </motion.div>
      )}

      {/* STEP 2 — PRIMARY RESIDENT */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h3 className="font-semibold text-lg">Primary Resident</h3>
          <div>
            <label className="text-gray-400 text-xs">Resident Email</label>
            <input
              className="w-full mt-1 rounded-lg px-3 py-2 bg-gray-900 border border-gray-700"
              placeholder="john@example.com"
              value={form.residentEmail}
              onChange={(e) => updateField("residentEmail", e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs">Resident Full Name</label>
            <input
              className="w-full mt-1 rounded-lg px-3 py-2 bg-gray-900 border border-gray-700"
              placeholder="John Doe"
              value={form.residentName}
              onChange={(e) => updateField("residentName", e.target.value)}
            />
          </div>
          <button
            onClick={() => setStep(3)}
            className="w-full text-white py-2 rounded-lg mt-2"
            style={{ backgroundColor: BRAND.primary }}
          >
            Next
          </button>
          <button onClick={() => setStep(1)} className="w-full text-gray-400 mt-1 text-xs">
            Back
          </button>
        </motion.div>
      )}

      {/* STEP 3 — UTILITIES + IOT */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <h3 className="font-semibold text-lg">Utilities & IoT Devices</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-gray-400 text-xs">Electric Meter No.</label>
              <input
                className="w-full mt-1 rounded-lg px-3 py-2 bg-gray-900 border border-gray-700"
                placeholder="e.g. 20837182"
                value={form.electricityMeter}
                onChange={(e) => updateField("electricityMeter", e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs">Water Meter No.</label>
              <input
                className="w-full mt-1 rounded-lg px-3 py-2 bg-gray-900 border border-gray-700"
                placeholder="e.g. WM-99272"
                value={form.waterMeter}
                onChange={(e) => updateField("waterMeter", e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs">Internet ID</label>
              <input
                className="w-full mt-1 rounded-lg px-3 py-2 bg-gray-900 border border-gray-700"
                placeholder="Router #ID / Account ID"
                value={form.internetId}
                onChange={(e) => updateField("internetId", e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs">Gate Access Code</label>
              <input
                className="w-full mt-1 rounded-lg px-3 py-2 bg-gray-900 border border-gray-700"
                placeholder="Optional"
                value={form.gateCode}
                onChange={(e) => updateField("gateCode", e.target.value)}
              />
            </div>
          </div>

          {/* IOT LIST */}
          <div className="border border-gray-700 rounded-xl p-3 bg-gray-900">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">IoT Devices</span>
              <button onClick={addIoTDevice} className="text-xs" style={{ color: BRAND.primary }}>
                + Add
              </button>
            </div>
            {form.iotDevices.length === 0 && <div className="text-gray-500 text-xs">No IoT devices added.</div>}
            {form.iotDevices.map((d) => (
              <div key={d} className="flex justify-between items-center bg-gray-800 p-2 rounded-lg text-xs mt-2">
                {d}
                <button onClick={() => removeIoT(d)} className="text-red-400 hover:underline">
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-2 pt-4">
            <button
              onClick={handleSave}
              className="w-full text-white py-2 rounded-lg"
              style={{ backgroundColor: BRAND.primary }}
              disabled={loading} // NEW
            >
              {loading ? "Saving..." : "Save Home"} {/* NEW */}
            </button>
            <button onClick={handleShare} className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 rounded-lg">
              Share Details with Resident
            </button>
            <button onClick={() => setStep(2)} className="w-full text-gray-400 mt-1 text-xs">
              Back
            </button>
          </div>
        </motion.div>
      )}

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[200] px-6">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md text-center">
            <h2 className="text-white font-semibold text-lg">Home Created Successfully</h2>
            <p className="text-gray-400 text-xs mt-1">Below are the onboarding details.</p>
            <div className="mt-4 space-y-3 text-left">
              <div>
                <h4 className="text-gray-400 text-xs">Home Name</h4>
                <p className="text-white text-sm">{form.name}</p>
              </div>
              <div>
                <h4 className="text-gray-400 text-xs">Resident</h4>
                <p className="text-white text-sm">{form.residentName}</p>
              </div>
              <div>
                <h4 className="text-gray-400 text-xs">Email</h4>
                <p className="text-white text-sm">{form.residentEmail}</p>
              </div>
              <div>
                <h4 className="text-gray-400 text-xs">Onboarding Link</h4>
                <p className="text-white text-xs break-all">{onboardingLink}</p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">
              <button onClick={() => copyText(onboardingLink)} className="flex-1 py-2 rounded-lg text-white" style={{ backgroundColor: BRAND.primary }}>
                Copy
              </button>
              <button
                onClick={() => {
                  navigator.share &&
                    navigator.share({
                      title: "Resident Onboarding",
                      text: `Welcome to your estate dashboard.\n${onboardingLink}`,
                    });
                }}
                className="flex-1 py-2 rounded-lg bg-gray-700 text-gray-200"
              >
                Share
              </button>
            </div>
            <button onClick={() => setShowModal(false)} className="mt-4 text-gray-400 text-xs underline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
