import { create } from "zustand";

interface AuthState {
  token: string | null;
  userId: number | null;
  email: string | null;
  setAuth: (token: string, userId: number, email: string) => void;
  clearAuth: () => void;
}

const STORAGE_KEY = "jwt_token";

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem(STORAGE_KEY),
  userId: null,
  email: null,
  setAuth: (token, userId, email) => {
    localStorage.setItem(STORAGE_KEY, token);
    set({ token, userId, email });
  },
  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ token: null, userId: null, email: null });
  },
}));
