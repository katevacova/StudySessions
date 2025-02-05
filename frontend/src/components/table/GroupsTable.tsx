import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { HiTrash } from "react-icons/hi";
import { TableProps } from "./types";
import { cellStyle } from "./styles";
import { useState } from "react";
import DeleteGroupDialog from "../dialogs/DeleteGroupDialog";
import PaginationButtons from "./PaginationTableButtons";

const GroupsTable = <TData, TValue>({
  data,
  columns,
}: TableProps<TData, TValue>) => {
  const [deletingEntityId, setDeletingEntityId] = useState<string | null>(null);
  const handleEntityDelete = (id: string) => setDeletingEntityId(id);
  const handleCloseDeleteDialog = () => setDeletingEntityId(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <>
      <div className="flex flex-col self-center gap-6 text-info">
        <h1 className="text-3xl desktop:text-4xl font-bold">Groups</h1>

        <table className="table table-zebra w-[360px] tablet:w-[560px] desktop:w-[900px] shadow-lg">
          <thead className="bg-primary text-lg desktop:text-xl">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, col) => (
                  <th
                    key={header.id}
                    className={cellStyle(col, columns.length - 1)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="text-base desktop:text-lg">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, col) => (
                  <td
                    key={cell.id}
                    className={cellStyle(col, columns.length - 1)}
                  >
                    {cell.column.id !== "id" ? (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    ) : (
                      <div className="gap-2 desktop:gap-4">
                        <button
                          className="btn-sm desktop:btn-md"
                          onClick={() =>
                            handleEntityDelete(cell.row.getValue("id"))
                          }
                        >
                          <HiTrash className="w-5 h-5 desktop:w-7 desktop:h-7" />
                        </button>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationButtons table={table} />

        {deletingEntityId && (
          <DeleteGroupDialog
            id={deletingEntityId}
            onClose={handleCloseDeleteDialog}
          />
        )}
      </div>
    </>
  );
};

export default GroupsTable;
