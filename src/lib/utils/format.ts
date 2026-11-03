export function costFormat(cost: number): string {
  return cost ? (cost / 100).toFixed(2) : "0";
}

export function toInfinity(num: number): string {
  return num === -1 ? "∞" : String(num);
}

export function upperCaseWorld(world: string): string {
  if (!world) {
    return "";
  }
  return world.charAt(0).toUpperCase() + world.slice(1);
}
