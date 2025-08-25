import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Query {
  id: string;
  name: string | null;
  query: string | null;
  data: any[] | null;
  columns: string[] | null;
  rowCount: number | null;
  executionTime: number | null;
}

interface AppState {
  recentQueries: Query[];
  updateRecentQueries: (query: Query) => void;
  removeFromRecentQueries: (queryId: string) => void;
  updateQueryName: (queryId: string, name: string) => void;
  updateQueryString: (queryId: string, query: string | null) => void;
  updateQueryResults: (queryId: string, results: any) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      recentQueries: [],
      updateRecentQueries: (query: Query) =>
        set((state) => ({ recentQueries: [query, ...state.recentQueries] })),
      removeFromRecentQueries: (queryId: string) =>
        set((state) => ({
          recentQueries: state.recentQueries.filter((q) => q.id !== queryId),
        })),
      updateQueryName: (queryId: string, name: string) =>
        set((state) => ({
          recentQueries: state.recentQueries.map((q) =>
            q.id === queryId ? { ...q, name } : q
          ),
        })),
      updateQueryString: (queryId: string, query: string | null) =>
        set((state) => ({
          recentQueries: state.recentQueries.map((q) =>
            q.id === queryId ? { ...q, query } : q
          ),
        })),
      updateQueryResults: (queryId: string, results: any) =>
        set((state) => ({
          recentQueries: state.recentQueries.map((q) =>
            q.id === queryId
              ? {
                  ...q,
                  data: results.data,
                  columns: results.columns,
                  rowCount: results.rowCount,
                  executionTime: results.executionTime,
                }
              : q
          ),
        })),
    }),
    {
      name: "recentQueries", // localStorage key
      partialize: (state) => ({ recentQueries: state.recentQueries }),
    }
  )
);

export default useAppStore;
