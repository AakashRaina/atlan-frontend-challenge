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

  // lower range bound
  let safePage = currentPage;
  if (safePage < 1) {
    safePage = 1;
  }

  // upper range bound
  if (safePage > totalPages) {
    safePage = totalPages;
  }

  // if no pages, set to 1
  if (totalPages === 0) {
    safePage = 1;
  }

  const startIndex = (safePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = fullData.slice(startIndex, endIndex);

  const pagination: PaginationState = {
    currentPage: safePage,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
    startIndex,
    endIndex: startIndex + paginatedData.length,
  };

  return {
    data: paginatedData,
    pagination,
  };
}
