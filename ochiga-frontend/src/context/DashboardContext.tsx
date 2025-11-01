// ochiga-frontend/src/context/DashboardContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextProps {
  notifications: string[];
  hasNewNotif: boolean;
  sidebarOpen: boolean;
  profileOpen: boolean;
  searchOpen: boolean;
  addNotification: (msg: string) => void;
  markNotifRead: () => void;
  toggleSidebar: () => void;
  toggleProfile: () => void;
  toggleSearch: () => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [hasNewNotif, setHasNewNotif] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const addNotification = (msg: string) => {
    setNotifications((prev) => [msg, ...prev]);
    setHasNewNotif(true);
  };

  const markNotifRead = () => setHasNewNotif(false);
  const toggleSidebar = () => setSidebarOpen((p) => !p);
  const toggleProfile = () => setProfileOpen((p) => !p);
  const toggleSearch = () => setSearchOpen((p) => !p);

  return (
    <DashboardContext.Provider
      value={{
        notifications,
        hasNewNotif,
        sidebarOpen,
        profileOpen,
        searchOpen,
        addNotification,
        markNotifRead,
        toggleSidebar,
        toggleProfile,
        toggleSearch,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardProvider");
  return context;
};
