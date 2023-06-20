import {useWindowSize} from "~/hooks/use-window-size";

import Navbar from "./navbar";
import NavbarMobile from "./navbar-bottom.mobile";

import {Building, LayoutDashboard, LucideFileBox, Users} from "lucide-react";

const ROUTES = [
  {id: "random1", label: "Overview", href: "/admin/dashboard", icon: <LayoutDashboard />},
  {id: "random2", label: "Employees", href: "/admin/dashboard/employees", icon: <Users />},
  {id: "random3", label: "Invoices", href: "/admin/dashboard/invoices", icon: <LucideFileBox />},
  {
    id: "random4",
    label: "Projects",
    href: "/admin/dashboard/projects",
    icon: <Building />,
    // sub: projects?.map((project) => ({
    //   id: project.id,
    //   label: project.name,
    //   href: `/admin/projects/${project.id}`,
    //   icon: <Building />,
    // })),
  },
];

export type Route = (typeof ROUTES)[number];

const LayoutEmployee = ({children}: {children: React.ReactNode}) => {
  const windowSize = useWindowSize();

  return (
    <main className="flex h-screen w-full flex-col">
      <Navbar />
      <div>{children}</div>

      {windowSize && windowSize === "mobile" && <NavbarMobile routes={ROUTES} />}
    </main>
  );
};

// {windowSize && windowSize === "mobile" && <MobileNavbar profile={profile} />}
// {windowSize && windowSize !== "mobile" && <SidebarNavigation routes={ROUTES} profile={profile} />}
// {/* ToDo: Show loading indicator */}
// <Suspense fallback={<div>Loading Suspense...</div>}>{children}</Suspense>
// {windowSize && windowSize === "mobile" && <BottomNavigation routes={ROUTES} />}

export default LayoutEmployee;
