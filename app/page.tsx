import Link from "next/link";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/constants/session";

export default async function Home() {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get(SESSION_COOKIE_NAME)?.value);

  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col justify-center gap-12 px-4 py-20 sm:px-6 sm:py-24">
      <div className="space-y-6">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Prototype
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          MyEdSpace
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          A short demo of the product journey: parent purchases a course, the
          student joins via an invitation link, then opens the learning space.
        </p>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center">
        {isLoggedIn ? (
          <Link
            href="/lms"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover"
          >
            Go to course
          </Link>
        ) : null}
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover"
        >
          Parent: browse courses
        </Link>
        <p className="text-sm text-muted-foreground sm:max-w-xs">
          Students: use the invitation link from email (terminal log in dev).
        </p>
      </div>
    </div>
  );
}
