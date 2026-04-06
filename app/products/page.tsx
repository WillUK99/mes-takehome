"use client";

import { useActionState } from "react";
import Link from "next/link";
import { purchaseAction, type PurchaseActionState } from "@/app/products/actions";
import { COURSES } from "@/lib/constants/courses";

const initialState: PurchaseActionState = { status: "idle" };

export default function ProductsPage() {
  const [state, formAction, pending] = useActionState(
    purchaseAction,
    initialState,
  );

  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col gap-8 px-4 py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">
            MyEdSpace
          </Link>
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Choose a course
        </h1>
        <p className="text-zinc-600">
          Select one course and enter your email to complete checkout (demo).
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-1">
        {COURSES.map((course) => (
          <li
            key={course.id}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-medium text-zinc-900">
                {course.title}
              </h2>
              <span className="text-lg font-semibold text-zinc-900">
                £{course.priceGbp}
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-600">{course.yearRange}</p>
          </li>
        ))}
      </ul>

      {/* TODO: move from out to its own component and use tanstack form for validation */}
      <form action={formAction} className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/80 p-6">
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-zinc-800">
            Course
          </legend>
          <div className="space-y-2">
            {COURSES.map((course) => (
              <label
                key={course.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent px-2 py-2 hover:bg-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-zinc-400"
              >
                <input
                  type="radio"
                  name="courseId"
                  value={course.id}
                  required
                  className="size-4 border-zinc-300 text-zinc-900"
                />
                <span className="text-sm text-zinc-800">
                  {course.title} — {course.yearRange}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="parentEmail"
            className="block text-sm font-medium text-zinc-800"
          >
            Parent email
          </label>
          <input
            id="parentEmail"
            name="parentEmail"
            type="email"
            required
            autoComplete="email"
            placeholder="parent@example.com"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        {state.status === "error" && (
          <p className="text-sm text-red-600" role="alert">
            {state.message}
          </p>
        )}

        {state.status === "success" && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
            <p className="font-medium">Purchase recorded (demo).</p>
            <p className="mt-1 break-all text-emerald-800">
              Invitation link:{" "}
              <a href={state.invitationUrl} className="underline">
                {state.invitationUrl}
              </a>
            </p>
            <p className="mt-2 text-xs text-emerald-700">
              The link was also logged in the server terminal.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-zinc-800 disabled:opacity-60"
        >
          {pending ? "Processing…" : "Mock checkout"}
        </button>
      </form>
    </div>
  );
}
