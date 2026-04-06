import Link from "next/link";

export default function LmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <Link
            href="/lms"
            className="text-sm font-semibold tracking-tight text-zinc-900"
          >
            MyEdSpace LMS
          </Link>
          <nav className="flex gap-4 text-sm text-zinc-600">
            <Link href="/lms" className="hover:text-zinc-900">
              Dashboard
            </Link>
            <Link href="/" className="hover:text-zinc-900">
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
    </div>
  );
}
