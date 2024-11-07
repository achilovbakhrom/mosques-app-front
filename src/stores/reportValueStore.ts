import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AxiosError } from "axios";
import { getNavigate } from "../utils/navigation";
import dayjs from "dayjs";
import { ReportLeafNode, ReportType } from "../model/Report";
import ReportApi from "../api/report";
import { ReportValueData } from "../model/ReportValue";

interface ReportValueState {
  start?: string;
  end?: string;
  data?: ReportValueData[];
  loading: boolean;

  getReport(placeId?: number): Promise<void>;
  setDates(arg1: string, arg2: string): void;
}

const start = dayjs().subtract(1, "month");
const end = dayjs();

export const FORMATTER = "YYYY-MM-DD";

const useReportValueStore = create<ReportValueState>()(
  devtools((set, get) => ({
    start: start.format(FORMATTER),
    end: end.format(FORMATTER),
    loading: false,
    data: undefined,

    getReport: async (placeId) => {
      try {
        set({ loading: true });
        const { start, end } = get();
        const result = await ReportApi.getReportValue(
          start ?? dayjs().subtract(1, "month").format(FORMATTER),
          end ?? dayjs().format(FORMATTER),
          placeId
        );
        set({ data: result });
      } catch (e) {
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
  }))
);

export default useReportValueStore;
