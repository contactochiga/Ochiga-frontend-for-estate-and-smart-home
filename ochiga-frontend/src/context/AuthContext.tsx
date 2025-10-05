"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id?: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerResident: (inviteToken: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 🔹 Login function
  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error("Login failed:", data.message);
        return false;
      }

      setUser(data.user || { email });
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // 🔹 Register resident function
  const registerResident = async (
    inviteToken: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:3000/auth/register-resident", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteToken, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error("Registration failed:", data.message);
        return false;
      }

      setUser(data.user || {});
      return true;
    } catch (err) {
      console.error("Registration error:", err);
      return false;
    }
  };

  // 🔹 Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerResident, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
