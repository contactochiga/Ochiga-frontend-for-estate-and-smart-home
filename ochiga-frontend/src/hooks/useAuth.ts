"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  username: string;
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ochiga_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Auth parse error", e);
    }
  }, []);

  return { user };
}
