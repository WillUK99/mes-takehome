import Link from "next/link";
import { PurchaseForm } from "@/app/products/purchase-form";
import { COURSES } from "@/lib/constants/courses";

export default function ProductsPage() {
  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col gap-12 px-4 py-16 sm:px-6 sm:py-20">
      <header className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          <Link href="/" className="transition hover:text-brand">
            MyEdSpace
          </Link>
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Choose a course
        </h1>
        <p className="text-muted-foreground">
          Select one course and enter your email to complete checkout (demo).
        </p>
      </header>

      <ul className="grid gap-5 sm:grid-cols-1">
        {COURSES.map((course) => (
          <li
            key={course.id}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-medium text-card-foreground">
                {course.title}
              </h2>
              <span className="text-lg font-semibold text-card-foreground">
                £{course.priceGbp}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {course.yearRange}
            </p>
          </li>
        ))}
      </ul>

      <PurchaseForm />
    </div>
  );
}
