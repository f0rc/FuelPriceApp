import type { Quote } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

const TableComponent = ({ tableData }: { tableData: Quote[] }) => {
  const TableColumns: ColumnDef<Quote>[] = [
    {
      accessorKey: "gallonsRequested",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Gallon(s){" "}
            {column.getIsSorted() === "asc"
              ? "▲"
              : column.getIsSorted() === "desc"
              ? "▼"
              : ""}
          </button>
        );
      },
    },
    {
      accessorKey: "pricePerGallon",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price Per Gallon
          </button>
        );
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order Total
          </button>
        );
      },
    },
    {
      accessorKey: "deliveryDate",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Delivery Date
          </button>
        );
      },
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: tableData,
    columns: TableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="container items-center justify-center border-2 border-black">
      <div className="flex flex-col justify-center">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      // className="border-b-2 border-l-2 border-r-2 border-black"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="border-b-2 border-black">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b-2 border-black even:bg-light-color hover:bg-dark-color/10"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={TableColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mb-4 mt-4 flex flex-row justify-center gap-4">
        <button
          className="rounded-2xl border-2 border-gray-500 px-4 py-2 font-semibold text-dark-color  hover:bg-gray-200 hover:text-black focus:ring-4 focus:ring-[#303133] focus:ring-opacity-90 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-dark-color/10"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          className="rounded-2xl border-2 border-gray-500 px-4 py-2 font-semibold text-dark-color  hover:bg-gray-200 hover:text-black focus:ring-4 focus:ring-[#303133] focus:ring-opacity-90 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-dark-color/10"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
