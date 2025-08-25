import { create } from "zustand";

export interface Query {
  id: string;
  name: string | null;
  query: string | null;
  data: any[] | null;
  columns: string[] | null;
  rowCount: number | null;
  executionTime: number | null;
}

const useAppStore = create<{
  recentQueries: Query[];
  updateRecentQueries: (query: Query) => void;
  removeFromRecentQueries: (queryId: string) => void;
  updateQueryName: (queryId: string, name: string) => void;
  updateQueryQuery: (queryId: string, query: string | null) => void;
}>((set) => ({
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
  updateQueryQuery: (queryId: string, query: string | null) =>
    set((state) => ({
      recentQueries: state.recentQueries.map((q) =>
        q.id === queryId ? { ...q, query } : q
      ),
    })),
}));

export default useAppStore;
