import { Category } from "./Category";
import { Nillable } from "./nillable";
import { Place } from "./Place";
import { User } from "./User";

export type Record = {
  id: number;
  date: Nillable<string>;
  category: Category;
  amount: number;
  quantity: Nillable<number>;
  description: Nillable<string>;
  place: Nillable<Place>;
  created_by: Nillable<User>;
};
