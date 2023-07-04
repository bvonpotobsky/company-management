import {Card} from "../ui/card";
import {Skeleton} from "../ui/skeleton";

const LoadingProfile: React.FC = () => {
  return (
    <Card className="flex h-44 w-full flex-col justify-between space-y-2 p-2">
      <section className="flex flex-row items-center justify-between">
        <Skeleton className="h-5 w-1/2 rounded-sm" />
        <Skeleton className="h-5 w-1/4 rounded-sm" />
      </section>

      <section className="flex flex-row items-center justify-center space-x-2">
        <Skeleton className="h-5 w-1/2 rounded-sm" />
      </section>

      <section className="flex flex-row items-center justify-between space-x-2">
        <Skeleton className="h-5 w-1/2 rounded-sm" />
        <Skeleton className="h-5 w-1/4 rounded-sm" />
      </section>
    </Card>
  );
};

export default LoadingProfile;
