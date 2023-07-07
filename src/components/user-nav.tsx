import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

import {getNameInitials} from "~/lib/utils";
import type {UserRole} from "@prisma/client";

import {CreditCard, LogOut, PlusCircle, Settings, User} from "lucide-react";

import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {Button} from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const UserNav: React.FC<{role: UserRole}> = ({role}) => {
  const {data: session} = useSession();

  const pathMaker = (r: UserRole) => {
    const path = {
      ADMIN: "/admin",
      EMPLOYEE: "/employee",
      MANAGER: "/manager",
      SUPERVISOR: "/supervisor",
    }[r];

    return path;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session?.user.image ?? undefined}
              alt={`Profile image of ${session?.user.name ?? "user"}`}
            />
            <AvatarFallback>{getNameInitials(session?.user.name ?? "AA")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session?.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session?.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {/* <Link href="/admin/profile"> */}
            <Link href={`${pathMaker(role)}/profile`}>
              <User className="mr-2 h-4 w-4" />
            </Link>
            <Link href={`${pathMaker(role)}/profile`} className="w-full">
              Profile
            </Link>
            <DropdownMenuShortcut>
              <Link href={`${pathMaker(role)}/profile`}>⇧⌘P</Link>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Team</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void signOut({redirect: true, callbackUrl: "/"})} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
