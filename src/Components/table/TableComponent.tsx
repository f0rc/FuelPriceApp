import type { Quote } from "@prisma/client";
import {
  Table,
  TableBody,
  // TableCaption,
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
  type SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/router";

export const TableComponent = ({ tableData }: { tableData: Quote[] }) => {
  const TableColumns: ColumnDef<Quote>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <input
    //       type="checkbox"
    //       checked={table.getIsAllPageRowsSelected()}
    //       onChange={(value) => {
    //         // console.log("VALUR", value.target.checked);
    //         table.toggleAllRowsSelected(!!value.target.checked);
    //       }}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <input
    //       type="checkbox"
    //       checked={row.getIsSelected()}
    //       onChange={(value) => {
    //         // console.log("VALUR", value.target.checked);
    //         row.toggleSelected(!!value.target.checked);
    //       }}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    // },
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
      cell: ({ row }) => {
        const gallonsRequested = parseFloat(row.getValue("gallonsRequested"));
        const formatted = new Intl.NumberFormat("en-US").format(
          gallonsRequested
        );

        return <div className="">{formatted}</div>;
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
      cell: ({ row }) => {
        const pricePerGallon = parseFloat(row.getValue("pricePerGallon"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(pricePerGallon);

        return <div className="">{formatted}</div>;
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
      cell: ({ row }) => {
        const total = parseFloat(row.getValue("total"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total);

        return <div className="">{formatted}</div>;
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
      cell: ({ row }) => {
        // console.log(row.original.deliveryDate);
        return <span>{row.original.deliveryDate.toLocaleDateString()}</span>;
      },
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: tableData,
    columns: TableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  const navigate = useRouter();

  return (
    <div className="container items-center justify-center border-2 border-black">
      <div className="flex flex-col justify-center pt-4">
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
                  onClick={async () => {
                    navigate.query.id = row.original.id;
                    await navigate.push(`/quote/${row.original.id}`);
                  }}
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
