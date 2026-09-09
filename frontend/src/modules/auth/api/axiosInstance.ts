import axios from "axios";
import {
  clearAccessToken,
  getStoredAccessToken,
  storeAccessToken,
} from "./tokenStorage";
import type { RetryAxiosRequestConfig } from "../types/auth.types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getStoredAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;
      try {
        console.log("Acccesstocken expired");
        const response = await axiosInstance.post("/auth/refresh");

        const newAccessToken = response.data.data.accessToken;
        storeAccessToken(newAccessToken);
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        console.log("New access token:", newAccessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
