"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  completeOnboardingAction,
  type OnboardingActionState,
} from "@/app/onboarding/[token]/actions";

const initial: OnboardingActionState = { status: "idle" };

export function OnboardingForm({ token }: { token: string }) {
  const boundAction = completeOnboardingAction.bind(null, token);
  const [state, formAction, pending] = useActionState(
    boundAction,
    initial,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-brand/35"
        />
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
          name="password"
          type="password"
          required
          autoComplete="new-password"
          className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-brand/35"
        />
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
