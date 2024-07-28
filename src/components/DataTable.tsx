"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  Select,
  SelectItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { TableColumn as Column } from "@/types/TableColumn";
import { LocatorTableRow as Row } from "@/types/tableRows/LocatorTableRow";
import { ExpandMore, MoreVert, Search } from "@mui/icons-material";
import { EntityList } from "@/types/EntityList";
import EditLocator from "@/app/locators/editLocator";

export default function DataTable({
  columns,
  rows,
  searchKey,
  showRowCrudActions = false,
  entityCreator,
  currentEntity,
  deleteHandler,
  multiDeleteHandler,
}: {
  columns: Column[];
  rows: Row[];
  searchKey: string;
  showRowCrudActions?: boolean;
  entityCreator: React.ReactNode;
  currentEntity: EntityList;
  deleteHandler: (id: number) => void;
  multiDeleteHandler: (ids: number[]) => void;
}) {
  showRowCrudActions && !columns.find((column) => column.key === "actions")
    ? columns.push({ key: "actions", label: "ACTIONS" })
    : null;
  const [selectedKey, setSelectedKey] = React.useState(0);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(columns.map((column) => column.key))
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredRows = [...rows];

    if (hasSearchFilter) {
      filteredRows = filteredRows.filter((row) =>
        row[searchKey].toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredRows;
  }, [rows, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Row, b: Row) => {
      const first = a[sortDescriptor.column as keyof Row] as number;
      const second = b[sortDescriptor.column as keyof Row] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderEditEntity = React.useCallback(
    (currentEntity: EntityList) => {
      switch (currentEntity) {
        case "locators":
          const locatorData = rows.find((row) => row.id === selectedKey);
          return locatorData ? (
            <EditLocator
              locatorData={{
                id: locatorData.id,
                name: locatorData.name,
                module: locatorData.module,
                value: locatorData.value,
                file: locatorData.file,
              }}
              modalCloseHandler={onEditClose}
            />
          ) : null;
        default:
          return (
            <span>Edit form could not be loaded due to unknown error!!!</span>
          );
      }
    },
    [currentEntity, selectedKey, rows]
  );

  const renderCell = React.useCallback((row: Row, columnKey: React.Key) => {
    const cellValue = row[columnKey as keyof Row];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MoreVert className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onPress={() => {
                    setSelectedKey(row.id);
                    onEditOpen();
                  }}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  onPress={() => {
                    setSelectedKey(row.id);
                    onDeleteOpen();
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ExpandMore className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {column.label.slice(0, 1).toUpperCase() +
                      column.label.slice(1)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {entityCreator}
          </div>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-default-400 text-small">
            Total {rows.length} items
          </span>
          <Select
            variant="bordered"
            onChange={onRowsPerPageChange}
            label="Rows per page"
            className="max-w-40"
            defaultSelectedKeys="5"
          >
            <SelectItem key="5" value="5">
              5
            </SelectItem>
            <SelectItem key="10" value="10">
              10
            </SelectItem>
            <SelectItem key="15" value="15">
              15
            </SelectItem>
          </Select>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    rows.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete Locator
          </ModalHeader>
          <ModalBody className="flex justify-between">
            <h2 className="text-xs">
              Are you sure you want to delete the entity(s)?
            </h2>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onDeleteClose}>Cancel</Button>
            <Button
              onClick={() => {
                deleteHandler(selectedKey);
                onDeleteClose();
              }}
              color="danger"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditOpen} onOpenChange={onEditClose}>
        {renderEditEntity(currentEntity)}
      </Modal>
      <Table
        aria-label="DataTable"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[500px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
              allowsSorting={column.key === "actions" ? false : true}
              style={{ width: 100 / columns.length + "%" }}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No records found"} items={sortedItems}>
          {(item) => (
            <TableRow
              key={item.id}
              style={{ width: 100 / columns.length + "%" }}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
