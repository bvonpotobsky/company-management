import {api} from "~/utils/api";
import {format} from "date-fns";
import {calculateHoursWorked} from "~/lib/utils";

import {Card, CardContent, CardHeader, CardTitle} from "~/components//ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";

const ShiftsContainer: React.FC = () => {
  const {data: shifts} = api.shift.getLastWeekByCurrentProfile.useQuery();

  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  return (
    <Card className="col-span-3 border-none">
      <CardHeader className="flex flex-row items-baseline justify-between">
        <CardTitle className="mb-2">Latest Shifts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            {shifts && shifts.length === 0
              ? "No shifts found"
              : `${format(new Date().getTime() - sevenDays, "dd/MM/yyyy")} to ${format(new Date(), "dd/MM/yyyy")}`}
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
                  <TableCell>{format(shift.start, "hh:mm a")}</TableCell>
                  <TableCell>{shift.end ? format(shift.end, "hh:mm a") : "N/A"}</TableCell>
                  <TableCell>{shift.end ? calculateHoursWorked(shift.start, shift.end) : "N/A"}</TableCell>
                  <TableCell className="text-right">{shift.project.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShiftsContainer;
