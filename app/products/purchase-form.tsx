"use client";

import { useActionState } from "react";
import {
  purchaseAction,
  type PurchaseActionState,
} from "@/app/products/actions";
import { COURSES } from "@/lib/constants/courses";

const initialState: PurchaseActionState = { status: "idle" };

export function PurchaseForm() {
  const [state, formAction, pending] = useActionState(
    purchaseAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-border bg-muted/80 p-8"
    >
      <fieldset className="space-y-4">
        <legend className="text-sm font-medium text-foreground">Course</legend>
        <div className="space-y-2">
          {COURSES.map((course) => (
            <label
              key={course.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:bg-card has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand/40"
            >
              <input
                type="radio"
                name="courseId"
                value={course.id}
                required
                className="size-4 border-border text-primary"
              />
              <span className="text-sm text-foreground">
                {course.title} — {course.yearRange}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="parentEmail"
          className="block text-sm font-medium text-foreground"
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
          className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-brand/35"
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {state.message}
        </p>
      )}

      {state.status === "success" && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
          <p className="font-medium">Purchase recorded (demo).</p>
          <p className="mt-2 break-all text-emerald-800 dark:text-emerald-200">
            Invitation link:{" "}
            <a href={state.invitationUrl} className="underline">
              {state.invitationUrl}
            </a>
          </p>
          <p className="mt-3 text-xs text-emerald-700 dark:text-emerald-300">
            The link was also logged in the server terminal.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover disabled:opacity-60"
      >
        {pending ? "Processing…" : "Mock checkout"}
      </button>
    </form>
  );
}
