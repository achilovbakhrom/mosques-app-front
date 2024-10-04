export type Report = {
  periods: string[];
  data: (string | number)[][];
};

export enum ReportType {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}
