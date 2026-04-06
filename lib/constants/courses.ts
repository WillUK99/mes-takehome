import type { CourseId } from "@/lib/server/types";

export interface Course {
  id: CourseId;
  title: string;
  yearRange: string;
  priceGbp: number;
}

export const COURSES: readonly Course[] = [
  {
    id: "maths",
    title: "Maths",
    yearRange: "Year 5–13",
    priceGbp: 199,
  },
  {
    id: "english",
    title: "English",
    yearRange: "Year 5–13",
    priceGbp: 199,
  },
  {
    id: "science",
    title: "Science",
    yearRange: "Year 5–11",
    priceGbp: 199,
  },
] as const;

export const COURSE_IDS = COURSES.map((c) => c.id) as CourseId[];

export function getCourseById(id: CourseId): Course | undefined {
  return COURSES.find((c) => c.id === id);
}
