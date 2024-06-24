import { TableRow } from "@/types/TableRow";

export const formatTableRows = <T extends TableRow>(rowData: T[] | null): T[] =>
  rowData
    ? rowData.map((row) => {
        return {
          key: row.id,
          ...row,
        };
      })
    : [];
