import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { TableColumn } from "@/types/TableColumn";
import { LocatorTableRow } from "@/types/tableRows/LocatorTableRow";

const rows: LocatorTableRow[] = [
  {
    key: "1",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "input[name='username']",
  },
  {
    key: "2",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "input[name='password']",
  },
  {
    key: "3",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "button[type='submit']",
  },
  {
    key: "4",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/forgot-password']",
  },
  {
    key: "5",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/signup']",
  },
  {
    key: "6",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/']",
  },
  {
    key: "7",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/profile']",
  },
  {
    key: "8",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/logout']",
  },
  {
    key: "9",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings']",
  },
  {
    key: "10",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings/security']",
  },
  {
    key: "11",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings/notifications']",
  },
  {
    key: "12",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings/billing']",
  },
  {
    key: "13",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings/subscription']",
  },
  {
    key: "14",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings/usage']",
  },
];

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
    key: "file",
    label: "FILE",
  },
  {
    key: "value",
    label: "VALUE",
  },
];

export default function Locators() {
  return (
    <div>
      <PageHeader
        title="Locators"
        description="Total number of locators available currently in the repository"
      />
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
