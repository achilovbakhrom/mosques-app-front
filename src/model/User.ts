import { Place } from "./Place";
import { Role } from "./Role";

export type User = {
  id: number;
  username: string;
  position?: { id: number; name: string };
  name?: string;
  role: Role;
  place?: Place;
  objective_file?: string;
};
