import {useState} from "react";
import Link from "next/link";
import {format} from "date-fns";

import type {Profile} from "@prisma/client";

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
import {Input} from "~/components/ui/input";
import {Checkbox} from "~/components/ui/checkbox";

import {ArrowUpDown} from "lucide-react";
import {Badge} from "./ui/badge";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Employee = Profile;

export const columns: ColumnDef<Employee>[] = [
  // I want to be able to click the row and redirtect to /admin/dashboard/invoices/[id]
  {
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({column}) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({row}) => (
      <Link href={`/admin/dashboard/employees/${row.original.id}`} className="font-semibold capitalize">
        {row.original.firstName} {row.original.lastName}
      </Link>
    ),
  },
  {
    accessorKey: "dob",
    header: () => <p className="">DOB</p>,
    cell: ({row}) => <p>{format(row.original.dob, "dd/MM/yyyy")}</p>,
  },
  {
    accessorKey: "isVerified",
    header: () => <p className="">Status</p>,
    cell: ({row}) => {
      const isVerified = row.original.isVerified;

      return (
        <Badge variant={isVerified ? "paid" : "warning"} className="rounded-sm p-1 capitalize">
          {isVerified ? "At work" : "Waiting"}
        </Badge>
      );
    },
  },
];

export function EmployeesTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
          onChange={(event) => table.getColumn("firstName")?.setFilterValue(event.target.value)}
          value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
