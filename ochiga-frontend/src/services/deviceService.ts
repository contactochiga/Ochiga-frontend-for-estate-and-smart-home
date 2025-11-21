// src/services/deviceService.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://laughing-system-97g5rrr74vv6cx6rg-5000.app.github.dev";

/** Shared Headers */
function authHeaders() {
  if (typeof window === "undefined") return { "Content-Type": "application/json" };

  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

/* --------------------------------------------------
 * DISCOVER LIVE DEVICES
 * GET /devices/discover
 * -------------------------------------------------- */
async function discoverDevices() {
  try {
    const res = await fetch(`${BASE_URL}/devices/discover`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("Unauthorized: Please login again");
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Failed to discover devices");
    }

    const data = await res.json();
    return { devices: data.devices || [] };
  } catch (err: any) {
    return { error: err.message || "Discover devices failed" };
  }
}

/* --------------------------------------------------
 * GET ESTATE DEVICES
 * GET /devices?estateId=
 * -------------------------------------------------- */
async function getDevices(estateId?: string) {
  try {
    const query = estateId ? `?estateId=${estateId}` : "";
    const res = await fetch(`${BASE_URL}/devices${query}`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("Unauthorized: Please login again");
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Failed to load devices");
    }

    const data = await res.json();
    return { devices: data.devices || [] };
  } catch (err: any) {
    return { error: err.message || "Get devices failed" };
  }
}

/* --------------------------------------------------
 * TRIGGER DEVICE ACTION
 * POST /devices/:id/action
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
      if (res.status === 401) throw new Error("Unauthorized: Please login again");
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Failed to trigger device action");
    }

    return await res.json();
  } catch (err: any) {
    return { error: err.message || "Trigger device action failed" };
  }
}

/* --------------------------------------------------
 * EXPORT DEVICE SERVICE
 * -------------------------------------------------- */
export const deviceService = {
  discoverDevices,
  getDevices,
  triggerDeviceAction,
};
