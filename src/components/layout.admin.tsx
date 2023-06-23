import {useRouter} from "next/router";
import type {ReactNode} from "react";
import {useWindowSize} from "~/hooks/use-window-size";

import ThemeToggler from "./theme-toggler";

import {MainNav} from "./main-nav";
import {Search} from "./search";
import {UserNav} from "./user-nav";
import NavbarMobile from "./navbar-bottom.mobile";

import {api} from "~/utils/api";
import {ROUTES} from "~/lib/constants";

const AdminLayout = ({children}: {children: ReactNode}) => {
  const router = useRouter();

  const windowSize = useWindowSize();

  const {data: profile, isLoading} = api.profile.getCurrentUserProfile.useQuery();

  // ToDO: Add a loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
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

  return (
    <main className="flex h-screen w-full flex-col">
      <nav className="w-full border-b">
        <div className="flex h-16 items-center px-4">
          {windowSize !== "mobile" && <MainNav routes={ROUTES} className="mx-6" />}
          <section className="flex w-full items-center justify-end space-x-4">
            <Logo />
            <Search />
            <ThemeToggler />
            <UserNav />
          </section>
        </div>
      </nav>

      <section className="flex-1 space-y-4 p-4 pt-4">{children}</section>
      {windowSize === "mobile" && <NavbarMobile routes={ROUTES} />}
    </main>
  );
};

export default AdminLayout;

// ToDo: Make logo or something. Name???
import {Acme} from "next/font/google";
const font = Acme({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export const Logo = () => {
  return (
    <h1 className="mr-auto" style={font.style}>
      IMK
    </h1>
  );
};
