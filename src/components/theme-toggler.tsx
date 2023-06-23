import {useTheme} from "next-themes";
import {useMounted} from "~/hooks/use-mounted";
import {Button} from "./ui/button";
import {Moon, Sun} from "lucide-react";

const ThemeToggler = () => {
  const {theme, setTheme} = useTheme();

  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? <Moon color="black" /> : <Sun onClick={() => setTheme("light")} color="white" />}
    </Button>
  );
};

export default ThemeToggler;
