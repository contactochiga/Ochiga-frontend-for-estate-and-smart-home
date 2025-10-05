"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  role: "resident" | "manager" | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  registerUser: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"resident" | "manager" | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    // mock login logic
    if (email === "manager@ochiga.com" && password === "12345") {
      setToken("mockToken");
      setRole("manager");
      return true;
    } else if (email === "resident@ochiga.com" && password === "12345") {
      setToken("mockToken");
      setRole("resident");
      return true;
    }
    return false;
  };

  const registerUser = async (name: string, email: string, password: string) => {
    console.log("Registering:", name, email);
    // Add your backend integration here
    return true;
  };

  const logout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, loading, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
