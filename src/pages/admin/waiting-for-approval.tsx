import type {NextPage} from "next";
import {signOut} from "next-auth/react";

import AdminLayout from "~/components/layout.admin";
import {Button} from "~/components/ui/button";

const WaitingForApproval: NextPage = () => {
  return (
    <AdminLayout>
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Waiting for approval</h1>
        <p className="text-center text-sm text-muted-foreground">
          Your profile is waiting for approval from the company.
        </p>
      </div>
    </AdminLayout>
  );
};

export default WaitingForApproval;

export const WaitingForApprovalMessage = () => {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center space-y-2">
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
