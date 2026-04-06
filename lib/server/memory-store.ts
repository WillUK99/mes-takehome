import { randomBytes } from "node:crypto";
import type {
  CourseId,
  Invitation,
  Purchase,
  Student,
} from "@/lib/server/types";

interface MemoryState {
  purchases: Map<string, Purchase>;
  invitationsByToken: Map<string, Invitation>;
  students: Map<string, Student>;
}

const STORE_KEY = "__myedspace_memory_store__" as const;

function createEmptyState(): MemoryState {
  return {
    purchases: new Map(),
    invitationsByToken: new Map(),
    students: new Map(),
  };
}

function getGlobalStore(): MemoryState {
  const g = globalThis as unknown as Record<string, MemoryState | undefined>;
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = createEmptyState();
  }
  return g[STORE_KEY]!;
}

export function getStore(): MemoryState {
  return getGlobalStore();
}

function newId(): string {
  return randomBytes(16).toString("hex");
}

function newToken(): string {
  return randomBytes(24).toString("base64url");
}

export function createPurchase(input: {
  courseId: CourseId;
  parentEmail: string;
}): { purchase: Purchase; invitation: Invitation } {
  const store = getStore();
  const purchase: Purchase = {
    id: newId(),
    courseId: input.courseId,
    parentEmail: input.parentEmail,
    createdAt: new Date().toISOString(),
  };
  store.purchases.set(purchase.id, purchase);

  const invitation: Invitation = {
    token: newToken(),
    purchaseId: purchase.id,
    courseId: input.courseId,
    studentId: null,
    createdAt: new Date().toISOString(),
  };
  store.invitationsByToken.set(invitation.token, invitation);

  return { purchase, invitation };
}

export function getInvitationByToken(
  token: string,
): Invitation | undefined {
  return getStore().invitationsByToken.get(token);
}

export function activateStudent(input: {
  token: string;
  name: string;
  password: string;
}): { student: Student } | { error: "invalid_or_used" } {
  const store = getStore();
  const invitation = store.invitationsByToken.get(input.token);
  if (!invitation || invitation.studentId) {
    return { error: "invalid_or_used" };
  }

  const student: Student = {
    id: newId(),
    invitationToken: invitation.token,
    courseId: invitation.courseId,
    name: input.name,
    password: input.password,
    createdAt: new Date().toISOString(),
  };
  store.students.set(student.id, student);

  invitation.studentId = student.id;

  return { student };
}

export function getStudentById(id: string): Student | undefined {
  return getStore().students.get(id);
}
