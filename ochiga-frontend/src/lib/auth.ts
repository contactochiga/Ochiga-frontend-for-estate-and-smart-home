// src/lib/auth.ts
export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("ochiga_token", token);
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("ochiga_token");
  }
  return null;
}

export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ochiga_token");
  }
}
