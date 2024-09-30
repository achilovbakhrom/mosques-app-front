import axios from "axios";
import useAuthStore from "../stores/authStore";
import AuthApi from "./auth";

const instance = axios.create({ baseURL: "http://localhost:8000/api" });

instance.interceptors.request.use(
  (config) => {
    const store = useAuthStore.getState();
    const token = store.token?.access;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const store = useAuthStore.getState();

    // Assuming you have a refresh token stored in local storage or state
    const refreshToken = store.token?.refresh;
    if (refreshToken) {
      const response = await AuthApi.refreshLogin(refreshToken);
      useAuthStore.getState().setAccess(response.access);
      return response.access;
    }
  } catch (error) {
    useAuthStore.getState().clearTokenAndLogout();
    // eslint-disable-next-line no-restricted-globals
    location.href = "/auth";
  }
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.config &&
      error.config.url !== "/user/login/refresh/" &&
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await new Promise((res) => setTimeout(res, 500));
        const newAccessToken = await refreshToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (tokenRefreshError) {
        return Promise.reject(tokenRefreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
