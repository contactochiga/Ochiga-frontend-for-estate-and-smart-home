// src/lib/auth.ts
"use client";

import Cookies from "js-cookie";

export function saveToken(token: string, role: "resident" | "manager") {
  // ✅ HttpOnly cookies would be best from backend
  Cookies.set("token", token, { expires: 1, sameSite: "strict" });
  Cookies.set("role", role, { expires: 1, sameSite: "strict" });

  // ✅ localStorage for quick client access
  localStorage.setItem("ochiga_role", role);
}

export function getToken(): string | null {
  return Cookies.get("token") || null;
}

export function getRole(): string | null {
  return Cookies.get("role") || localStorage.getItem("ochiga_role");
}

export function clearToken() {
  Cookies.remove("token");
  Cookies.remove("role");
  localStorage.removeItem("ochiga_role");
}
