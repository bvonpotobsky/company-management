import {Input} from "~/components/ui/input";

const Search: React.FC = () => {
  return (
    <div>
      <Input type="search" placeholder="Search..." className="h-9 md:w-[100px] lg:w-[300px]" />
    </div>
  );
};

export default Search;
