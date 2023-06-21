import Link from "next/link";
import {useRouter} from "next/router";

import {cn} from "~/lib/utils";

export function MainNav({className, ...props}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();

  const isActive = (pathname: string) => {
    return router.pathname === pathname;
  };

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/admin/dashboard"
        className={cn("text-sm font-medium transition-colors hover:text-primary", {
          "text-muted-foreground": !isActive("/admin/dashboard"),
        })}
      >
        Overview
      </Link>
      <Link
        href="/admin/dashboard/invoices"
        className={cn("text-sm font-medium transition-colors hover:text-primary", {
          "text-muted-foreground": !isActive("/admin/dashboard/invoices"),
        })}
      >
        Invoices
      </Link>
      <Link
        href="/admin/dashboard/projects"
        className={cn("text-sm font-medium transition-colors hover:text-primary", {
          "text-muted-foreground": !isActive("/admin/dashboard/projects"),
        })}
      >
        Projects
      </Link>
      <Link
        href="/admin/dashboard/employees"
        className={cn("text-sm font-medium transition-colors hover:text-primary", {
          "text-muted-foreground": !isActive("/admin/dashboard/employees"),
        })}
      >
        Employees
      </Link>
      <Link
        href="/admin/dashboard/clients"
        className={cn("text-sm font-medium transition-colors hover:text-primary", {
          "text-muted-foreground": !isActive("/admin/dashboard/clients"),
        })}
      >
        Clients
      </Link>
    </nav>
  );
}
