import { ROUTES } from "../../src/lib/navigation/registry";
import type { GeneratedRoute } from "./types";

const CORE_PATTERNS = new Set(ROUTES.map((route) => route.pattern));
const CORE_NAMES = new Set(ROUTES.map((route) => route.name));

export function joinPath(parent: string, child: string): string {
  // vue-router treats a nested absolute path as rooted, not as a child.
  const base = child.startsWith("/") ? "" : parent;

  return `/${[base, child].join("/").split("/").filter(Boolean).join("/")}`;
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

    if (CORE_PATTERNS.has(url)) {
      throw new Error(`Add-on route collides with core route: ${url}`);
    }

    if (this.routes.has(url)) {
      throw new Error(`Duplicate add-on route: ${url}`);
    }

    if (route.name && CORE_NAMES.has(route.name)) {
      throw new Error(`Add-on route name collides with core route: ${route.name}`);
    }

    route.pattern = url;
    this.routes.set(url, route);

    if (route.name) {
      if (this.names.has(route.name)) {
        console.warn(`[addons] Duplicate add-on route name "${route.name}"; last one wins`);
      }

      this.names.set(route.name, url);
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
    const addonPattern = this.names.get(redirect.name);
    const corePattern = ROUTES.find((route) => route.name === redirect.name)?.pattern;
    const pattern = addonPattern ?? corePattern;

    return pattern ? fillPattern(pattern, params) : undefined;
  }

  values(): GeneratedRoute[] {
    return [...this.routes.values()];
  }
}
