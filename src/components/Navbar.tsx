import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {Button} from "./ui/button";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {useMounted} from "~/hooks/use-mounted";

const Navbar = () => {
  const mounted = useMounted();

  const {theme, setTheme} = useTheme();

  return (
    <nav className="flex w-full items-center justify-end space-x-2 p-2">
      <h1 className="mr-auto">Logo</h1>

      {mounted && (
        <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <Moon color="black" /> : <Sun onClick={() => setTheme("light")} color="white" />}
        </Button>
      )}

      <Avatar className="h-8 w-8 border sm:h-10 sm:w-10">
        <AvatarImage src="https://github.com/bvonpotobsky.png" alt="@shadcn" />
        <AvatarFallback>BVP</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;
