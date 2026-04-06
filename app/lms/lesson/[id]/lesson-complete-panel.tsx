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
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
      <p className="text-sm font-medium text-zinc-800">{lessonTitle}</p>
      <p className="mt-1 text-xs text-zinc-500">
        Mark this lesson when you have finished the material (saved in this
        browser only).
      </p>
      <button
        type="button"
        onClick={() => toggleLessonComplete(lessonId)}
        className={`mt-3 inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition ${
          complete
            ? "bg-emerald-600 text-white hover:bg-emerald-700"
            : "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50"
        }`}
      >
        {complete ? "Completed — click to undo" : "Mark as complete"}
      </button>
    </div>
  );
}
