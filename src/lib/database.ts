/**
 * Minimal database utilities for mock data generation.
 * Only includes helpers actually used by the data module.
 */

/**
 * Add a number of days to a date and return a new Date.
 *
 * @param date - Base date
 * @param days - Number of days to add (can be negative)
 * @returns New Date shifted by the given number of days
 */
export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Convert a Date to an ISO-8601 string (e.g., 2024-01-01T00:00:00.000Z).
 *
 * @param d - Date instance
 * @returns ISO string representation
 */
export function toISO(d: Date): string {
  return d.toISOString();
}
