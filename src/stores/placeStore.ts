import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Place } from "../model/Place";
import PlaceApi from "../api/place";
import { AxiosError } from "axios";
import { getNavigate } from "../utils/navigation";

interface PlaceState {
  data?: Place[];
  currentPlace?: Place;
  currentPlaceLoading?: boolean;
  loading: boolean;
  page: number;
  size: number;
  total: number;

  getCurrentPlace(id: number): Promise<void>;
  getPlaces(page: number, pageSize: number, parentId?: number): Promise<void>;
  setPagination: (page: number, size: number) => void;
}

const usePlaceStore = create<PlaceState>()(
  devtools((set) => ({
    data: undefined,
    loading: false,
    page: 1,
    size: 20,
    total: 0,
    getCurrentPlace: async (id: number) => {
      try {
        set({ currentPlaceLoading: true });
        const result = await PlaceApi.getCurrentPlace(id);
        set({ currentPlace: result });
      } catch (e) {
        const error = e as AxiosError;
        if (error.response?.status === 403) {
          const navigate = getNavigate();
          navigate?.("/");
        }
      } finally {
        set({ currentPlaceLoading: false });
      }
    },
    getPlaces: async (page, pageSize, placeId) => {
      try {
        set({ loading: true });
        const result = await PlaceApi.getPlaces(page, pageSize, placeId);
        set({ data: result.results ?? [], total: result.count ?? 0 });
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
    setPagination: (page, size) => {
      set({ page, size });
    },
  }))
);

export default usePlaceStore;
