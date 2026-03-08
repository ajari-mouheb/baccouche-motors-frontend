"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Pagination } from "./pagination";

export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  pagination?: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

function DataTable({ className, pagination, children, ...props }: DataTableProps) {
  return (
    <div data-slot="data-table" className={cn("space-y-4", className)} {...props}>
      <div className="overflow-hidden rounded-lg border border-border">
        {children}
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}

function DataTableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      data-slot="data-table-header"
      className={cn("border-b border-border bg-muted/50", className)}
      {...props}
    />
  );
}

function DataTableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      data-slot="data-table-body"
      className={cn(className)}
      {...props}
    />
  );
}

function DataTableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      data-slot="data-table-row"
      className={cn("border-b border-border/50", className)}
      {...props}
    />
  );
}

function DataTableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      data-slot="data-table-head"
      className={cn("px-4 py-3 text-left text-sm font-medium", className)}
      {...props}
    />
  );
}

function DataTableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      data-slot="data-table-cell"
      className={cn("px-4 py-3 text-sm", className)}
      {...props}
    />
  );
}

export {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableHead,
  DataTableCell,
};
