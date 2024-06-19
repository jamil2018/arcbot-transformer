import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { TableColumn } from "@/types/TableColumn";
import { LocatorTableRow } from "@/types/tableRows/LocatorTableRow";

const rows: LocatorTableRow[] = [
  {
    key: "1",
    name: "James Corden",
    file: "login.locator.ts",
    value: "input[name='username']",
    module: "login",
  },
  {
    key: "2",
    name: "Tony Stark",
    file: "login.locator.ts",
    value: "input[name='password']",
    module: "login",
  },
  {
    key: "3",
    name: "Anthony Hopkins",
    file: "login.locator.ts",
    value: "button[type='submit']",
    module: "login",
  },
  {
    key: "4",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/forgot-password']",
    module: "login",
  },
  {
    key: "5",
    name: "Mark Ruffalo",
    file: "login.locator.ts",
    value: "a[href='/signup']",
    module: "login",
  },
  {
    key: "6",
    name: "Gal Gadot",
    file: "login.locator.ts",
    value: "a[href='/']",
    module: "login",
  },
  {
    key: "7",
    name: "Scarlett Johansson",
    file: "login.locator.ts",
    value: "a[href='/profile']",
    module: "login",
  },
  {
    key: "8",
    name: "Tom Holland",
    file: "login.locator.ts",
    value: "a[href='/logout']",
    module: "login",
  },
  {
    key: "9",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings']",
    module: "login",
  },
  {
    key: "10",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings/security']",
    module: "login",
  },
  {
    key: "11",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings/notifications']",
    module: "login",
  },
  {
    key: "12",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings/billing']",
    module: "login",
  },
  {
    key: "13",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings/subscription']",
    module: "login",
  },
  {
    key: "14",
    name: "Tony Reichert",
    file: "login.locator.ts",
    value: "a[href='/settings/usage']",
    module: "login",
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

export default function Locators() {
  return (
    <div>
      <PageHeader
        title="Locators"
        description="Total number of locators available currently in the repository"
      />
      <DataTable
        columns={columns}
        rows={rows}
        searchKey="name"
        showRowCrudActions={true}
      />
    </div>
  );
}
