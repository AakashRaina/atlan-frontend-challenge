export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
}

export interface PaginatedData<T> {
  data: T[];
  pagination: PaginationState;
}

export function paginateData<T>(
  fullData: T[],
  currentPage: number = 1,
  pageSize: number = 5
): PaginatedData<T> {
  const totalItems = fullData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const safePage = Math.max(1, Math.min(currentPage, totalPages));

  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const paginatedData = fullData.slice(startIndex, endIndex);

  const pagination: PaginationState = {
    currentPage: safePage,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
    startIndex,
    endIndex,
  };

  return {
    data: paginatedData,
    pagination,
  };
}

export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | "ellipsis")[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  let start = Math.max(1, currentPage - halfVisible);
  let end = Math.min(totalPages, currentPage + halfVisible);

  if (currentPage <= halfVisible) {
    end = maxVisible;
  } else if (currentPage > totalPages - halfVisible) {
    start = totalPages - maxVisible + 1;
  }

  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push("ellipsis");
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
  }

  return pages;
}
