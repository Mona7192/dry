import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isTokenExpired } from "@/utils/jwt";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  SEND_CODE: `${API_BASE_URL}/send-code`,
  VERIFY: `${API_BASE_URL}/auth/verify`,
};

interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  showAuthModal: boolean;
  authModalTab: "login" | "register" | "verify";
  pendingEmail: string | null; // For email verification
  isLoading: boolean;

  // Actions
  setUser: (user: User) => void;
  logout: () => void;
  openAuthModal: (tab?: "login" | "register") => void;
  closeAuthModal: () => void;
  setAuthModalTab: (tab: "login" | "register" | "verify") => void;

  // Auth methods
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  sendVerificationCode: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, verificationCode: string) => Promise<{ success: boolean; message?: string }>;
  checkAuthStatus: () => Promise<boolean>;

  // Utilities
  setHasHydrated: () => void;
  requireAuth: () => boolean; // Returns true if authenticated, false if needs to show modal
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      showAuthModal: false,
      authModalTab: "login",
      pendingEmail: null,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          showAuthModal: false,
          pendingEmail: null
        });
        // Clear tokens
        if (typeof window !== 'undefined') {
          localStorage.removeItem("token");
          localStorage.removeItem("authToken");
        }
      },

      openAuthModal: (tab = "login") => set({
        showAuthModal: true,
        authModalTab: tab
      }),

      closeAuthModal: () => set({
        showAuthModal: false,
        pendingEmail: null
      }),

      setAuthModalTab: (tab) => set({ authModalTab: tab }),

      setHasHydrated: () => set({ hasHydrated: true }),

      // Check if user is authenticated, if not show modal
      requireAuth: () => {
        const { isAuthenticated, checkAuthStatus, openAuthModal } = get();

        if (!isAuthenticated) {
          // Check token first
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          if (token && !isTokenExpired(token)) {
            // Token exists and valid, verify with backend
            checkAuthStatus();
            return true;
          } else {
            // No valid token, show auth modal
            openAuthModal("login");
            return false;
          }
        }

        return true;
      },

      // Check authentication status with backend
      checkAuthStatus: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token || isTokenExpired(token)) {
          get().logout();
          return false;
        }

        try {
          const response = await fetch(API_ENDPOINTS.VERIFY, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              isAuthenticated: true
            });
            return true;
          } else {
            get().logout();
            return false;
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          // Don't logout on network errors, might be temporary
          return get().isAuthenticated;
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
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
              isAuthenticated: true,
              showAuthModal: false,
              isLoading: false
            });

            // Store token
            if (data.token && typeof window !== 'undefined') {
              localStorage.setItem("token", data.token);
            }

            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, message: data.message || "Login failed" };
          }
        } catch (error) {
          set({ isLoading: false });
          console.error("Login error:", error);
          return { success: false, message: "Network error. Please check your connection." };
        }
      },

      sendVerificationCode: async (name: string, email: string, password: string) => {
        set({ isLoading: true });

        try {
          const response = await fetch(API_ENDPOINTS.SEND_CODE, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });

          const data = await response.json();

          if (response.ok) {
            set({
              pendingEmail: email,
              authModalTab: "verify",
              isLoading: false
            });
            return { success: true, message: data.message || "Verification code sent to your email" };
          } else {
            set({ isLoading: false });
            return { success: false, message: data.message || "Failed to send verification code" };
          }
        } catch (error) {
          set({ isLoading: false });
          console.error("Send code error:", error);
          return { success: false, message: "Network error. Please check your connection." };
        }
      },

      register: async (name: string, email: string, password: string, verificationCode: string) => {
        set({ isLoading: true });

        try {
          const response = await fetch(API_ENDPOINTS.REGISTER, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              verification_code: verificationCode
            }),
          });

          const data = await response.json();

          if (response.ok) {
            set({
              user: data.user,
              isAuthenticated: true,
              showAuthModal: false,
              pendingEmail: null,
              isLoading: false
            });

            if (data.token && typeof window !== 'undefined') {
              localStorage.setItem("token", data.token);
            }

            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, message: data.message || "Registration failed" };
          }
        } catch (error) {
          set({ isLoading: false });
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