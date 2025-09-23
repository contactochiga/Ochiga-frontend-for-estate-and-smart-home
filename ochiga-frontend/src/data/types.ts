// src/data/types.ts

export type UserRole = "admin" | "resident" | "manager";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  token?: string; // JWT token
}

export interface Estate {
  id: number;
  name: string;
  location: string;
  description?: string;
  active: boolean;
}

export interface Home {
  id: number;
  name: string;
  estateId: number;
}

export interface Room {
  id: number;
  name: string;
  homeId: number;
}
