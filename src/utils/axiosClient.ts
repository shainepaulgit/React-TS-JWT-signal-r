import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { getAuthToken, setAuthToken } from "./authStorage";

let logoutCallback: (() => void) | null = null;
 export const setLogoutHandler = (callback: () => void) => {
   logoutCallback = callback;
 };

// Extend AxiosRequestConfig with optional _retry
interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosClient = axios.create({
  timeout: 100000,
  withCredentials: true,
});

// Request interceptor
axiosClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor with proper typing
axiosClient.interceptors.response.use(
  
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry | undefined;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post("/api/authentication/refresh", {}, { withCredentials: true });
        const newToken = res.data.accessToken;
        if (newToken) {
          setAuthToken(newToken);
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch {
        logoutCallback?.();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;