import { useEffect, useState } from "react";
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

/** True once persisted LMS progress has been read from storage (avoids a 0/N flash). */
export function useLmsProgressStoreHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = useLmsProgressStore.persist.onHydrate(() =>
      setHydrated(false),
    );
    const unsubFinish = useLmsProgressStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );
    setHydrated(useLmsProgressStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinish();
    };
  }, []);

  return hydrated;
}
