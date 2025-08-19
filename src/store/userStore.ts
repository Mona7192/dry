// src/store/userStore.ts
import { create } from "zustand"

interface User {
  name: string
  email: string
}

interface UserState {
  user: User | null
  setUser: (u: User) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
