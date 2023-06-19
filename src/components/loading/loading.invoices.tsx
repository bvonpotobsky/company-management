import {Skeleton} from "~/components/ui/skeleton";

const LoadingInvoices = () => {
  return (
    <section className="flex w-full flex-col space-y-2 p-2">
      {Array.from({length: 5}).map((_, i) => (
        <div
          key={i}
          className="flex h-36 w-full flex-col justify-between rounded-lg border p-6"
          style={{animationDelay: `${i * 200}ms`}}
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded-sm" />
            <Skeleton className="h-3 w-32 rounded-sm" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-32 rounded-sm" />
            <Skeleton className="h-5 w-16 rounded-sm" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default LoadingInvoices;
