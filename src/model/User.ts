import { Role } from "./Role";

export type User = {
  id: number;
  username: string;
  name?: string;
  role: Role;
};
