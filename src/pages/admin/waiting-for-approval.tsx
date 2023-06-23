import type {NextPage} from "next";
import {signOut} from "next-auth/react";

import {Button} from "~/components/ui/button";

const WaitingForApproval: NextPage = () => {
  // If user exists and is not approved, show this page.
  // If user does not exist, show 404.
  // If user exists and is approved, redirect to dashboard. !!!

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center space-y-2">
      <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors sm:text-2xl">
        Awaits Company Approval
      </h2>
      <p className="max-w-lg px-2 text-center text-xs text-muted-foreground sm:text-sm">
        Your profile is currently being reviewed for approval by the company. We will notify you via email as soon as
        your approval status is confirmed.
      </p>

      <Button size="sm" variant="outline" onClick={() => void signOut({redirect: true, callbackUrl: "/"})}>
        Sign out
      </Button>
    </section>
  );
};

export default WaitingForApproval;
