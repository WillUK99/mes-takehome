import { getCourseById } from "@/lib/constants/courses";
import { createPurchase } from "@/lib/server/memory-store";
import type { CourseId } from "@/lib/server/types";

export function checkout(input: {
  courseId: CourseId;
  parentEmail: string;
  baseUrl: string;
}): { invitationUrl: string; purchaseId: string } {
  const { purchase, invitation } = createPurchase({
    courseId: input.courseId,
    parentEmail: input.parentEmail,
  });

  const course = getCourseById(input.courseId);
  const courseTitle = course?.title ?? input.courseId;

  const invitationUrl = new URL(
    `/onboarding/${invitation.token}`,
    input.baseUrl,
  ).toString();

  console.log(
    "[MyEdSpace] Parent purchase confirmation — email:",
    input.parentEmail,
    "| course:",
    courseTitle,
    "| purchaseId:",
    purchase.id,
  );
  console.log("[MyEdSpace] Invitation link for student:", invitationUrl);

  return { invitationUrl, purchaseId: purchase.id };
}
