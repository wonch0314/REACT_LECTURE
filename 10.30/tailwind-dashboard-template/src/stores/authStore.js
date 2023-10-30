import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
}));

export { useAuthStore };
