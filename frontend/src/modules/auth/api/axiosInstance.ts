
import axios from "axios";
import {
  clearAccessToken,
  getStoredAccessToken,
  storeAccessToken,
} from "./tokenStorage";
import type { RetryAxiosRequestConfig } from "../types/auth.types";

const baseURL = import.meta.env.VITE_API_BASE_URL;

type PortalType = "admin" | "employee";

const createAxiosInstance = (
  portal: PortalType,
  refreshUrl: string,
  loginPath: string,
) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  // Attach the correct portal's access token
  instance.interceptors.request.use(
    (config) => {
      const token = getStoredAccessToken(portal);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  // Refresh expired access token
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest =
        error.config as RetryAxiosRequestConfig | undefined;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const hasAuthorization =
        Boolean(originalRequest.headers?.Authorization);

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        hasAuthorization
      ) {
        originalRequest._retry = true;

        try {
          // Use plain axios to avoid triggering this interceptor again
          const refreshResponse = await axios.post(
            refreshUrl,
            {},
            {
              baseURL,
              withCredentials: true,
            },
          );

          const newAccessToken =
            refreshResponse.data.data.accessToken;

          storeAccessToken(newAccessToken, portal);

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return instance(originalRequest);
        } catch (refreshError) {
          clearAccessToken(portal);
          window.location.href = loginPath;

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const axiosInstance = createAxiosInstance(
  "admin",
  "/auth/admin/refresh",
  "/login",
);

export const employeeAxiosInstance = createAxiosInstance(
  "employee",
  "/auth/employee/refresh",
  "/employee-login",
);

export default axiosInstance;
