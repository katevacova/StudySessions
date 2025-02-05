import { ColumnDef } from "@tanstack/react-table";

export type Table<TData> = {
  data: TData[];
};

export interface TableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}
