// src/services/deviceService.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://laughing-system-97g5rrr74vv6cx6rg-5000.app.github.dev";

/** Shared Headers */
function authHeaders() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

/* --------------------------------------------------
 * DISCOVER LIVE DEVICES (calls backend /devices/discover)
 * -------------------------------------------------- */
async function discoverDevices() {
  try {
    const res = await fetch(`${BASE_URL}/devices/discover`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return { error: error?.message || "Failed to discover devices" };
    }

    const data = await res.json();
    return { devices: data.devices || [] };
  } catch (err: any) {
    return { error: err.message };
  }
}

/* --------------------------------------------------
 * GET ESTATE DEVICES (from DB)
 * -------------------------------------------------- */
async function getDevices(estateId?: string) {
  try {
    const query = estateId ? `?estateId=${estateId}` : "";
    const res = await fetch(`${BASE_URL}/devices${query}`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return { error: error?.message || "Failed to load devices" };
    }

    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}

/* --------------------------------------------------
 * TRIGGER DEVICE ACTION (toggle on/off)
 * -------------------------------------------------- */
async function triggerDeviceAction(
  deviceId: string,
  action: string,
  params: any = {}
) {
  try {
    const res = await fetch(`${BASE_URL}/devices/${deviceId}/action`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ action, params }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return { error: error?.message || "Failed to trigger device action" };
    }

    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}

/* --------------------------------------------------
 * EXPORT SINGLE DEVICE SERVICE OBJECT
 * -------------------------------------------------- */
export const deviceService = {
  discoverDevices,
  getDevices,
  triggerDeviceAction,
};
