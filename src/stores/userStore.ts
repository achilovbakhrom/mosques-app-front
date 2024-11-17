import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { User } from "../model/User";
import AuthApi from "../api/auth";

interface UserState {
  loading: boolean;
  user?: User;

  getCurrentUser(): Promise<void>;
  reset: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    devtools(
      (set) => ({
        loading: true,
        user: undefined,
        getCurrentUser: async () => {
          set({ loading: true });
          try {
            const user = await AuthApi.fetchCurrentUser();
            set({ user });
          } catch (e) {
            console.log("eee", e);
            set({ user: undefined });
          } finally {
            set({ loading: false });
          }
        },
        reset: () => {
          set({ user: undefined, loading: true });
        },
      }),
      { name: "UserStore" }
    ),
    {
      name: "UserStore",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useUserStore;
