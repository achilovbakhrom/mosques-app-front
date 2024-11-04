export type Place = {
  id: number;
  name: string;
  inn?: string;
  parent?: Place;
  is_mosque?: boolean;
  employee_count?: number;
};
