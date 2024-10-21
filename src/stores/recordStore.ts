import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AxiosError } from "axios";
import { getNavigate } from "../utils/navigation";
import { Record } from "../model/Record";
import RecordApi from "../api/record";

interface RecordState {
  data?: Record[];
  loading: boolean;
  page: number;
  size: number;
  total: number;
  totalSum: number;

  getRecords(page: number, pageSize: number, placeId?: number): Promise<void>;
  setPagination: (page: number, size: number) => void;
  createRecord(arg: Partial<Record>, callback: Function): Promise<void>;
  getTotalSum(placeId: number): Promise<void>;
}

const useRecordStore = create<RecordState>()(
  devtools((set, get) => ({
    data: undefined,
    loading: false,
    page: 1,
    size: 20,
    total: 0,
    totalSum: 0,
    getRecords: async (page, pageSize, placeId) => {
      try {
        set({ loading: true });
        const result = await RecordApi.getRecords(page, pageSize, placeId);
        set({ data: result.results ?? [], total: result.count ?? 0 });
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
    setPagination: (page, size) => {
      set({ page, size });
    },
    createRecord: async (record, cb) => {
      try {
        const { page, size } = get();
        set({ loading: true });
        await RecordApi.createRecord(record);
        const result = await RecordApi.getRecords(page, size, record.place?.id);
        set({ data: result.results ?? [], total: result.count ?? 0 });
        cb();
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
    getTotalSum: async (placeId: number) => {
      try {
        const result = await RecordApi.getTotalSum(placeId);
        set({ totalSum: result.total ?? 0 });
      } catch (e) {
        console.log("eee", e);
        set({ totalSum: 0 });
      }
    },
  }))
);

export default useRecordStore;
