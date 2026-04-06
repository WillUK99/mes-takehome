import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LmsProgressSlice {
  completedLessonIds: string[];
  toggleLessonComplete: (lessonId: string) => void;
}

export const useLmsProgressStore = create<LmsProgressSlice>()(
  persist(
    (set) => ({
      completedLessonIds: [],
      toggleLessonComplete: (lessonId) =>
        set((state) => {
          const has = state.completedLessonIds.includes(lessonId);
          return {
            completedLessonIds: has
              ? state.completedLessonIds.filter((id) => id !== lessonId)
              : [...state.completedLessonIds, lessonId],
          };
        }),
    }),
    { name: "myedspace-lms-progress" },
  ),
);
