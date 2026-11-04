import { existsSync, promises as fs } from "node:fs";
import path from "node:path";

import { convertPath, joinPath, RouteCollector, segmentsFromUrl } from "./paths";
import { type AddonRouteNode, type GeneratedRoute, type Section, SECTION_LAYOUT } from "./types";
import { exists } from "./fs-utils";

function componentSpecifier(component: unknown): string | undefined {
  if (typeof component === "string") {
    return component;
  }

  if (typeof component !== "function") {
    return undefined;
  }

  const source = component.toString();
  const match =
    /(?:import|__vite_ssr_dynamic_import__)\(\s*["'`]([^"'`]+)["'`]\s*\)/.exec(source) ??
    /["'`]([^"'`]+\.(?:vue|svelte))["'`]/.exec(source);

  return match?.[1];
}

function normalizeSpecifier(specifier: string): string {
  return specifier.replace(/\.vue$/, ".svelte");
}

function resolveComponent(
  specifier: string,
  root: string,
  addon: string,
  routerDir: string
): { specifier: string; file: string } {
  const normalized = normalizeSpecifier(specifier);
  let file: string;

  if (normalized.startsWith("@addon/")) {
    file = path.resolve(root, normalized.slice("@addon/".length));
  } else if (normalized.startsWith("@/")) {
    file = path.resolve(root, addon, "web", normalized.slice(2));
  } else if (normalized.startsWith(".")) {
    file = path.resolve(routerDir, normalized);
  } else if (path.isAbsolute(normalized)) {
    file = normalized;

    // Vite's SSR transform rewrites dynamic imports to root-relative paths
    // such as "/.tmp-addons/demo/..."; resolve those against the project root.
    const cwdFile = path.join(process.cwd(), normalized);

    if (!existsSync(file) && existsSync(cwdFile)) {
      file = cwdFile;
    }
  } else {
    file = path.resolve(root, addon, normalized);
  }

  const relative = path.relative(root, file).split(path.sep).join("/");

  return { specifier: `@addon/${relative}`, file };
}

export function collectNodes(
  nodes: AddonRouteNode[],
  parentUrl: string,
  section: Section,
  addon: string,
  root: string,
  routerDir: string,
  collector: RouteCollector
): void {
  for (const node of nodes) {
    const url = joinPath(parentUrl, node.path ?? "");
    const group = node.meta?.layout ?? SECTION_LAYOUT[section];
    const segments = segmentsFromUrl(convertPath(url));

    if (node.component) {
      const specifier = componentSpecifier(node.component);

      if (!specifier) {
        console.warn(`[addons] Skipping add-on route ${url}: component has no import`);
      } else {
        const resolved = resolveComponent(specifier, root, addon, routerDir);

        collector.add({
          name: node.name ?? segments,
          pattern: url,
          group,
          segments,
          root,
          component: resolved.specifier,
          props: node.props === true
        });
      }
    } else if (node.redirect) {
      collector.add({
        name: node.name ?? segments,
        pattern: url,
        group,
        segments,
        root,
        props: false,
        redirect: node.redirect
      });
    }

    if (node.children && node.children.length > 0) {
      collectNodes(node.children, url, section, addon, root, routerDir, collector);
    }
  }
}

export async function resolveComponents(routes: GeneratedRoute[]): Promise<GeneratedRoute[]> {
  const result: GeneratedRoute[] = [];

  for (const route of routes) {
    if (route.redirect === undefined && route.component !== undefined) {
      const target = path.resolve(route.root, route.component.slice("@addon/".length));

      if (!(await exists(target))) {
        console.warn(
          `[addons] Skipping add-on route ${route.pattern}: missing component ${path.relative(route.root, target)}`
        );
        continue;
      }
    }

    result.push(route);
  }

  return result;
}

export function resolveRedirects(routes: GeneratedRoute[], collector: RouteCollector): GeneratedRoute[] {
  return routes.filter((route) => {
    if (route.redirect === undefined) {
      return true;
    }

    if (collector.redirectTarget(route.redirect) === undefined) {
      console.warn(`[addons] Skipping add-on redirect ${route.pattern}: unknown target`);
      return false;
    }

    return true;
  });
}

function pageSource(component: string): string {
  return `<script lang="ts">
  import { page } from "$app/state";

  const component = import("${component}").then((module) => module.default);
</script>

{#await component then Component}
  <Component {...page.params} />
{/await}
`;
}

function propsLoadSource(): string {
  return `export function load({ params }: { params: Record<string, string> }): Record<string, string> {
  return params;
}
`;
}

function redirectLoadSource(target: string): string {
  return `import { redirect } from "@sveltejs/kit";

export function load(): never {
  redirect(307, "${target}");
}
`;
}

export async function writeRouteFiles(
  routesDir: string,
  routes: GeneratedRoute[],
  collector: RouteCollector
): Promise<string[]> {
  const files: string[] = [];

  for (const route of routes) {
    const dir = path.join(routesDir, `(${route.group})`, route.segments);

    if (route.redirect !== undefined) {
      const target = collector.redirectTarget(route.redirect);

      if (!target) {
        console.warn(`[addons] Skipping add-on redirect ${route.pattern}: unknown target`);
        continue;
      }

      const loadFile = path.join(dir, "+page.ts");
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(loadFile, redirectLoadSource(target));
      files.push(loadFile);
      continue;
    }

    if (route.component === undefined) {
      continue;
    }

    await fs.mkdir(dir, { recursive: true });

    const pageFile = path.join(dir, "+page.svelte");
    await fs.writeFile(pageFile, pageSource(route.component));
    files.push(pageFile);

    if (route.props) {
      const loadFile = path.join(dir, "+page.ts");
      await fs.writeFile(loadFile, propsLoadSource());
      files.push(loadFile);
    }
  }

  return files;
}
