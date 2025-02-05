import clsx from "clsx";

export const cellStyle = (col: number, length: number) =>
  clsx({
    "text-right": col == length,
    "text-center": col != 0,
    "text-left": col == 0,
  });
