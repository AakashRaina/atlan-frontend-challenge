import type { ColumnDef } from "@tanstack/react-table";
import { schema, type RowTypes } from "@/data/schema";

function humanizeColumnName(name: string): string {
  return name
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function buildColumnsFromTable<TTableName extends keyof RowTypes>(
  tableName: TTableName
): ColumnDef<RowTypes[TTableName]>[] {
  const tableSchema = schema[tableName];
  if (!tableSchema) return [];

  return tableSchema.columns.map((col) => ({
    accessorKey: col.name,
    header: humanizeColumnName(col.name),
    id: col.name,
  })) as ColumnDef<RowTypes[TTableName]>[];
}
