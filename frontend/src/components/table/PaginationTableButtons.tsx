import { Table } from "@tanstack/react-table";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const PaginationButtons = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <div className="flex justify-end gap-x-2 px-2">
      <button onClick={() => table.setPageIndex(0)}>
        <HiChevronDoubleLeft size="2rem" />
      </button>
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        <HiChevronLeft size="2rem" />
      </button>
      <button
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        <HiChevronRight size="2rem" />
      </button>
      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
        <HiChevronDoubleRight size="2rem" />
      </button>
    </div>
  );
};

export default PaginationButtons;
