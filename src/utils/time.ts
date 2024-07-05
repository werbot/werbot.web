type Method = "full" | "lite";

export function toDate(timestamp: { seconds: number; nanos?: number }, format: Method = "full"): string {
  const dateMath = timestamp.nanos ? timestamp.seconds * 1000 + timestamp.nanos / 1e6 : timestamp.seconds * 1000;

  return format === "lite" ? new Date(dateMath).toLocaleDateString() : new Date(dateMath).toLocaleString();
}

export function addMinutes(date: Date, minutes: number): Date {
  date.setTime(date.getTime() + minutes * 60 * 1000);
  return date;
}

export function addHours(date: Date, hours: number): Date {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  return date;
}

export function checkTimestampDifference(timestamp: number, lifeTimeSec: number): boolean {
  const currentTimestamp: number = new Date().getTime();
  const differenceInMilliseconds: number = currentTimestamp - timestamp;

  if (differenceInMilliseconds > lifeTimeSec) {
    return false;
  }
  return true;
}
