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

const TABLE_NAMES = Object.keys(db);

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

  const normalizedQuery = query.toLowerCase();
  const foundTables: string[] = [];

  for (const tableName of TABLE_NAMES) {
    if (normalizedQuery.includes(tableName)) {
      foundTables.push(tableName);
    }
  }

  // Pick the last found table, or default to customers
  const tableName =
    foundTables.length > 0 ? foundTables[foundTables.length - 1] : "customers";

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
