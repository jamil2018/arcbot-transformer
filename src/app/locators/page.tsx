const DataTable = dynamic(() => import("@/components/DataTable"), {
  ssr: false,
});
import PageHeader from "@/components/PageHeader";
import { TableColumn } from "@/types/TableColumn";
import { LocatorTableRow } from "@/types/tableRows/LocatorTableRow";
import dynamic from "next/dynamic";
import { GET } from "../api/locators/route";
import { Locator } from "@prisma/client";

const columns: TableColumn[] = [
  {
    key: "key",
    label: "ID",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "module",
    label: "MODULE",
  },
  {
    key: "file",
    label: "FILE",
  },
  {
    key: "value",
    label: "VALUE",
  },
];

const formatLocatorDataRows = (
  rowData: Locator[] | null
): LocatorTableRow[] => {
  return rowData
    ? rowData.map((row) => {
        return {
          key: row.id,
          name: row.name,
          module: row.module,
          file: row.file,
          value: row.value,
        };
      })
    : [];
};

export default async function Locators() {
  const rowData = await GET();
  const LocatorDataRows: LocatorTableRow[] = formatLocatorDataRows(rowData);
  return (
    <div>
      <PageHeader
        title="Locators"
        description="Total number of locators available currently in the repository"
      />
      <DataTable
        columns={columns}
        rows={LocatorDataRows}
        searchKey="name"
        showRowCrudActions={true}
      />
    </div>
  );
}
