type Method = "full" | "lite";

/**
 * Convert timestamp to a formatted date string.
 *
 * @param timestamp - An object containing a timestamp in seconds and optional nanoseconds.
 * @param format - The format of the output string, either "full" or "lite". Defaults to "full".
 * @returns A formatted date string based on the input timestamp and format.
 */
export function toDate(
  timestamp: { seconds: number; nanos?: number },
  format: Method = "full"
): string {
  // Calculate the date from the input timestamp
  const dateMath = timestamp.nanos
    ? timestamp.seconds * 1000 + timestamp.nanos / 1e6 // If nanoseconds exist, include them in the date calculation
    : timestamp.seconds * 1000; // Otherwise, just use the seconds

  // Return the date as a formatted string based on the specified format
  return format === "lite"
    ? new Date(dateMath).toLocaleDateString() // If "lite", return date only
    : new Date(dateMath).toLocaleString(); // Otherwise, return date and time
}

