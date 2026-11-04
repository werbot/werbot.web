type Method = "full" | "lite";

type Timestamp = { seconds: number; nanos?: number };

export function toDate(timestamp: unknown, format: Method = "full"): string {
  if (!timestamp) {
    return "";
  }

  let date: Date;

  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (typeof timestamp === "string" || typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    const { seconds, nanos } = timestamp as Timestamp;
    const dateMath = nanos ? seconds * 1000 + nanos / 1e6 : seconds * 1000;
    date = new Date(dateMath);
  }

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return format === "lite" ? date.toLocaleDateString() : date.toLocaleString();
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

  if (differenceInMilliseconds > lifeTimeSec * 1000) {
    return false;
  }
  return true;
}
