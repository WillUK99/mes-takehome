import { activateStudent } from "@/lib/server/memory-store";

export type CompleteOnboardingResult =
  | { ok: true; studentId: string; name: string }
  | { ok: false; reason: "invalid_or_used" };

export function completeOnboarding(input: {
  token: string;
  name: string;
  password: string;
}): CompleteOnboardingResult {
  const result = activateStudent({
    token: input.token,
    name: input.name,
    password: input.password,
  });

  if ("error" in result) {
    return { ok: false, reason: "invalid_or_used" };
  }

  console.log(
    "[MyEdSpace] Student activated —",
    result.student.name,
    "| studentId:",
    result.student.id,
  );

  return {
    ok: true,
    studentId: result.student.id,
    name: result.student.name,
  };
}
