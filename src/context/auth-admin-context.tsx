import {type ReactNode, createContext} from "react";
import {useRouter} from "next/router";

import {api} from "~/utils/api";

import type {Profile} from "@prisma/client";

export type AuthContextType = {
  auth: Profile | null;
};

const AdminAuthContext = createContext<AuthContextType>({auth: null});

export const AdminAuthProvider = ({children}: {children: ReactNode}) => {
  const router = useRouter();

  const {data: profile, isLoading} = api.profile.getCurrentUserProfile.useQuery();

  // ToDO: Add a loading state
  if (isLoading) {
    return (
      <div className="dark flex h-screen w-full flex-col items-center justify-center">
        <p className="animate-pulse">Redirecting...</p>
      </div>
    );
  }

  if (!profile) {
    void router.push("/admin/register-new-profile");
    return null;
  }

  if (profile && !profile.isVerified) {
    void router.push("/admin/waiting-for-approval");
    return null;
  }

  if (profile && profile?.role !== "ADMIN") {
    void router.push(`/${profile.role.toLowerCase()}/dashboard`); // ToDO: Look after the best way to handle this
    return null;
  }

  return <AdminAuthContext.Provider value={{auth: profile}}>{children}</AdminAuthContext.Provider>;
};
