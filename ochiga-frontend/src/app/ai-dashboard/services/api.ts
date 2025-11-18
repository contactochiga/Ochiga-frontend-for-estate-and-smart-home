// src/app/ai-dashboard/services/api.ts
const CODESPACE_BASE =
  "https://redesigned-couscous-r4vw799749w7hx4rr-4000.app.github.dev"; // <- your Codespace public URL
export const API_BASE = `${CODESPACE_BASE.replace(/\/$/, "")}/api`; // plugin: /api

type RequestInitWithJson = RequestInit & { body?: any };

function getToken() {
  try {
    return typeof window !== "undefined" ? localStorage.getItem("ochiga_token") : null;
  } catch {
    return null;
  }
}

export async function apiRequest(path: string, options: RequestInitWithJson = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "include",
  });

  const text = await res.text().catch(() => "");
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { text };
  }

  if (!res.ok) {
    // Normalize error shape
    const message = data?.error || data?.message || text || `HTTP ${res.status}`;
    throw new Error(message);
  }

  return data;
}
