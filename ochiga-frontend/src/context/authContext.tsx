// src/context/authContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  role: "resident" | "manager" | null;
  login: (token: string, role: "resident" | "manager") => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"resident" | "manager" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role") as "resident" | "manager" | null;
    if (savedToken) setToken(savedToken);
    if (savedRole) setRole(savedRole);
    setLoading(false);
  }, []);

  const login = (newToken: string, newRole: "resident" | "manager") => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
