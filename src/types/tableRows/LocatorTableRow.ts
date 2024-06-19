import { TableRow } from "../TableRow";

export interface LocatorTableRow extends TableRow {
  name: string;
  file: string;
  value: string;
  module: string;
}
