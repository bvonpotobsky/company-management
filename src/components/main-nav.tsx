import Link from "next/link";
import {useRouter} from "next/router";

import {cn} from "~/lib/utils";
import type {Route} from "~/lib/constants";

export function MainNav({
  className,
  routes,
  ...props
}: {className?: string; routes: Route[]} & React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();

  const isActive = (pathname: string) => {
    return router.pathname === pathname;
  };

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn("text-sm font-medium transition-colors hover:text-primary", {
            "text-muted-foreground": !isActive(route.href),
          })}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
