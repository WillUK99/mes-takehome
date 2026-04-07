"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LESSONS } from "@/lib/services/lessons";
import { useLmsProgressStore } from "@/lib/store/useLmsProgressStore";
import { useSessionStore } from "@/lib/store/useSessionStore";
import { LmsProgressSummary } from "./lms-progress-summary";

export type LmsInitialSession = { studentId: string; name: string } | null;

export function LmsDashboard({
  initialSession,
}: {
  initialSession: LmsInitialSession;
}) {
  const name = useSessionStore((s) => s.name);
  const setSession = useSessionStore((s) => s.setSession);
  const completedLessonIds = useLmsProgressStore((s) => s.completedLessonIds);

  useEffect(() => {
    if (initialSession) {
      setSession({
        studentId: initialSession.studentId,
        name: initialSession.name,
      });
    }
  }, [initialSession, setSession]);

  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          {name ? (
            <>
              Welcome, <span className="font-medium text-foreground">{name}</span>
              .
            </>
          ) : (
            "Welcome to your learning space."
          )}
        </p>
        <p className="text-sm text-muted-foreground">
          Session is simulated (cookie + local storage). This is a prototype.
        </p>
      </div>

      <LmsProgressSummary />

      <section className="space-y-5">
        <h2 className="text-lg font-medium text-foreground">Lessons</h2>
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {LESSONS.map((lesson) => {
            const done = completedLessonIds.includes(lesson.id);
            return (
              <li key={lesson.id}>
                <Link
                  href={`/lms/lesson/${lesson.id}`}
                  className="flex items-start gap-4 px-5 py-5 transition hover:bg-muted/60"
                >
                  <span
                    className={`mt-0.5 inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-xs font-medium ${done
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                        : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {done ? "Done" : "Open"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-medium text-card-foreground">
                      {lesson.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {lesson.summary}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
