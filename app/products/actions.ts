"use server";

import { getAppBaseUrl } from "@/lib/server/base-url";
import { checkout } from "@/lib/services/purchase";
import { purchaseFormSchema } from "@/lib/validation/purchase";

export type PurchaseActionState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; invitationUrl: string };

export async function purchaseAction(
  _prev: PurchaseActionState,
  formData: FormData,
): Promise<PurchaseActionState> {
  const parsed = purchaseFormSchema.safeParse({
    courseId: formData.get("courseId"),
    parentEmail: formData.get("parentEmail"),
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { status: "error", message: first?.message ?? "Invalid input" };
  }

  const baseUrl = await getAppBaseUrl();
  const { invitationUrl } = checkout({
    courseId: parsed.data.courseId,
    parentEmail: parsed.data.parentEmail,
    baseUrl,
  });

  return { status: "success", invitationUrl };
}
