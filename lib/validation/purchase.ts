import { z } from "zod";

const courseIdEnum = z.enum(["maths", "english", "science"]);

export const purchaseFormSchema = z.object({
  courseId: courseIdEnum,
  parentEmail: z.email().trim().min(1, "Enter a valid email address"),
});

export type PurchaseFormInput = z.infer<typeof purchaseFormSchema>;
