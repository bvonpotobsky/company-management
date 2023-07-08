import type {ReactNode} from "react";
import {useWindowSize} from "~/hooks/use-window-size";

import {AdminAuthProvider} from "~/context/auth-admin-context";

import ThemeToggler from "./theme-toggler";
import Search from "./search";

import UserNav from "./user-nav";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";

import {ROUTES_ADMIN} from "~/lib/constants";

const AdminLayout: React.FC<{children: ReactNode}> = ({children}) => {
  const windowSize = useWindowSize();

  return (
    <AdminAuthProvider>
      <main className="flex h-screen flex-col overflow-hidden">
        <nav className="w-full border-b">
          <div className="flex h-16 items-center px-4">
            <Logo />
            {windowSize !== "mobile" && <NavbarDesktop routes={ROUTES_ADMIN} className="mx-6" />}
            <section className="flex w-full items-center justify-end space-x-4">
              <Search />
              <ThemeToggler />
              <UserNav role="ADMIN" />
            </section>
          </div>
        </nav>

        <section className="flex-grow overflow-y-auto p-4">{children}</section>
        {windowSize === "mobile" && <NavbarMobile routes={ROUTES_ADMIN} />}
      </main>
    </AdminAuthProvider>
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
