// context/authContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { saveAuth, getAuth, clearAuth } from "../utils/authStorage";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<{ token: string | null; role: string | null }>({
    token: null,
    role: null,
  });

  useEffect(() => {
    const stored = getAuth();
    if (stored.token) setUser(stored);
  }, []);

  const login = (token: string, role: string) => {
    saveAuth(token, role);
    setUser({ token, role });
  };

  const logout = () => {
    clearAuth();
    setUser({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
