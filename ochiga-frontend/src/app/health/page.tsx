"use client";
import { useEffect, useState } from "react";
import { fetchHealth } from "@/lib/api";

export default function HealthPage() {
  const [status, setStatus] = useState("Checking...");
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    fetchHealth()
      .then((data) => {
        setStatus(`✅ Backend OK`);
        setDetails(data);
      })
      .catch(() => {
        setStatus("❌ Backend Unreachable");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>System Health</h1>
      <p>{status}</p>
      {details && (
        <pre
          style={{
            background: "#111",
            color: "#0f0",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          {JSON.stringify(details, null, 2)}
        </pre>
      )}
    </div>
  );
}
