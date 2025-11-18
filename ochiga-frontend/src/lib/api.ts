export const API_BASE_URL = "http://localhost:3000"; 
// When deployed, replace with your server URL.

export async function apiRequest(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("ochiga_token") : null;

  const headers: any = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
