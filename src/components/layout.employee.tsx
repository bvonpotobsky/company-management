// import {useWindowSize} from "~/hooks/use-window-size";

const LayoutEmployee = ({children}: {children: React.ReactNode}) => {
  // const windowSize = useWindowSize();

  return (
    <main className="flex h-screen w-full flex-col">
      <div>{children}</div>

      {/* {windowSize && windowSize === "mobile" && <NavbarMobile routes={ROUTES} />} */}
    </main>
  );
};

// {windowSize && windowSize === "mobile" && <MobileNavbar profile={profile} />}
// {windowSize && windowSize !== "mobile" && <SidebarNavigation routes={ROUTES} profile={profile} />}
// {/* ToDo: Show loading indicator */}
// <Suspense fallback={<div>Loading Suspense...</div>}>{children}</Suspense>
// {windowSize && windowSize === "mobile" && <BottomNavigation routes={ROUTES} />}

export default LayoutEmployee;
