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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
        <p className="mt-1 text-zinc-600">
          {name ? (
            <>
              Welcome, <span className="font-medium text-zinc-800">{name}</span>
              .
            </>
          ) : (
            "Welcome to your learning space."
          )}
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Session is simulated (cookie + local storage). This is a prototype.
        </p>
      </div>

      <LmsProgressSummary />

      <section>
        <h2 className="text-lg font-medium text-zinc-900">Lessons</h2>
        <ul className="mt-3 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
          {LESSONS.map((lesson) => {
            const done = completedLessonIds.includes(lesson.id);
            return (
              <li key={lesson.id}>
                <Link
                  href={`/lms/lesson/${lesson.id}`}
                  className="flex items-start gap-3 px-4 py-4 transition hover:bg-zinc-50"
                >
                  <span
                    className={`mt-0.5 inline-flex h-6 shrink-0 items-center rounded-full px-2 text-xs font-medium ${
                      done
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {done ? "Done" : "Open"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-medium text-zinc-900">
                      {lesson.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-zinc-600">
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
