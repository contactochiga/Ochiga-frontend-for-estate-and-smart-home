// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  body?: any,
  token?: string
) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store", // avoid stale data in Next.js
    });

    if (!res.ok) {
      let errorMsg = `Request failed with status ${res.status}`;
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch {
        // fallback: not JSON
      }
      throw new Error(errorMsg);
    }

    return res.json();
  } catch (err: any) {
    throw new Error(err.message || "Network error");
  }
}
