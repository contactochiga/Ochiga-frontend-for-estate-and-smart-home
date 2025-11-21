// src/services/deviceService.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
 * 1. DISCOVER DEVICES (SSDP + MQTT from backend)
 * -------------------------------------------------- */
export async function discoverDevices() {
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
    return { devices: data.devices };
  } catch (err: any) {
    return { error: err.message };
  }
}

/* --------------------------------------------------
 * 2. GET DEVICES (Estate or Resident)
 * -------------------------------------------------- */
export async function getDevices(estateId?: string) {
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
 * 3. CREATE DEVICE (Estate Only)
 * -------------------------------------------------- */
export async function createDevice(body: {
  estate_id: string;
  name: string;
  type: string;
  metadata?: any;
}) {
  try {
    const res = await fetch(`${BASE_URL}/devices`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return { error: error?.message || "Failed to create device" };
    }

    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}

/* --------------------------------------------------
 * 4. TRIGGER DEVICE ACTION
 * -------------------------------------------------- */
export async function triggerDeviceAction(
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
