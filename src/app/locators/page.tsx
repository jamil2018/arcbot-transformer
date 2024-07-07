const DataTable = dynamic(() => import("@/components/DataTable"), {
  ssr: false,
});
import PageHeader from "@/components/PageHeader";
import { LocatorTableRow } from "@/types/tableRows/LocatorTableRow";
import dynamic from "next/dynamic";
import { locatorTableColumns } from "@/constants/tables/locatorTable";
import { formatTableRows } from "@/utils/tableDataFormatter";
import CreateLocator from "./createLocator";
import { deleteLocator, getAllLocators } from "@/actions/locators";

export default async function Locators() {
  const response = await getAllLocators();
  const rowData = response as LocatorTableRow[];
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
        entityCreator={<CreateLocator />}
        deleteHandler={deleteLocator}
      />
    </div>
  );
}
