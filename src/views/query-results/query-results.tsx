import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Loader2Icon } from "lucide-react";
import ExportData from "@/views/export-data";
import useAppStore from "@/store";
import { useParams } from "react-router";

function QueryResults({
  isLoading,
}: {
  isLoading?: boolean;
}): React.JSX.Element {
  const { id } = useParams();
  const queryDetails = useAppStore((state) =>
    state.recentQueries.find((q) => q.id === id)
  );
  const data = queryDetails?.data;
  const columns = queryDetails?.columns;
  const rowCount = queryDetails?.rowCount;
  const executionTime = queryDetails?.executionTime;

  const tableColumns = useMemo(() => {
    if (!columns) return [];

    return columns.map(
      (columnName): ColumnDef<any> => ({
        accessorKey: columnName,
        header: columnName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        id: columnName,
      })
    );
  }, [columns]);

  if (isLoading) {
    return (
      <div className='h-full rounded-lg border p-4 flex flex-col min-h-0'>
        <div className='flex-1 flex items-center justify-center text-muted-foreground'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2Icon className='animate-spin' />
            <span>Executing query...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !columns) {
    return (
      <div className='h-full rounded-lg border p-4 flex flex-col min-h-0'>
        <div className='flex-1 flex items-center justify-center text-muted-foreground'>
          No Results
        </div>
      </div>
    );
  }

  return (
    <div className='h-full rounded-lg border p-4 flex flex-col min-h-0'>
      <div className='shrink-0 pb-2 font-medium flex flex-row items-center justify-between'>
        <p className='text-green-500'>
          {rowCount} rows in {executionTime}ms
        </p>
        <ExportData data={data} columns={columns} />
      </div>
      <div className='flex-1 min-h-0'>
        <DataTable columns={tableColumns} data={data} />
      </div>
    </div>
  );
}

export default QueryResults;
