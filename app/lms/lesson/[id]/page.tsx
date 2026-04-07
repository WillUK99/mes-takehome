import Link from "next/link";
import { notFound } from "next/navigation";
import { getLessonById } from "@/lib/services/lessons";
import { LessonCompletePanel } from "./lesson-complete-panel";

type PageProps = { params: Promise<{ id: string }> };

export default async function LessonPage({ params }: PageProps) {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  return (
    <article className="space-y-10">
      <p className="text-sm text-muted-foreground">
        <Link
          href="/lms"
          className="font-medium text-foreground transition hover:text-brand"
        >
          ← Lessons
        </Link>
      </p>
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-foreground">
          {lesson.title}
        </h1>
        <p className="text-muted-foreground">{lesson.summary}</p>
      </header>
      <div className="rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          This is placeholder lesson content for the prototype. In a real LMS
          this would include videos, readings, and activities.
        </p>
        <p className="mt-5">
          Lesson ID:{" "}
          <code className="rounded-lg bg-muted px-2 py-1 font-mono text-xs text-foreground">
            {id}
          </code>
        </p>
      </div>
      <LessonCompletePanel lessonId={id} lessonTitle={lesson.title} />
    </article>
  );
}
