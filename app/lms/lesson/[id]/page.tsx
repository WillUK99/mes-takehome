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
    <article className="space-y-6">
      <p className="text-sm text-zinc-500">
        <Link href="/lms" className="font-medium text-zinc-700 hover:text-zinc-900">
          ← Lessons
        </Link>
      </p>
      <header>
        <h1 className="text-2xl font-semibold text-zinc-900">
          {lesson.title}
        </h1>
        <p className="mt-2 text-zinc-600">{lesson.summary}</p>
      </header>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm leading-relaxed text-zinc-700">
        <p>
          This is placeholder lesson content for the prototype. In a real LMS
          this would include videos, readings, and activities.
        </p>
        <p className="mt-4">
          Lesson ID: <code className="rounded bg-zinc-100 px-1.5 py-0.5">{id}</code>
        </p>
      </div>
      <LessonCompletePanel lessonId={id} lessonTitle={lesson.title} />
    </article>
  );
}
