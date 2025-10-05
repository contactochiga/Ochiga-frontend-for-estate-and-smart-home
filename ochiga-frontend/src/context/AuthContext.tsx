"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, registerManager, inviteResident } from "../data/api";
import { User } from "../data/types";

interface RegisterManagerPayload {
  estateName: string;
  managerName: string;
  managerEmail: string;
  password: string;
}

interface InviteResidentPayload {
  estateId: string;
  houseId: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerManager: (data: RegisterManagerPayload) => Promise<void>;
  inviteResident: (data: InviteResidentPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const loginUser = async (email: string, password: string) => {
    const res = await login(email, password);
    if (res && res.token) {
      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      router.push("/dashboard");
    }
  };

  const registerManager = async (data: RegisterManagerPayload) => {
    const res = await registerManager(data);
    if (res) {
      alert("Estate and Manager registered successfully!");
      router.push("/auth");
    }
  };

  const inviteResident = async (data: InviteResidentPayload) => {
    const res = await inviteResident(data);
    if (res && res.inviteLink) {
      alert(`Invitation sent! Activation link: ${res.inviteLink}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, registerManager, inviteResident, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
