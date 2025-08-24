import { create } from "zustand";
import { persist } from "zustand/middleware";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  VERIFY: `${API_BASE_URL}/auth/verify`,
};

interface User {
  id?: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  setHasHydrated: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      logout: () => {
        set({ user: null, isAuthenticated: false });
        // Clear any stored tokens
        if (typeof window !== 'undefined') {
          localStorage.removeItem("authToken");
        }
      },

      setHasHydrated: () => set({ hasHydrated: true }),

      login: async (email: string, password: string) => {
        try {
          console.log('Sending login request to:', API_ENDPOINTS.LOGIN); // برای debug

          const response = await fetch(API_ENDPOINTS.LOGIN, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (response.ok) {
            set({
              user: data.user,
              isAuthenticated: true
            });
            // Store token if you're using JWT
            if (data.token && typeof window !== 'undefined') {
              localStorage.setItem("authToken", data.token);
            }
            return { success: true };
          } else {
            console.error("Login failed:", data.message);
            return { success: false, message: data.message || "Login failed" };
          }
        } catch (error) {
          console.error("Login error:", error);
          return { success: false, message: "Network error. Please check your connection." };
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          console.log('Sending register request to:', API_ENDPOINTS.REGISTER); // برای debug

          const response = await fetch(API_ENDPOINTS.REGISTER, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });

          const data = await response.json();

          if (response.ok) {
            set({
              user: data.user,
              isAuthenticated: true
            });
            if (data.token && typeof window !== 'undefined') {
              localStorage.setItem("authToken", data.token);
            }
            return { success: true };
          } else {
            console.error("Registration failed:", data.message);
            return { success: false, message: data.message || "Registration failed" };
          }
        } catch (error) {
          console.error("Registration error:", error);
          return { success: false, message: "Network error. Please check your connection." };
        }
      },
    }),
    {
      name: "user-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);