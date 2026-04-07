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
      className="rounded-2xl border border-border bg-card p-7"
      aria-labelledby="progress-heading"
    >
      <h2
        id="progress-heading"
        className="text-lg font-medium text-card-foreground"
      >
        Your progress
      </h2>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <span className="text-3xl font-semibold tabular-nums text-card-foreground">
          {completed}
        </span>
        <span className="text-muted-foreground">/</span>
        <span className="text-xl tabular-nums text-muted-foreground">{total}</span>
        <span className="text-sm text-muted-foreground">lessons completed</span>
      </div>
      <div className="mt-4">
        <div
          className="h-2 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Course completion"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium tabular-nums text-foreground">{pct}%</span>{" "}
          of the course
        </p>
      </div>
    </section>
  );
}
