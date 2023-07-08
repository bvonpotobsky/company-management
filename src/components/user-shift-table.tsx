import {useState} from "react";
import {format} from "date-fns";
import {formatTime} from "~/lib/utils";

import {ArrowUpDown} from "lucide-react";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";

import {Button} from "~/components/ui/button";

import type {RouterOutputs} from "~/utils/api";
import {Badge} from "./ui/badge";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Shift = RouterOutputs["shift"]["getAllByCurrentProfile"][number];

export const columns: ColumnDef<Shift>[] = [
  {
    accessorKey: "date",
    header: ({column}) => (
      <Button
        variant="ghost"
        className="font-bold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({row}) => <p className="ml-4 text-start">{format(row.original.date, "dd MMM")}</p>,
  },
  {
    accessorKey: "start",
    header: () => <p>Check In</p>,
    cell: ({row}) => <span>{format(row.original.start, "hh:mm a")}</span>,
  },
  {
    accessorKey: "end",
    header: () => <p>Check Out</p>,
    cell: ({row}) => {
      const date = row.original.end ?? null;
      return <span>{date ? format(date, "hh:mm a") : "N/A"}</span>;
    },
  },
  {
    accessorKey: "total",
    header: () => <p>Total</p>,
    cell: ({row}) => {
      const start = row.original.start;
      const end = row.original.end ?? new Date();

      const diff = Math.abs(end.getTime() - start.getTime());
      const minutes = Math.floor(diff / 1000 / 60);

      return <span>{formatTime(minutes * 60 * 1000)}</span>;
    },
  },
  {
    accessorKey: "project",
    header: () => <p>Project</p>,
    cell: ({row}) => {
      const projectName = row.original.project.name;

      return (
        <Badge variant="outline" className="rounded-sm p-1.5 sm:text-sm">
          {projectName}
        </Badge>
      );
    },
  },
];

export function ShiftTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <section>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
