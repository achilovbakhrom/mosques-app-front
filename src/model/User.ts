import { Place } from "./Place";
import { Role } from "./Role";

export type User = {
  id: number;
  username: string;
  name?: string;
  role: Role;
  place?: Place;
};
