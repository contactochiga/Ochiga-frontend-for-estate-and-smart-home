export interface User {
  id: string;
  name: string;
  email: string;
  role: "manager" | "resident";
  estateId: string;
  token?: string;
}
