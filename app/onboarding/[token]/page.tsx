import Link from "next/link";
import { getInvitationByToken } from "@/lib/server/invitations";
import { OnboardingForm } from "@/app/onboarding/[token]/onboarding-form";

type PageProps = { params: Promise<{ token: string }> };

export default async function OnboardingPage({ params }: PageProps) {
  const { token } = await params;
  const invitation = getInvitationByToken(token);

  if (!invitation) {
    return (
      <div className="mx-auto flex min-h-full max-w-lg flex-col gap-6 px-4 py-16">
        <h1 className="text-xl font-semibold text-zinc-900">Invalid link</h1>
        <p className="text-zinc-600">
          This invitation link is not valid. Ask your parent for a new link
          after purchase.
        </p>
        <Link href="/" className="text-sm font-medium text-zinc-900 underline">
          Back to home
        </Link>
      </div>
    );
  }

  if (invitation.studentId) {
    return (
      <div className="mx-auto flex min-h-full max-w-lg flex-col gap-6 px-4 py-16">
        <h1 className="text-xl font-semibold text-zinc-900">
          Already onboarded
        </h1>
        <p className="text-zinc-600">
          This invitation has already been used. Open the LMS if you are still
          signed in.
        </p>
        <Link href="/lms" className="text-sm font-medium text-zinc-900 underline">
          Go to LMS
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-full max-w-lg flex-col gap-8 px-4 py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">
            MyEdSpace
          </Link>
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Student onboarding
        </h1>
        <p className="text-zinc-600">
          Create your profile to access your course (demo environment).
        </p>
      </header>

      <OnboardingForm token={token} />
    </div>
  );
}
