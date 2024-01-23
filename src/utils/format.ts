/**
 * Takes a number `cost` and formats it as a string with two decimal places.
 * If `cost` is falsy (e.g., 0), returns "0".
 * @param cost The number to format.
 * @returns The formatted cost as a string.
 */
export function costFormat(cost: number): string {
  return cost ? (cost / 100).toFixed(2) : "0";
}

/**
 * Converts a number to a string representation of infinity if it's equal to -1.
 * Otherwise, returns the original number as a string.
 * @param num The number to convert.
 * @returns The converted number as a string.
 */
export function toInfinity(num: number): string {
  return num === -1 ? "∞" : String(num);
}

/**
 * Returns a copy of the given string with the first letter capitalized.
 * If the string is empty, returns an empty string.
 * @param world The string to capitalize.
 * @returns The capitalized string.
 */
export function upperCaseWorld(world: string): string {
  if (!world) {
    return "";
  }
  return world.charAt(0).toUpperCase() + world.slice(1);
}
