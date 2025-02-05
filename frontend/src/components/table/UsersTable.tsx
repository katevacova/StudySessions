import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { HiTrash } from "react-icons/hi";
import { cellStyle } from "./styles";
import PaginationTableButtons from "./PaginationTableButtons";
import { useState } from "react";
import DeleteUserDialog from "../dialogs/DeleteUserDialog";
import CreateBanDialog from "../dialogs/CreateBanDialog";
import MuateBanDialog from "../dialogs/MutateBanDialog";

interface UsersTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  onMutate: () => void;
}

const UsersTable = <TData, TValue>({
  data,
  columns,
  onMutate,
}: UsersTableProps<TData, TValue>) => {
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const handleUserDelete = (id: string) => setDeleteUserId(id);
  const handleCloseDeleteDialog = () => setDeleteUserId(null);

  const [createBan, setCreateBan] = useState<string | null>(null);
  const handleCreateBan = (id: string) => setCreateBan(id);
  const handleCreateBanClose = () => setCreateBan(null);

  const [mutateBan, setMutateBan] = useState<string | null>(null);
  const handleMutateBan = (id: string) => setMutateBan(id);
  const handleCloseMutateBan = () => setMutateBan(null);

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
        <h1 className="text-3xl desktop:text-4xl font-bold">Users</h1>

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
                    {cell.column.id === "name" || cell.column.id === "email" ? (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    ) : cell.column.id === "banned" ? (
                      // if the user is banned show button for mutation
                      !cell.getValue() ? (
                        <button
                          className="btn btn-sm desktop:btn-md w-[50px] desktop:w-[80px] bg-error"
                          onClick={() =>
                            handleCreateBan(cell.row.getValue("id"))
                          }
                        >
                          Ban
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-error btn-outline desktop:btn-md w-[50px] desktop:w-[80px]"
                          onClick={() =>
                            handleMutateBan(cell.row.getValue("id"))
                          }
                        >
                          Edit
                        </button>
                      )
                    ) : (
                      // show delete button
                      <button
                        className="btn-sm desktop:btn-md"
                        onClick={() =>
                          handleUserDelete(cell.row.getValue("id"))
                        }
                      >
                        <HiTrash className="w-5 h-5 desktop:w-7 desktop:h-7" />
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationTableButtons table={table} />

        {deleteUserId && (
          <DeleteUserDialog
            id={deleteUserId}
            onClose={handleCloseDeleteDialog}
          />
        )}

        {createBan && (
          <CreateBanDialog id={createBan} onClose={handleCreateBanClose} />
        )}

        {mutateBan && (
          <MuateBanDialog
            id={mutateBan}
            onClose={handleCloseMutateBan}
            onMutate={onMutate}
          />
        )}
      </div>
    </>
  );
};

export default UsersTable;
