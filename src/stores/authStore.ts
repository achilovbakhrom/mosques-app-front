import { create } from "zustand";
import { Token } from "../model/Token";
import { Login } from "../model/Login";
import { devtools, persist } from "zustand/middleware";
import AuthApi from "../api/auth";
import useUserStore from "./userStore";
import { getNavigate } from "../utils/navigation";

interface AuthState {
  loading: boolean;
  token?: Token;
  error?: string;

  isAutheticated(): boolean;
  login(arg: Login): Promise<void>;
  logout(): Promise<void>;
  setAccess: (arg: string) => void;
  clearTokenAndLogout: () => void;
}

const ERROR_MSG = "Тизимга киришда хатолик юз берди!";

const useAuthStore = create<AuthState>()(
  persist(
    devtools(
      (set, get) => ({
        error: undefined,
        loading: false,
        token: undefined,
        login: async (arg) => {
          set({ loading: true, error: undefined });
          try {
            const token = await AuthApi.login(arg);
            set({ token });
            setTimeout(() => {
              const navigate = getNavigate();
              navigate?.("/app");
            }, 500);
          } catch (e) {
            set({ error: ERROR_MSG });
          } finally {
            set({ loading: false });
          }
        },
        logout: async () => {
          set({ loading: true, error: undefined });
          try {
            await AuthApi.logout();
            set({ token: undefined });
            useUserStore.getState().reset();
            const navigate = getNavigate();
            navigate?.("/auth");
          } catch (e) {
            set({ error: ERROR_MSG });
          } finally {
            set({ loading: false });
          }
        },
        isAutheticated: () => {
          const { token } = get();
          return !!token && !!token.access && !!token.refresh;
        },
        setAccess: (arg) => {
          const { token } = get();
          if (token) {
            set({ token: { refresh: token.refresh, access: arg } });
          }
        },
        clearTokenAndLogout: () => {
          set({ token: undefined });
          const navigate = getNavigate();
          navigate && navigate("/auth");
        },
      }),
      { name: "AuthStore" }
    ),
    {
      name: "AuthStore",
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;
