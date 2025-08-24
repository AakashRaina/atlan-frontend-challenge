import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2Icon } from "lucide-react";

function QueryResults({
  data,
  columns,
  rowCount,
  executionTime,
  isLoading,
}: {
  data?: any[];
  columns?: string[];
  rowCount?: number;
  executionTime?: number;
  isLoading?: boolean;
}): React.JSX.Element {
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
      <div className='shrink-0 pb-2 font-medium flex flex-row items-center justify-between text-green-500'>
        {rowCount} rows in {executionTime}ms
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Export data' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='json'>json</SelectItem>
            <SelectItem value='csv'>csv</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className='flex-1 min-h-0 rounded-md border mt-2'>
        <div className='min-w-max p-2'>
          <DataTable columns={tableColumns} data={data} />
        </div>
      </ScrollArea>
    </div>
  );
}

export default QueryResults;
