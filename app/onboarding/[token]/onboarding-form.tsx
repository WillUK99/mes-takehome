"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  completeOnboardingAction,
  type OnboardingActionState,
} from "@/app/onboarding/[token]/actions";
import {
  onboardingFormSchema,
  type OnboardingFormInput,
} from "@/lib/validation/onboarding";

const initial: OnboardingActionState = { status: "idle" };

export function OnboardingForm({ token }: { token: string }) {
  const boundAction = completeOnboardingAction.bind(null, token);
  const [state, formAction] = useActionState(boundAction, initial);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormInput>({
    resolver: zodResolver(onboardingFormSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("password", data.password);
    startTransition(() => formAction(formData));
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Your name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? "true" : undefined}
          className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-brand/35 aria-invalid:border-red-500"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground"
        >
          Password (demo — stored in memory only)
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={errors.password ? "true" : undefined}
          className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-brand/35 aria-invalid:border-red-500"
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover disabled:opacity-60"
        >
          {pending ? "Saving…" : "Complete setup"}
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
