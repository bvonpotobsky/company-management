import type {ReactNode} from "react";
import {useWindowSize} from "~/hooks/use-window-size";

import {EmployeeAuthProvider} from "~/context/auth-employee-provider";

import ThemeToggler from "./theme-toggler";
import Search from "./search";

import UserNav from "./user-nav";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";

import {ROUTES_EMPLOYEE} from "~/lib/constants";

const EmployeeLayout: React.FC<{children: ReactNode}> = ({children}) => {
  const windowSize = useWindowSize();

  return (
    <EmployeeAuthProvider>
      <main className="flex h-[100dvh] flex-col overflow-hidden">
        <nav className="w-full border-b">
          <div className="flex h-16 items-center px-4">
            <Logo />
            {windowSize !== "mobile" && <NavbarDesktop routes={ROUTES_EMPLOYEE} className="mx-6" />}
            <section className="flex w-full items-center justify-end space-x-4">
              <Search />
              <ThemeToggler />
              <UserNav role="EMPLOYEE" />
            </section>
          </div>
        </nav>

        <section className="flex-grow overflow-y-auto p-4">{children}</section>
        {windowSize === "mobile" && <NavbarMobile routes={ROUTES_EMPLOYEE} />}
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
