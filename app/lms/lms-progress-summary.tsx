"use client";

import { LESSONS } from "@/lib/services/lessons";
import { useLmsProgressStore } from "@/lib/store/useLmsProgressStore";

export function LmsProgressSummary() {
  const completedLessonIds = useLmsProgressStore((s) => s.completedLessonIds);
  const total = LESSONS.length;
  const completed = LESSONS.filter((l) =>
    completedLessonIds.includes(l.id),
  ).length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section
      className="rounded-xl border border-zinc-200 bg-white p-5"
      aria-labelledby="progress-heading"
    >
      <h2
        id="progress-heading"
        className="text-lg font-medium text-zinc-900"
      >
        Your progress
      </h2>
      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-3xl font-semibold tabular-nums text-zinc-900">
          {completed}
        </span>
        <span className="text-zinc-500">/</span>
        <span className="text-xl tabular-nums text-zinc-600">{total}</span>
        <span className="text-sm text-zinc-500">lessons completed</span>
      </div>
      <div className="mt-3">
        <div
          className="h-2 overflow-hidden rounded-full bg-zinc-100"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Course completion"
        >
          <div
            className="h-full rounded-full bg-emerald-600 transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-zinc-600">
          <span className="font-medium tabular-nums text-zinc-800">{pct}%</span>{" "}
          of the course
        </p>
      </div>
    </section>
  );
}
