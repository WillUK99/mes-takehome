import Link from "next/link";
import { getInvitationByToken } from "@/lib/server/invitations";
import { OnboardingForm } from "@/app/onboarding/[token]/onboarding-form";

type PageProps = { params: Promise<{ token: string }> };

export default async function OnboardingPage({ params }: PageProps) {
  const { token } = await params;
  const invitation = getInvitationByToken(token);

  if (!invitation) {
    return (
      <div className="mx-auto flex min-h-full max-w-lg flex-col gap-8 px-4 py-20 sm:px-6">
        <h1 className="text-xl font-semibold text-foreground">Invalid link</h1>
        <p className="text-muted-foreground">
          This invitation link is not valid. Ask your parent for a new link
          after purchase.
        </p>
        <Link
          href="/"
          className="text-sm font-medium text-foreground underline decoration-brand/40 underline-offset-4 transition hover:text-brand"
        >
          Back to home
        </Link>
      </div>
    );
  }

  if (invitation.studentId) {
    return (
      <div className="mx-auto flex min-h-full max-w-lg flex-col gap-8 px-4 py-20 sm:px-6">
        <h1 className="text-xl font-semibold text-foreground">
          Already onboarded
        </h1>
        <p className="text-muted-foreground">
          This invitation has already been used. Open the LMS if you are still
          signed in.
        </p>
        <Link
          href="/lms"
          className="text-sm font-medium text-foreground underline decoration-brand/40 underline-offset-4 transition hover:text-brand"
        >
          Go to LMS
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-full max-w-lg flex-col gap-12 px-4 py-16 sm:px-6 sm:py-20">
      <header className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          <Link href="/" className="transition hover:text-brand">
            MyEdSpace
          </Link>
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Student onboarding
        </h1>
        <p className="text-muted-foreground">
          Create your profile to access your course (demo environment).
        </p>
      </header>

      <OnboardingForm token={token} />
    </div>
  );
}
