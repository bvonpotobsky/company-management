import type {ReactNode} from "react";

import {MainNav} from "./main-nav";
import {Search} from "./search";
import TeamSwitcher from "./team-switcher";
import {UserNav} from "./user-nav";

import {api} from "~/utils/api";
import NewProfileForm from "./new-profile-form";
import SettingsLayout from "./settings-layout";

const AdminLayout = ({children}: {children: ReactNode}) => {
  const {data: profile, isLoading} = api.profile.getCurrentUserProfile.useQuery();

  console.log(profile, isLoading);

  if (!profile && !isLoading) {
    return (
      <main className="flex h-screen w-full flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <SettingsLayout>
          <NewProfileForm />
        </SettingsLayout>
      </main>
    );
  }

  // if (!profile.isApproved) {
  //   return (
  //   ! Login here
  //   )
  // }

  if (profile?.role !== "ADMIN") {
    return (
      <main className="flex h-screen w-full flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="w-25 mt-20 self-center justify-self-center">
          <p>You do not have permission to view this page!</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen w-full flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
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
