"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  role: "resident" | "manager" | null;
  login: (token: string, role: "resident" | "manager") => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"resident" | "manager" | null>(null);

  const login = (newToken: string, newRole: "resident" | "manager") => {
    setToken(newToken);
    setRole(newRole);
    // optional: save in localStorage
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
