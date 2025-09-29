// src/data/authContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  role: "resident" | "manager";
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  loginUser: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  async function loginUser(username: string, password: string) {
    const mockUsers = [
      { username: "resident1", password: "1234", role: "resident" },
      { username: "manager1", password: "1234", role: "manager" },
    ];

    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const fakeToken = "mock-token-12345";
      const userData: User = { username: foundUser.username, role: foundUser.role };

      setUser(userData);
      setToken(fakeToken);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", fakeToken);

      return true;
    }

    alert("Invalid username or password");
    return false;
  }

  function logoutUser() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
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
