import {type ReactNode} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

export const EmployeeAuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const router = useRouter();

  const {data: session, status} = useSession();

  if (status === "loading") {
    return (
      <div className="dark flex h-screen w-full flex-col items-center justify-center">
        <p className="animate-pulse">Redirecting...</p>
      </div>
    );
  }

  if (!session && status === "unauthenticated") {
    void router.push("/");
    return null;
  }

  // ToDO: Add a loading state
  if (session && !session.user.profileId) {
    void router.push("/admin/register-new-profile");
    return null;
  }

  if (session && !session.user.verified) {
    void router.push("/admin/waiting-for-approval");
    return null;
  }

  if (session && session.user.role !== "EMPLOYEE") {
    void router.push(`/${session.user.role.toLowerCase()}/dashboard`); // ToDO: Look after the best way to handle this
    return null;
  }

  return <>{children}</>;
};
