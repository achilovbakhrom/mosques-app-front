import { PlaceType } from "./PlaceType";

export type Place = {
  id: number;
  name: string;
  inn?: string;
  parent?: Place;
  place_type: PlaceType;
};
