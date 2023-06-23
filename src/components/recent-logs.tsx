import {format} from "date-fns";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {getNameInitials} from "~/lib/utils";
import {api} from "~/utils/api";

const RecentLogs = () => {
  const {data: logs, isLoading} = api.logs.getAllLogs.useQuery();

  return (
    <section className="w-full space-y-8">
      {isLoading && (
        <section className="w-full space-y-8">
          <div>
            {/* Add Skeleton logs */}
            <p>Is loading logs</p>
          </div>
        </section>
      )}

      {logs &&
        logs.map((log) => (
          <div className="flex items-center" key={log.id}>
            <Avatar className="h-9 w-9">
              <AvatarImage src={log.profile.user.image ?? undefined} alt="Avatar" />
              <AvatarFallback>{getNameInitials(log.profile.user.name ?? "AA")}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{log.profile.user.name}</p>
              <p className="text-sm text-muted-foreground">{log.message}</p>
            </div>
            <div className="ml-auto font-medium">{format(log.updatedAt, "HH:mm - dd/MM/yy")}</div>
          </div>
        ))}
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="text-sm text-muted-foreground">will@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
    </section>
  );
};

export default RecentLogs;
