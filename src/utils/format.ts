/**
 * Takes a number `cost` and formats it as a string with two decimal places.
 * If `cost` is falsy (e.g., 0), returns "0".
 * @param cost The number to format.
 * @returns The formatted cost as a string.
 */
export function costFormat(cost: number): string {
  // Use a ternary operator to check if `cost` exists (i.e., if it's not falsy).
  // If `cost` exists, divide it by 100 and call `toFixed(2)` to round to two decimal places.
  // If `cost` is falsy, return "0".
  return (cost ? (cost / 100).toFixed(2) : "0");
}

/**
 * Converts a number to a string representation of infinity if it's equal to -1.
 * Otherwise, returns the original number as a string.
 * @param num The number to convert.
 * @returns The converted number as a string.
 */
export function toInfinity(num: number): string {
  // Use a ternary operator to check if `num` is equal to -1.
  // If `num` is equal to -1, return "∞". Otherwise, return `num` as a string.
  return (num === -1) ? "∞" : String(num);
}

/**
 * Returns a copy of the given string with the first letter capitalized.
 * If the string is empty, returns an empty string.
 * @param world The string to capitalize.
 * @returns The capitalized string.
 */
export function upperCaseWorld(world: string): string {
  // If `world` is an empty string or null/undefined, return an empty string.
  if (!world) {
    return '';
  }

  // Otherwise, return `world` with its first letter capitalized.
  return world.charAt(0).toUpperCase() + world.slice(1);
}
