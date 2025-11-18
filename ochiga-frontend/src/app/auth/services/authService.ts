const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export const authService = {
  async signup(payload: { email: string; username: string; password: string; role?: string; estateId?: string }) {
    const res = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json(); // returns { user, token }
  },

  async login(payload: { usernameOrEmail: string; password: string }) {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json(); // returns { user, token }
  }
};
