import Link from "next/link";

export default function LmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-muted">
      <header className="border-b border-brand/15 bg-card">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-4 py-5 sm:px-6">
          <Link
            href="/lms"
            className="text-sm font-semibold tracking-tight text-card-foreground transition hover:text-brand"
          >
            MyEdSpace LMS
          </Link>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/lms" className="transition hover:text-brand">
              Dashboard
            </Link>
            <Link href="/" className="transition hover:text-brand">
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {children}
      </main>
    </div>
  );
}
