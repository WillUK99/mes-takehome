"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  purchaseAction,
  type PurchaseActionState,
} from "@/app/products/_lib/actions/purchase-action";
import { COURSES } from "@/lib/constants/courses";
import {
  purchaseFormSchema,
  type PurchaseFormInput,
} from "@/lib/validation/purchase";

const initialState: PurchaseActionState = { status: "idle" };

export function PurchaseForm() {
  const [state, formAction] = useActionState(purchaseAction, initialState);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseFormInput>({
    resolver: zodResolver(purchaseFormSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.set("courseId", data.courseId);
    formData.set("parentEmail", data.parentEmail);
    startTransition(() => formAction(formData));
  });

  return (
    <form onSubmit={onSubmit} className="w-full min-w-0 space-y-8">
      <fieldset className="space-y-4 border-0 p-0">
        <legend className="text-sm font-medium text-foreground">
          Select a course
        </legend>
        {errors.courseId && (
          <p className="text-sm text-red-600" role="alert">
            {errors.courseId.message}
          </p>
        )}
        <ul className="grid gap-4 sm:grid-cols-1">
          {COURSES.map((course) => (
            <li key={course.id}>
              <label className="group block cursor-pointer">
                <input
                  type="radio"
                  value={course.id}
                  {...register("courseId")}
                  className="sr-only"
                />
                <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/35 focus-within:ring-2 focus-within:ring-brand/35 group-has-[:checked]:border-primary group-has-[:checked]:ring-2 group-has-[:checked]:ring-brand/25 group-has-[:checked]:shadow-md">
                  <span
                    className="absolute right-5 top-5 flex size-7 items-center justify-center rounded-full border border-border bg-muted/60 text-primary opacity-0 transition group-has-[:checked]:border-primary group-has-[:checked]:bg-primary group-has-[:checked]:text-primary-foreground group-has-[:checked]:opacity-100"
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 12 10"
                      className="size-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 5 4 8 11 1" />
                    </svg>
                  </span>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pr-12">
                    <h2 className="text-lg font-medium text-card-foreground">
                      {course.title}
                    </h2>
                    <span className="text-lg font-semibold text-card-foreground">
                      £{course.priceGbp}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {course.yearRange}
                  </p>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="min-w-0 rounded-2xl border border-border bg-muted/50 p-6 sm:p-8">
        <div>
          <label
            htmlFor="parentEmail"
            className="block text-sm font-medium text-foreground"
          >
            Parent email
          </label>
          <input
            id="parentEmail"
            type="email"
            autoComplete="email"
            placeholder="parent@example.com"
            aria-invalid={errors.parentEmail ? "true" : undefined}
            className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-brand/35 aria-invalid:border-red-500"
            {...register("parentEmail")}
          />
          {errors.parentEmail && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.parentEmail.message}
            </p>
          )}
        </div>

        {state.status === "error" && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {state.message}
          </p>
        )}

        {state.status === "success" && (
          <div className="mt-4 min-w-0 max-w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
            <p className="font-medium">Purchase recorded (demo).</p>
            <p className="mt-2 min-w-0 text-emerald-800 dark:text-emerald-200">
              Invitation link:{" "}
              <a
                href={state.invitationUrl}
                className="inline-block max-w-full break-all align-top underline"
              >
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
          className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover disabled:opacity-60"
        >
          {pending ? "Processing…" : "Mock checkout"}
        </button>
      </div>
    </form>
  );
}
