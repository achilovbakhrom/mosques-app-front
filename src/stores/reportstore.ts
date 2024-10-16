import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AxiosError } from "axios";
import { getNavigate } from "../utils/navigation";
import dayjs from "dayjs";
import {
  Report,
  ReportLeafNode,
  ReportNode,
  ReportType,
} from "../model/Report";
import ReportApi from "../api/report";

interface RecordState {
  start?: string;
  end?: string;
  data?: Report;
  loading: boolean;
  reportType: ReportType;

  hierarchicallyData?: ReportNode;
  handledData?: any;
  hierarchicalStart?: string;
  hierarchicalEnd?: string;
  hierarchicalReportType: ReportType;
  hierarchicalLoading: boolean;
  map: Map<string, ReportLeafNode>;

  getReport(placeId?: number): Promise<void>;
  getHierarchicallyReport(placeId?: number): Promise<void>;
  setDates(arg1: string, arg2: string): void;
  setReportType(arg: ReportType): void;
  setHierarchicalDates(arg1: string, arg2: string): void;
  setHierarchicalReportType(arg: ReportType): void;
  getDataForTable: (arg: string) => ReportLeafNode | undefined;
  transformData: (data: ReportNode, map: Map<string, ReportLeafNode>) => any;
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
    hierarchicallyData: undefined,
    hierarchicalStart: start.format(FORMATTER),
    hierarchicalEnd: end.format(FORMATTER),
    hierarchicalReportType: ReportType.Daily,
    hierarchicalLoading: false,
    map: new Map<string, ReportLeafNode>(),
    handledData: undefined,
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
    transformData: (data: ReportNode, map: Map<string, ReportLeafNode>) => {
      const processMasjid = (
        masjidData: any
      ): { income: number; expense: number } => {
        let income = 0;
        let expense = 0;
        masjidData.data.data.forEach((item: any) => {
          if (item[0] === "Жами") return;

          item.slice(1, item.length - 1).forEach((value: any) => {
            if (typeof value === "number") {
              if (value > 0) {
                income += value;
              } else {
                expense += value;
              }
            }
          });
        });

        return { income, expense };
      };

      const processNode = (node: any, title: any): any => {
        const children: any[] = [];
        let totalIncome = 0;
        let totalExpense = 0;

        Object.keys(node).forEach((key) => {
          const child = node[key];
          if ("data" in child) {
            const { income, expense } = processMasjid(child);
            map.set(key, child);
            totalIncome += income;
            totalExpense += expense;

            children.push({
              title: key,
              income,
              expense,
              difference: income + expense,
              children: [],
            });
          } else {
            const childNode = processNode(child as any, key);
            totalIncome += childNode.income;
            totalExpense += childNode.expense;
            children.push(childNode);
          }
        });

        return {
          title,
          income: totalIncome,
          expense: totalExpense,
          difference: totalIncome + totalExpense,
          children,
        };
      };

      const processTree = (tree: any): any => {
        const result: any = [];
        Object.keys(tree).forEach((key) => {
          result.push(processNode(tree[key], key));
        });
        return result;
      };

      return processTree(data);
    },
    getHierarchicallyReport: async (placeId) => {
      try {
        set({ hierarchicalLoading: true });
        const {
          hierarchicalStart: start,
          hierarchicalEnd: end,
          hierarchicalReportType: reportType,
        } = get();
        const result = await ReportApi.getReportHierchically(
          start ?? dayjs().subtract(1, "month").format(FORMATTER),
          end ?? dayjs().format(FORMATTER),
          reportType,
          placeId
        );
        const { map, transformData } = get();

        const handledData = transformData(result, map);

        set({ hierarchicallyData: result, handledData, map: map });
      } catch (e) {
        console.log("e", e);
        const error = e as AxiosError;
        if (error.response?.status === 403) {
          const navigate = getNavigate();
          navigate?.("/");
        }
      } finally {
        set({ hierarchicalLoading: false });
      }
    },
    setDates: (arg1: string, arg2: string) => {
      set({ start: arg1, end: arg2 });
    },
    setReportType: (arg: ReportType) => {
      set({ reportType: arg });
    },

    setHierarchicalDates: (arg1: string, arg2: string) => {
      set({ hierarchicalStart: arg1, hierarchicalEnd: arg2 });
    },
    setHierarchicalReportType: (arg: ReportType) => {
      set({ hierarchicalReportType: arg });
    },

    getDataForTable(arg: string) {
      const { map } = get();
      return map.get(arg);
    },
  }))
);

export default useReportStore;
