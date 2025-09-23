// src/lib/auth.ts
"use client";

import Cookies from "js-cookie";

// Save token (in cookies + localStorage)
export function saveToken(token: string, role?: "resident" | "manager") {
  if (typeof window !== "undefined") {
    // ✅ Store in cookies (readable by middleware)
    Cookies.set("token", token, { expires: 1 }); // 1 day expiry
    if (role) Cookies.set("role", role, { expires: 1 });

    // ✅ Store in localStorage (for client-side hooks)
    localStorage.setItem("ochiga_token", token);
    if (role) localStorage.setItem("ochiga_role", role);
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return Cookies.get("token") || localStorage.getItem("ochiga_token");
  }
  return null;
}

export function clearToken() {
  if (typeof window !== "undefined") {
    Cookies.remove("token");
    Cookies.remove("role");
    localStorage.removeItem("ochiga_token");
    localStorage.removeItem("ochiga_role");
  }
}
