"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import QrScanner from "../components/QrScanner";
import LoaderCircle from "../components/ui/LoaderCircle";

export default function OnboardPage() {
  const [loading, setLoading] = useState(false);
  const [instruction, setInstruction] = useState("Align your QR code within the frame to verify your home access.");
  const router = useRouter();

  const handleScan = async (data: string | null) => {
    if (!data) return;
    setLoading(true);
    setInstruction("Verifying your home access...");
    await new Promise((res) => setTimeout(res, 2000)); // simulate backend verify
    setInstruction("Access verified ✅");
    setTimeout(() => router.push("/auth/complete-setup"), 1200);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white overflow-hidden">
      <QrScanner onScan={handleScan} />
      <div className="absolute bottom-16 flex flex-col items-center">
        {loading && <LoaderCircle />}
        <p className="text-sm mt-3 text-gray-300">{instruction}</p>
      </div>
    </div>
  );
}
