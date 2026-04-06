import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/constants/session";

export function middleware(request: NextRequest) {
  const sid = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sid) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/lms", "/lms/:path*"],
};
