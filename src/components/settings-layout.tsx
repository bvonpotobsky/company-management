import {usePathname} from "next/navigation";
import Link from "next/link";

import {cn} from "~/lib/utils";

import {Separator} from "~/components/ui/separator";
import {buttonVariants} from "~/components/ui/button";

const sidebarNavItems = [
  {title: "Profile", href: "/examples/forms"},
  {title: "Account", href: "/examples/forms/account"},
  {title: "Appearance", href: "/examples/forms/appearance"},
  {title: "Notifications", href: "/examples/forms/notifications"},
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({children}: SettingsLayoutProps) => {
  return (
    <>
      <div className="space-y-6 p-4 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
};

export default SettingsLayout;

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export const SidebarNav = ({className, items, ...props}: SidebarNavProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({variant: "ghost"}),
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};
