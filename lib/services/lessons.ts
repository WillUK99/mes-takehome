export interface Lesson {
  id: string;
  title: string;
  summary: string;
}

export const LESSONS: readonly Lesson[] = [
  {
    id: "intro",
    title: "Getting started",
    summary: "Orientation and how to use MyEdSpace.",
  },
  {
    id: "practice-1",
    title: "Practice set 1",
    summary: "Warm-up exercises for your course.",
  },
  {
    id: "practice-2",
    title: "Practice set 2",
    summary: "Build on what you learned in the first set.",
  },
] as const;

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
