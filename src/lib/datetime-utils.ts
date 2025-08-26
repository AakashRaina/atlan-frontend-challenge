export function formatDateTime(
  value: string | number | Date,
  options: {
    format?: "full" | "date" | "time" | "short" | "relative";
    includeTime?: boolean;
    includeSeconds?: boolean;
  } = {}
): string {
  const {
    format = "full",
    includeTime = true,
    includeSeconds = false,
  } = options;

  if (!value) return "";

  let date: Date;

  // Handle different input types
  if (typeof value === "string") {
    // Try parsing as ISO string, timestamp, or other formats
    date = new Date(value);
  } else if (typeof value === "number") {
    // Handle both seconds and milliseconds timestamps
    date = new Date(value < 10000000000 ? value * 1000 : value);
  } else {
    date = value;
  }

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return value.toString();
  }

  switch (format) {
    case "relative":
      return formatRelativeTime(date);

    case "date":
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    case "time":
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: includeSeconds ? "2-digit" : undefined,
        hour12: true,
      });

    case "short":
      return (
        date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "2-digit",
        }) +
        (includeTime
          ? ` ${date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}`
          : "")
      );

    case "full":
    default:
      return (
        date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }) +
        (includeTime
          ? ` at ${date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              second: includeSeconds ? "2-digit" : undefined,
              hour12: true,
            })}`
          : "")
      );
  }
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 0) {
    return "in the future";
  }

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
}

export function isDateTimeValue(value: any): boolean {
  if (!value) return false;

  // Check if it's already a Date object
  if (value instanceof Date) return true;

  // Check if it's a string that looks like a datetime
  if (typeof value === "string") {
    // ISO format: 2023-12-25T10:30:00Z or 2023-12-25T10:30:00.000Z
    const isoPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
    if (isoPattern.test(value)) return true;

    // Date patterns: 2023-12-25, 12/25/2023, Dec 25, 2023
    const datePattern =
      /^\d{4}-\d{2}-\d{2}$|^\d{1,2}\/\d{1,2}\/\d{4}$|^[A-Za-z]{3}\s+\d{1,2},?\s+\d{4}$/;
    if (datePattern.test(value)) return true;

    // Timestamp-like strings
    if (/^\d{10}$|^\d{13}$/.test(value)) return true;

    // Try parsing and see if it's a valid date
    const parsed = new Date(value);
    return !isNaN(parsed.getTime());
  }

  // Check if it's a timestamp (seconds or milliseconds)
  if (typeof value === "number") {
    // Reasonable range for timestamps (1970 to 2100)
    return value > 0 && value < 4102444800000;
  }

  return false;
}

// Helper function to auto-detect and format datetime values
export function autoFormatDateTime(value: any): string {
  if (isDateTimeValue(value)) {
    return formatDateTime(value, { format: "full" });
  }
  return value?.toString() || "";
}
