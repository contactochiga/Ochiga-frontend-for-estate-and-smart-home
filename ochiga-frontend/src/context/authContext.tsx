// src/context/authContext.tsx
"use client";

import React, { createContext, useState, useEffect } from "react";
import { saveAuth, getAuth, clearAuth } from "../utils/authStorage";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = getAuth();
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    saveAuth(userData);
  };

  const logout = () => {
    setUser(null);
    clearAuth();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
