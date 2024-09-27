import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (val) => set({ user: val }),
      logout: () => set({ user: null }),
    }),
    {
      name: "petopia-storage",
    }
  )
);

export { useStore };
