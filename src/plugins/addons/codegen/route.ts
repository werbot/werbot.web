import { RouteParamsRaw } from "vue-router";

export function routeAddon(routeList: Array<RouteParamsRaw>): string {
  const routes: string[] = [];
  Object.keys(routeList).forEach((section: string) => {
    routeList[section].map((ch: string) => {
      const route = JSON.stringify(
        ch,
        (key, value) => {
          if (typeof value === "function") {
            return value.toString().replace(/\s+/g, "");
          }
          return value;
        },
        2,
      );
      routes.push(route);
    });
  });

  const routeStr = routes
    .join(",\n")
    .replace(/\\"/g, '"')
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/"(\(\)=>import\(.+?\))"/g, "$1");

  return `export const route = [${routeStr}];`;
}
