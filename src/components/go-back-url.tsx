import {ChevronLeft} from "lucide-react";
import {buttonVariants} from "./ui/button";
import Link from "next/link";

// ToDo: Learn to create type with literal string
type GoBackURLProps = {
  url: `/admin/${string}` | `/employee/${string}`;
};

const GoBackURL = ({url}: GoBackURLProps) => {
  return (
    <Link href={url} className={buttonVariants({variant: "ghost", className: "flex items-center font-bold"})}>
      <ChevronLeft className="mr-1" size={20} /> Go back
    </Link>
  );
};

export default GoBackURL;
