"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  role: "resident" | "manager";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerResident: (inviteToken: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: false,
  loginUser: async () => false,
  logout: () => {},
  registerResident: async () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate persistent login (e.g., from localStorage)
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      // Replace with your real backend endpoint
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        const loggedUser = { email, role: data.role || "resident" } as User;
        setUser(loggedUser);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", data.token);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const registerResident = async (inviteToken: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3000/auth/register-resident", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteToken, password }),
      });

      const data = await res.json();
      return data.success || false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginUser, logout, registerResident }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
