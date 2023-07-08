import Link from "next/link";
import {format} from "date-fns";
import {calculateHoursWorked} from "~/lib/utils";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components//ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";

import type {Shift} from "@prisma/client";
type Shifts = Shift & {
  project: {
    name: string;
  };
};

const Shifts: React.FC<{shifts: Shifts[]}> = ({shifts}) => {
  const oneweek = 7 * 24 * 60 * 60 * 1000;

  return (
    <Card className="col-span-3 border-none">
      <CardHeader className="flex flex-row items-baseline justify-between">
        <CardTitle className="mb-2">
          Current week shifts <span className="text-sm font-normal">(last 7 days)</span>
        </CardTitle>
        <CardDescription>
          <Link href="/employee/dashboard/shifts" className="hover:underline">
            View all shifts
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            <b>
              {format(new Date(Date.now() - oneweek), "dd/MM/yyyy")} to {format(new Date(), "dd/MM/yyyy")}
            </b>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[90px]">Date</TableHead>
              <TableHead>Clock-In</TableHead>
              <TableHead>Clock-Off</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Project</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shifts &&
              shifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell className="font-semibold">{format(shift.date, "dd MMM")}</TableCell>
                  <TableCell>{format(shift.start, "HH:mm a")}</TableCell>
                  {/* 24hs */}
                  <TableCell>{shift.end ? format(shift.end, "HH:mm a") : "N/A"}</TableCell>
                  <TableCell>{shift.end ? calculateHoursWorked(shift.start, shift.end) : "N/A"}</TableCell>
                  <TableCell className="text-right font-semibold">{shift.project.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Shifts;
