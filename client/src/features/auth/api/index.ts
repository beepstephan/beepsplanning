import { getAxiosInstance } from "../../../shared/api";

const api = getAxiosInstance();

export const register = (email: string, password: string) =>
  api.post("/auth/register", { email, password });

export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });
