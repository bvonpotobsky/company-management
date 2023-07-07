import {format} from "date-fns";
import type {RouterOutputs} from "~/utils/api";

import {Badge} from "./ui/badge";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card";

type Log = RouterOutputs["logs"]["getAllByProfileId"][number] | RouterOutputs["logs"]["getAllLogs"][number];

const RecentLogs: React.FC<{logs: Log[]}> = ({logs}) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Updated <span className="font-semibold">3 minutes</span> ago
        </CardDescription>
      </CardHeader>
      <CardContent>
        {(logs.length === 0 || !logs) && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-sm text-gray-500">No recent activity</p>
          </div>
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
      </CardContent>
    </Card>
  );
};

export default RecentLogs;
