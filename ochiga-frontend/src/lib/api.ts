// src/lib/api.ts
const API_URL = "http://localhost:3000"; // your NestJS backend base URL

export async function apiRequest(endpoint: string, method: string, body?: any) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Request failed");
  }

  return res.json();
}
