"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { saveToken, clearToken, getToken } from "../lib/auth";
import { loginApi, registerResidentApi } from "../services/authApi";

type Role = "resident" | "manager";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: Role | null;
  login: (email: string, password: string) => Promise<boolean>;
  registerResident: (inviteToken: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    const storedRole = localStorage.getItem("role") as Role | null;

    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await loginApi(email, password);
      saveToken(token, user.role);
      setToken(token);
      setUser(user);
      setRole(user.role);
      return true;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  const registerResident = async (inviteToken: string, password: string) => {
    try {
      const { success } = await registerResidentApi(inviteToken, password);
      return success;
    } catch (err) {
      console.error("Registration failed", err);
      return false;
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, role, login, registerResident, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
