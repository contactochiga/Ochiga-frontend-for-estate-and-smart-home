// src/context/authContext.tsx
"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { saveAuth, getAuth, clearAuth } from "../utils/authStorage";

// Define types (you can expand later with id, role, etc.)
type User = {
  username: string;
  role: "resident" | "manager";
};

type AuthContextType = {
  user: User | null;
  loginUser: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = getAuth();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Mock login (replace with API/Firebase later)
  const loginUser = async (username: string, password: string) => {
    if (username === "resident1" && password === "1234") {
      const userData = { username, role: "resident" as const };
      setUser(userData);
      saveAuth(userData);
      return true;
    }
    if (username === "manager1" && password === "1234") {
      const userData = { username, role: "manager" as const };
      setUser(userData);
      saveAuth(userData);
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setUser(null);
    clearAuth();
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook must be exported
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
