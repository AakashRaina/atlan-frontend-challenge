import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState, useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import ExportData from "@/views/export-data";
import useAppStore from "@/store";
import { useParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { paginateData, generatePageNumbers } from "@/lib/pagination-utils";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const paginatedResult = useMemo(() => {
    if (!data) return null;
    return paginateData(data, currentPage, pageSize);
  }, [data, currentPage, pageSize]);

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

  const pageNumbers = useMemo(() => {
    if (!paginatedResult) return [];
    return generatePageNumbers(
      paginatedResult.pagination.currentPage,
      paginatedResult.pagination.totalPages
    );
  }, [paginatedResult]);

  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

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

  if (!data || !columns || !paginatedResult) {
    return (
      <div className='h-full rounded-lg border p-4 flex flex-col min-h-0'>
        <div className='flex-1 flex items-center justify-center text-muted-foreground'>
          No Results
        </div>
      </div>
    );
  }

  const { pagination } = paginatedResult;

  return (
    <div className='h-full rounded-lg border p-4 flex flex-col min-h-0'>
      <div className='shrink-0 pb-2 font-medium flex flex-row items-center justify-between'>
        <p className='text-green-500'>
          Showing {pagination.startIndex + 1}-{pagination.endIndex} of{" "}
          {rowCount} rows in {executionTime}ms
        </p>
        <ExportData data={data} columns={columns} />
      </div>
      <div className='flex-1 min-h-0'>
        <DataTable columns={tableColumns} data={paginatedResult.data} />
      </div>
      <div className='sticky bottom-0 z-10 bg-slate-100 w-full flex justify-center p-2'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className={
                  !pagination.hasPrevPage
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {pageNumbers.map((pageNum, index) => (
              <PaginationItem key={index}>
                {pageNum === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    isActive={pageNum === pagination.currentPage}
                    className='cursor-pointer'
                  >
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(pagination.totalPages, prev + 1)
                  )
                }
                className={
                  !pagination.hasNextPage
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default QueryResults;
