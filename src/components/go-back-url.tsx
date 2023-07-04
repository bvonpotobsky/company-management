import {ChevronLeft} from "lucide-react";
import {buttonVariants} from "./ui/button";
import Link from "next/link";

// ToDo: Learn to create type with literal string
type GoBackURLProps = {
  href: `/admin/${string}` | `/employee/${string}`;
};

const GoBackURL = ({href}: GoBackURLProps) => {
  return (
    <Link href={href} className={buttonVariants({variant: "ghost", className: "flex items-center font-bold"})}>
      <ChevronLeft className="mr-1" size={20} /> Go back
    </Link>
  );
};

export default GoBackURL;
