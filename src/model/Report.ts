export type Report = {
  periods: string[];
  data: Array<[string, ...number[]]>;
};

export type ReportLeafNode = {
  data: Report;
};

export type ReportNode = {
  [placeName: string]: ReportNode | ReportLeafNode;
};
export enum ReportType {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}
