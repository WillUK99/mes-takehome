"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME } from "@/lib/constants/session";
import { completeOnboarding } from "@/lib/services/onboarding";
import { onboardingFormSchema } from "@/lib/validation/onboarding";

export type OnboardingActionState =
  | { status: "idle" }
  | { status: "error"; message: string };

export async function completeOnboardingAction(
  token: string,
  _prev: OnboardingActionState,
  formData: FormData,
): Promise<OnboardingActionState> {
  const parsed = onboardingFormSchema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { status: "error", message: first?.message ?? "Invalid input" };
  }

  const result = completeOnboarding({
    token,
    name: parsed.data.name,
    password: parsed.data.password,
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "This invitation link is invalid or has already been used.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, result.studentId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    httpOnly: true,
  });

  redirect("/lms");
}
