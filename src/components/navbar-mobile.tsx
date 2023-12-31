import Link from "next/link";
import type {Route} from "~/lib/constants";

const NavbarMobile: React.FC<{routes: Route[] & React.HTMLAttributes<HTMLDivElement>}> = ({routes, ...props}) => {
  return (
    <div className="w-full opacity-95 dark:bg-black">
      <nav className="mx-auto grid h-16 max-w-lg grid-flow-col font-medium" {...props}>
        {routes?.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="group inline-flex h-full cursor-pointer flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            {route.icon}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default NavbarMobile;
