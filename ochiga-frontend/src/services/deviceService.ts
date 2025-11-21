// src/services/deviceService.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://laughing-system-97g5rrr74vv6cx6rg-5000.app.github.dev";

/** --------------------------------------------------
 * AUTH HEADERS
 -------------------------------------------------- */
function authHeaders() {
  if (typeof window === "undefined")
    return { "Content-Type": "application/json" };

  const token = localStorage.getItem("ochiga_token"); // ✅ Correct token key

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/** --------------------------------------------------
 * DISCOVER LIVE DEVICES
 * GET /devices/discover?estateId=
 -------------------------------------------------- */
async function discoverDevices(estateId: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/devices/discover?estateId=${estateId}`,
      {
        method: "GET",
        headers: authHeaders(),
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      const message =
        err?.error || err?.message || `Scan failed (${res.status})`;

      throw new Error(message);
    }

    const data = await res.json();
    return { devices: data.devices || [] };
  } catch (err: any) {
    console.error("❌ Device Discovery Error:", err.message);
    return { error: err.message || "Discover devices failed" };
  }
}

/** --------------------------------------------------
 * GET ALL ESTATE DEVICES
 * Backend returns: ARRAY, not { devices: [] }
 -------------------------------------------------- */
async function getDevices(estateId?: string) {
  try {
    const query = estateId ? `?estateId=${estateId}` : "";

    const res = await fetch(`${BASE_URL}/devices${query}`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.error || err?.message || "Failed to load devices");
    }

    const data = await res.json();
    return { devices: data || [] };
  } catch (err: any) {
    console.error("❌ Get Devices Error:", err.message);
    return { error: err.message || "Get devices failed" };
  }
}

/** --------------------------------------------------
 * TRIGGER A DEVICE ACTION
 -------------------------------------------------- */
async function triggerDeviceAction(deviceId: string, action: string, params: any = {}) {
  try {
    const res = await fetch(`${BASE_URL}/devices/${deviceId}/action`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ action, params }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      const message =
        err?.error || err?.message || `Action failed (${res.status})`;

      throw new Error(message);
    }

    return await res.json();
  } catch (err: any) {
    console.error("❌ Trigger Action Error:", err.message);
    return { error: err.message || "Trigger device action failed" };
  }
}

/** --------------------------------------------------
 * EXPORT SERVICE
 -------------------------------------------------- */
export const deviceService = {
  discoverDevices,
  getDevices,
  triggerDeviceAction,
};
