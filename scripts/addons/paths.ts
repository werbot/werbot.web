import { ROUTES } from "../../src/lib/navigation/registry";
import type { GeneratedRoute } from "./types";

export function joinPath(parent: string, child: string): string {
  return `/${[parent, child].join("/").split("/").filter(Boolean).join("/")}`;
}

function convertSegment(segment: string): string {
  if (!segment.startsWith(":")) {
    return segment;
  }

  const optional = segment.endsWith("?");
  const name = optional ? segment.slice(1, -1) : segment.slice(1);

  return optional ? `[[${name}]]` : `[${name}]`;
}

export function convertPath(url: string): string {
  return `/${url.split("/").filter(Boolean).map(convertSegment).join("/")}`;
}

export function segmentsFromUrl(url: string): string {
  return url.split("/").filter(Boolean).join("/");
}

function routeKey(name: string, params: Record<string, string> = {}): string {
  return `${name}:${JSON.stringify(params)}`;
}

function fillPattern(pattern: string, params: Record<string, string>): string {
  let url = "";

  for (const segment of pattern.split("/").filter(Boolean)) {
    if (segment.startsWith("[[") && segment.endsWith("]]")) {
      const value = params[segment.slice(2, -2)];

      if (value) {
        url += `/${encodeURIComponent(value)}`;
      }
    } else if (segment.startsWith("[") && segment.endsWith("]")) {
      const value = params[segment.slice(1, -1)];

      if (value === undefined) {
        throw new Error(`Missing route param: ${segment.slice(1, -1)}`);
      }

      url += `/${encodeURIComponent(value)}`;
    } else {
      url += `/${segment}`;
    }
  }

  return url || "/";
}

export class RouteCollector {
  private readonly routes = new Map<string, GeneratedRoute>();

  private readonly names = new Map<string, string>();

  add(route: GeneratedRoute): void {
    const url = convertPath(route.pattern);

    if (this.routes.has(url)) {
      throw new Error(`Duplicate add-on route: ${url}`);
    }

    route.pattern = url;
    this.routes.set(url, route);

    if (route.name) {
      this.names.set(routeKey(route.name), url);
    }
  }

  redirectTarget(redirect: string | { name?: string; params?: Record<string, string> }): string | undefined {
    if (typeof redirect === "string") {
      return redirect;
    }

    if (!redirect.name) {
      return undefined;
    }

    const params = redirect.params ?? {};
    const key = routeKey(redirect.name, params);
    const addonPattern = this.names.get(key);
    const corePattern = ROUTES.find((route) => route.name === redirect.name)?.pattern;
    const pattern = addonPattern ?? corePattern;

    return pattern ? fillPattern(pattern, params) : undefined;
  }

  values(): GeneratedRoute[] {
    return [...this.routes.values()];
  }
}
