import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between px-2 py-1">
      <h1>Logo</h1>
      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
        <AvatarImage src="https://github.com/bvonpotobsky.png" alt="@shadcn" />
        <AvatarFallback>BVP</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;
