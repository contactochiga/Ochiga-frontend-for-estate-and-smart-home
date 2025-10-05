"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  role: "resident" | "manager" | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerResident: (inviteToken: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"resident" | "manager" | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Restore saved session
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role") as "resident" | "manager" | null;
    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole);
    }
    setLoading(false);
  }, []);

  // ✅ Login function
  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        setToken(data.token);
        setRole(data.role);
        return true;
      } else {
        console.error("Login failed:", data.message);
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // ✅ Registration via invite link
  const registerResident = async (inviteToken: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:3000/auth/register-resident", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteToken, password }),
      });

      const data = await res.json();
      return res.ok && data.success;
    } catch (err) {
      console.error("Registration error:", err);
      return false;
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, loading, loginUser, registerResident, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
