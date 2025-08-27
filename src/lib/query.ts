import {
  regions,
  customers,
  shippers,
  suppliers,
  categories,
  products,
  orders,
  order_items,
} from "@/data/database";

// Create database object from individual exports
const db = {
  regions,
  customers,
  shippers,
  suppliers,
  categories,
  products,
  orders,
  order_items,
};

/**
 * Executes a SQL query against mock data with a simulated delay
 * @param query - SQL query string
 * @returns Promise that resolves to query results
 */
export async function executeQuery(query: string): Promise<{
  data: any[];
  columns: string[];
  rowCount: number;
  executionTime: number;
}> {
  const startTime = Date.now();

  // Simulate network/database delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Extract all table names using regex
  const fromRegex = /from\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi;
  const joinRegex = /join\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi;

  const normalizedQuery = query.toLowerCase();
  const fromMatches = [...normalizedQuery.matchAll(fromRegex)];
  const joinMatches = [...normalizedQuery.matchAll(joinRegex)];

  // Get the last identified table name
  const allMatches = [...fromMatches, ...joinMatches];
  const lastMatch = allMatches[allMatches.length - 1];
  const tableName = lastMatch ? lastMatch[1] : "customers"; // default to customers

  // Get the data for the identified table
  const tableData = db[tableName as keyof typeof db] || db.customers;
  const columns = Object.keys(tableData[0]);

  const executionTime = Date.now() - startTime;

  return {
    data: tableData,
    columns,
    rowCount: tableData.length,
    executionTime,
  };
}
