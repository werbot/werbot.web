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
  format: Method = "full",
): string {
  const dateMath = timestamp.nanos
    ? timestamp.seconds * 1000 + timestamp.nanos / 1e6
    : timestamp.seconds * 1000;

  return format === "lite"
    ? new Date(dateMath).toLocaleDateString()
    : new Date(dateMath).toLocaleString();
}

export function addMinutes(date: Date, minutes: number): Date {
  date.setTime(date.getTime() + minutes * 60 * 1000);
  return date;
}

export function addHours(date: Date, hours: number) {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  return date;
}
