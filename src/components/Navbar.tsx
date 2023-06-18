import {useTheme} from "next-themes";
import {useMounted} from "~/hooks/use-mounted";
import {getNameInitials} from "~/lib/utils";

import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {Button} from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {Moon, Sun} from "lucide-react";

import {signOut, useSession} from "next-auth/react";

// ToDo: Make logo or something. Name???
import {Acme} from "next/font/google";
const font = Acme({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const Navbar = () => {
  const {data: session} = useSession();

  const {theme, setTheme} = useTheme();

  const mounted = useMounted();

  return (
    <nav className="flex w-full items-center justify-end space-x-2 p-2">
      <h1 className="mr-auto" style={font.style}>
        IMK
      </h1>

      {mounted && (
        <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <Moon color="black" /> : <Sun onClick={() => setTheme("light")} color="white" />}
        </Button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8 border sm:h-10 sm:w-10">
            <AvatarImage src={session?.user.image ?? undefined} alt="@shadcn" />
            <AvatarFallback>{getNameInitials(session?.user.name ?? "AA")}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2 [&>*]:cursor-pointer">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="destructive" size="sm" className="w-full cursor-pointer" onClick={() => void signOut()}>
              Sign out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
