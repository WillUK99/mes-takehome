import Link from "next/link";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/constants/session";

export default async function Home() {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get(SESSION_COOKIE_NAME)?.value);

  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col justify-center gap-10 px-4 py-20">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Prototype
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
          MyEdSpace
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-zinc-600">
          A short demo of the product journey: parent purchases a course, the
          student joins via an invitation link, then opens the learning space.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        {isLoggedIn ? (
          <Link
            href="/lms"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-zinc-800"
          >
            Go to course
          </Link>
        ) : null}
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-zinc-800"
        >
          Parent: browse courses
        </Link>
        <p className="flex items-center text-sm text-zinc-500">
          Students: use the invitation link from email (terminal log in dev).
        </p>
      </div>
    </div>
  );
}
