import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SessionSlice {
  studentId: string | null;
  name: string | null;
  setSession: (payload: { studentId: string; name: string }) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionSlice>()(
  persist(
    (set) => ({
      studentId: null,
      name: null,
      setSession: (payload) =>
        set({ studentId: payload.studentId, name: payload.name }),
      clearSession: () => set({ studentId: null, name: null }),
    }),
    { name: "myedspace-session" },
  ),
);
