import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AxiosError } from "axios";
import { getNavigate } from "../utils/navigation";
import dayjs from "dayjs";
import { Report, ReportType } from "../model/Report";
import ReportApi from "../api/report";

interface RecordState {
  start?: string;
  end?: string;
  data?: Report;
  loading: boolean;
  reportType: ReportType;

  getReport(placeId?: number): Promise<void>;
  setDates(arg1: string, arg2: string): void;
  setReportType(arg: ReportType): void;
}

const start = dayjs().subtract(1, "month");
const end = dayjs();

export const FORMATTER = "YYYY-MM-DD";

const useReportStore = create<RecordState>()(
  devtools((set, get) => ({
    start: start.format(FORMATTER),
    end: end.format(FORMATTER),
    loading: false,
    data: undefined,
    reportType: ReportType.Daily,
    getReport: async (placeId) => {
      try {
        set({ loading: true });
        const { start, end, reportType } = get();
        const result = await ReportApi.getReport(
          start ?? dayjs().subtract(1, "month").format(FORMATTER),
          end ?? dayjs().format(FORMATTER),
          reportType,
          placeId
        );
        set({ data: result });
      } catch (e) {
        console.log("e", e);
        const error = e as AxiosError;
        if (error.response?.status === 403) {
          const navigate = getNavigate();
          navigate?.("/");
        }
      } finally {
        set({ loading: false });
      }
    },
    setDates: (arg1: string, arg2: string) => {
      set({ start: arg1, end: arg2 });
    },
    setReportType: (arg: ReportType) => {
      set({ reportType: arg });
    },
  }))
);

export default useReportStore;
