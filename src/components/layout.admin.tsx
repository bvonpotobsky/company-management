import {useRouter} from "next/router";
import type {ReactNode} from "react";
import {useWindowSize} from "~/hooks/use-window-size";

import {MainNav} from "./main-nav";
import {Search} from "./search";
import {UserNav} from "./user-nav";
import NavbarMobile from "./navbar-bottom.mobile";
import NewProfileForm from "./new-profile-form";
import SettingsLayout from "./settings-layout";
import {WaitingForApprovalMessage} from "~/pages/admin/waiting-for-approval";

import {api} from "~/utils/api";
import {ROUTES} from "~/lib/constants";

const AdminLayout = ({children}: {children: ReactNode}) => {
  const router = useRouter();

  const windowSize = useWindowSize();

  const {data: profile, isLoading} = api.profile.getCurrentUserProfile.useQuery();

  // ToDO: Add a loading state
  if (isLoading) {
    return (
      <main className="flex h-screen w-full flex-col">
        <div className="h-screen w-full">
          <p>Redirecting</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex h-screen w-full flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>

        <NewProfileForm />
      </main>
    );
  }

  if (profile && !profile.isVerified) {
    return (
      <main className="flex h-screen w-full flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <WaitingForApprovalMessage />
      </main>
    );
  }

  if (profile && profile?.role !== "ADMIN") {
    void router.push(`/${profile.role.toLowerCase()}/dashboard`); // ToDO: Look after the best way to handle this
    return null;
  }

  return (
    <main className="flex h-screen w-full flex-col">
      {windowSize === "mobile" && <NavbarMobile routes={ROUTES} />}
      <div className="w-full border-b">
        <div className="flex h-16 items-center px-4">
          {windowSize !== "mobile" && <MainNav routes={ROUTES} className="mx-6" />}
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>

      <section className="flex-1 space-y-4 p-8 pt-6">{children}</section>
    </main>
  );
};

export default AdminLayout;
