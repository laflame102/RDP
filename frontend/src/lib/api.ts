import { AuthResponse, LoginData, RegisterData, User } from "@/types/auth";

import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

interface QueueItem {
  resolve: (value: AxiosResponse) => void;
  reject: (error: AxiosError) => void;
}

let isRefreshing: boolean = false;
let failedQueue: QueueItem[] = [];

const processQueue = (
  error: AxiosError | null,
  response: AxiosResponse | null = null
): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (response) {
      resolve(response);
    }
  });

  failedQueue = [];
};

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !originalRequest.url?.includes("/auth/login")
    ) {
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err: AxiosError) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await api.post("/auth/refresh");

        processQueue(null, refreshResponse);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);

        console.error("Refresh token failed, user needs to login again");

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: RegisterData): Promise<AuthResponse> =>
    api.post("/auth/register", data).then((res) => res.data),

  login: (data: LoginData): Promise<AuthResponse> =>
    api.post("/auth/login", data).then((res) => res.data),

  logout: (): Promise<void> => api.post("/auth/logout").then((res) => res.data),

  getProfile: (): Promise<User> =>
    api.get("/auth/profile").then((res) => res.data),

  refreshTokens: (): Promise<void> =>
    api.post("/auth/refresh").then((res) => res.data),
};
