import type {ReactNode} from "react";
import {useWindowSize} from "~/hooks/use-window-size";

import {EmployeeAuthProvider} from "~/context/auth-employee-provider";

import ThemeToggler from "./theme-toggler";
import MainNav from "./main-nav";
import Search from "./search";
import UserNav from "./user-nav";
import NavbarMobile from "./navbar-bottom.mobile";

import {ROUTES} from "~/lib/constants";

const EmployeeLayout = ({children}: {children: ReactNode}) => {
  const windowSize = useWindowSize();

  return (
    <EmployeeAuthProvider>
      <main className="flex h-screen w-full flex-col">
        <nav className="w-full border-b">
          <div className="flex h-16 items-center px-4">
            <Logo />
            {windowSize !== "mobile" && <MainNav routes={ROUTES} className="mx-6" />}
            <section className="flex w-full items-center justify-end space-x-4">
              <Search />
              <ThemeToggler />
              <UserNav />
            </section>
          </div>
        </nav>

        <section className="flex-1 space-y-4 p-4 pt-4">{children}</section>
        {windowSize === "mobile" && <NavbarMobile routes={ROUTES} />}
      </main>
    </EmployeeAuthProvider>
  );
};

export default EmployeeLayout;

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
