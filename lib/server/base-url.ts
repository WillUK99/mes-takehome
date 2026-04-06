import { headers } from "next/headers";

/**
 * Absolute origin for invitation links. Prefer NEXT_PUBLIC_APP_URL in dev/proxy setups.
 */
export async function getAppBaseUrl(): Promise<string> {
  const env = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (env) return env;

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}
