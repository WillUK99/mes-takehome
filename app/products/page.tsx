import Link from "next/link";
import { PurchaseForm } from "@/app/products/purchase-form";

export default function ProductsPage() {
  return (
    <div className="mx-auto flex min-h-full w-full min-w-0 max-w-2xl flex-col gap-12 px-4 py-16 sm:px-6 sm:py-20">
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
          Tap a course to select it, then enter your email to complete checkout
          (demo).
        </p>
      </header>

      <PurchaseForm />
    </div>
  );
}
