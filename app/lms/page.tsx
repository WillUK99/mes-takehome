import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/constants/session";
import { getStudentById } from "@/lib/server/memory-store";
import { LmsDashboard } from "./_lib/components/lms-dashboard";

export default async function LmsPage() {
  const cookieStore = await cookies();
  const sid = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const student = sid ? getStudentById(sid) : undefined;
  const initialSession = student
    ? { studentId: student.id, name: student.name }
    : null;

  return <LmsDashboard initialSession={initialSession} />;
}
