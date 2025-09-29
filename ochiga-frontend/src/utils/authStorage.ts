// utils/authStorage.ts
export const saveAuth = (token: string, role: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const getAuth = () => {
  return {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  };
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
