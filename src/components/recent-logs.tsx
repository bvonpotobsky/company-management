import {Badge} from "./ui/badge";

import {format} from "date-fns";
import {api} from "~/utils/api";

const RecentLogs = () => {
  const {data: logs, isLoading} = api.logs.getAllLogs.useQuery();

  console.log({logs});

  return (
    <section className="w-full space-y-8">
      {isLoading && (
        <section className="w-full">
          <div>
            <p>Is loading logs</p>
            {/* Add loading components */}
          </div>
        </section>
      )}

      {logs &&
        logs.map((log) => (
          <div className="flex items-center" key={log.id}>
            <div className="flex space-x-2 space-y-1">
              <Badge
                className="rounded-sm text-[10px] uppercase"
                variant={log.action === "CREATE" ? "info" : log.action === "UPDATE" ? "warning" : "destructive"}
              >
                {log.action}
              </Badge>
              <p className="text-sm font-medium leading-none">{log.message}</p>
            </div>

            <div className="ml-auto flex flex-col text-right text-xs text-muted-foreground sm:flex-row">
              <p>{format(log.updatedAt, "HH:mmaaa")}</p>
              <span className="mx-1 hidden sm:inline">·</span>
              <p>{format(log.updatedAt, "dd MMM")}</p>
            </div>
          </div>
        ))}
    </section>
  );
};

export default RecentLogs;
