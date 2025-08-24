import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeId() {
  let id = "";
  let numbers = "0123456789";
  for (let i = 0; i < 4; i++) {
    id += numbers.charAt(Math.floor(Math.random() * 10));
  }
  return id;
}

/**
 * Converts table data to CSV format
 */
export function convertToCSV(data: any[], columns: string[]): string {
  if (!data || data.length === 0 || !columns || columns.length === 0) {
    return "";
  }

  const headers = columns.map((col) => `"${col}"`).join(",");

  const rows = data.map((row) => {
    return columns
      .map((col) => {
        const value = row[col];
        const stringValue =
          value === null || value === undefined ? "" : String(value);
        return `"${stringValue.replace(/"/g, '""')}"`;
      })
      .join(",");
  });

  return [headers, ...rows].join("\n");
}

/**
 * Downloads data as a CSV file
 */
export function downloadCSV(
  csvContent: string,
  filename: string = "query-results.csv"
): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }
}
