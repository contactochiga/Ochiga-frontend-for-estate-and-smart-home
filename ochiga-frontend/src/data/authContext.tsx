// src/data/authContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "./types";
import { login } from "./api";

interface AuthContextProps {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function loginUser(email: string, password: string) {
    try {
      const response = await login(email, password);
      setUser({ ...response.user, token: response.token });
      localStorage.setItem("authToken", response.token);
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  }

  function logoutUser() {
    setUser(null);
    localStorage.removeItem("authToken");
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
