"use client";

import { useLmsProgressStore } from "@/lib/store/useLmsProgressStore";

type Props = { lessonId: string; lessonTitle: string };

export function LessonCompletePanel({ lessonId, lessonTitle }: Props) {
  const completedLessonIds = useLmsProgressStore((s) => s.completedLessonIds);
  const toggleLessonComplete = useLmsProgressStore(
    (s) => s.toggleLessonComplete,
  );
  const complete = completedLessonIds.includes(lessonId);

  return (
    <div className="rounded-2xl border border-border bg-muted/80 p-6">
      <p className="text-sm font-medium text-foreground">{lessonTitle}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        Mark this lesson when you have finished the material (saved in this
        browser only).
      </p>
      <button
        type="button"
        onClick={() => toggleLessonComplete(lessonId)}
        className={`mt-4 inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
          complete
            ? "bg-emerald-600 text-white hover:bg-emerald-700"
            : "border border-border bg-card text-foreground hover:bg-muted"
        }`}
      >
        {complete ? "Completed — click to undo" : "Mark as complete"}
      </button>
    </div>
  );
}
