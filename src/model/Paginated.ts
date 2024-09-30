export type Paginated<T> = {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: Array<T> | null;
};
