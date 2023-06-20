import Link from "next/link";

import {type Route} from "./layout.employee";

const NavbarMobile = ({routes}: {routes: Route[]}) => {
  return (
    <div className="fixed bottom-0 left-0 z-40 h-14 w-full opacity-95 dark:bg-black">
      <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
        {routes?.map((route) => (
          <Link
            key={route.id}
            href={route.href}
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            {route.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavbarMobile;
