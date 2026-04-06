import { z } from "zod";

export const onboardingFormSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(120),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type OnboardingFormInput = z.infer<typeof onboardingFormSchema>;
