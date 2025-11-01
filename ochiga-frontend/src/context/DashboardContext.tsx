// ochiga-frontend/src/context/DashboardContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Types for different cards
interface Resident {
  name: string;
  estate: string;
  phase?: string;
  address: string;
}

interface Wallet {
  balance: number;
}

interface Utilities {
  internet: boolean;
  power: boolean;
  water: number; // e.g., tank level %
}

interface DeviceState {
  light: boolean;
  fan: boolean;
  ac?: boolean;
}

interface Devices {
  [room: string]: DeviceState;
}

interface Visitor {
  id: string;
  name: string;
  scheduledTime: string;
}

interface CommunityEvent {
  id: string;
  title: string;
  time: string;
}

// Dashboard context props
interface DashboardContextProps {
  notifications: string[];
  hasNewNotif: boolean;
  sidebarOpen: boolean;
  profileOpen: boolean;
  searchOpen: boolean;

  resident: Resident;
  wallet: Wallet;
  utilities: Utilities;
  devices: Devices;
  visitors: Visitor[];
  communityEvents: CommunityEvent[];

  addNotification: (msg: string) => void;
  markNotifRead: () => void;
  toggleSidebar: () => void;
  toggleProfile: () => void;
  toggleSearch: () => void;

  // AI actions
  updateWallet: (amount: number) => void;
  toggleDevice: (room: string, device: keyof DeviceState) => void;
  updateUtility: (key: keyof Utilities, value: any) => void;
  addVisitor: (visitor: Visitor) => void;
  removeVisitor: (visitorId: string) => void;
  addCommunityEvent: (event: CommunityEvent) => void;
  removeCommunityEvent: (eventId: string) => void;
  updateResident: (resident: Partial<Resident>) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [hasNewNotif, setHasNewNotif] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [resident, setResident] = useState<Resident>({
    name: "John Doe",
    estate: "Ochiga Estate",
    phase: "Phase 1",
    address: "12 Sunrise Avenue",
  });

  const [wallet, setWallet] = useState<Wallet>({ balance: 42300 });
  const [utilities, setUtilities] = useState<Utilities>({
    internet: true,
    power: true,
    water: 80,
  });

  const [devices, setDevices] = useState<Devices>({
    "Living Room": { light: false, fan: false, ac: false },
    Bedroom: { light: false, fan: false },
    Kitchen: { light: false },
  });

  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [communityEvents, setCommunityEvents] = useState<CommunityEvent[]>([]);

  // Notification actions
  const addNotification = (msg: string) => {
    setNotifications((prev) => [msg, ...prev]);
    setHasNewNotif(true);
  };
  const markNotifRead = () => setHasNewNotif(false);

  // UI toggles
  const toggleSidebar = () => setSidebarOpen((p) => !p);
  const toggleProfile = () => setProfileOpen((p) => !p);
  const toggleSearch = () => setSearchOpen((p) => !p);

  // AI actions
  const updateWallet = (amount: number) => {
    setWallet((prev) => ({ balance: prev.balance + amount }));
    addNotification(`Wallet updated: ₦${amount}`);
  };

  const toggleDevice = (room: string, device: keyof DeviceState) => {
    setDevices((prev) => ({
      ...prev,
      [room]: { ...prev[room], [device]: !prev[room][device] },
    }));
    addNotification(`Toggled ${device} in ${room}`);
  };

  const updateUtility = (key: keyof Utilities, value: any) => {
    setUtilities((prev) => ({ ...prev, [key]: value }));
    addNotification(`Updated ${key} to ${value}`);
  };

  const addVisitor = (visitor: Visitor) => {
    setVisitors((prev) => [...prev, visitor]);
    addNotification(`Added visitor ${visitor.name}`);
  };

  const removeVisitor = (visitorId: string) => {
    setVisitors((prev) => prev.filter((v) => v.id !== visitorId));
    addNotification(`Removed visitor ${visitorId}`);
  };

  const addCommunityEvent = (event: CommunityEvent) => {
    setCommunityEvents((prev) => [...prev, event]);
    addNotification(`Added community event ${event.title}`);
  };

  const removeCommunityEvent = (eventId: string) => {
    setCommunityEvents((prev) => prev.filter((e) => e.id !== eventId));
    addNotification(`Removed community event ${eventId}`);
  };

  const updateResident = (updates: Partial<Resident>) => {
    setResident((prev) => ({ ...prev, ...updates }));
    addNotification(`Resident info updated`);
  };

  return (
    <DashboardContext.Provider
      value={{
        notifications,
        hasNewNotif,
        sidebarOpen,
        profileOpen,
        searchOpen,
        resident,
        wallet,
        utilities,
        devices,
        visitors,
        communityEvents,
        addNotification,
        markNotifRead,
        toggleSidebar,
        toggleProfile,
        toggleSearch,
        updateWallet,
        toggleDevice,
        updateUtility,
        addVisitor,
        removeVisitor,
        addCommunityEvent,
        removeCommunityEvent,
        updateResident,
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
