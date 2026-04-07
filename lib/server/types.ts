export type CourseId = "maths" | "english" | "science";

export interface Purchase {
  id: string;
  courseId: CourseId;
  parentEmail: string;
  createdAt: string;
}

export interface Invitation {
  token: string;
  purchaseId: string;
  courseId: CourseId;
  studentId: string | null;
  createdAt: string;
}

export interface Student {
  id: string;
  invitationToken: string;
  courseId: CourseId;
  name: string;
  password: string;
  createdAt: string;
}
