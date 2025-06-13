import axios from "axios";
import { useAuthStore } from "../../features";

export const getAxiosInstance = () => {
  const api = axios.create({
    baseURL: "http://localhost:4200",
  });

  api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};
