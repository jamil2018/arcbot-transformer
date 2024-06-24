const DataTable = dynamic(() => import("@/components/DataTable"), {
  ssr: false,
});
import PageHeader from "@/components/PageHeader";
import { LocatorTableRow } from "@/types/tableRows/LocatorTableRow";
import dynamic from "next/dynamic";
import { GET } from "../api/locators/route";
import { locatorTableColumns } from "@/constants/tables/locatorTable";
import { formatTableRows } from "@/utils/tableDataFormatter";

export default async function Locators() {
  const rowData = await GET();
  const LocatorDataRows: LocatorTableRow[] = formatTableRows(rowData);
  return (
    <div>
      <PageHeader
        title="Locators"
        description="Total number of locators available currently in the repository"
      />
      <DataTable
        columns={locatorTableColumns}
        rows={LocatorDataRows}
        searchKey="name"
        showRowCrudActions={true}
      />
    </div>
  );
}
