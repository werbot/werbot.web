import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ROUTES } from "../../src/lib/navigation/registry";
import { exists, importModule, listDirectories, readManifest, removeGenerated } from "./fs-utils";
import { collectMenus, registrySource } from "./menus";
import { RouteCollector } from "./paths";
import { collectNodes, resolveComponents, resolveRedirects, writeRouteFiles } from "./routes";
import { type GeneratedMenu, type GeneratedRoute, type RouteModule, SECTIONS } from "./types";

export type GenerateAddonsOptions = {
  roots: string[];
  outDir: string;
};

export type GenerateAddonsResult = {
  routes: number;
  menus: number;
};

export async function generateAddons(options: GenerateAddonsOptions): Promise<GenerateAddonsResult> {
  const outDir = path.resolve(options.outDir);
  const routesDir = path.resolve(outDir, "../../routes");
  const manifestFile = path.join(outDir, "manifest.json");
  const previous = await readManifest(manifestFile);

  await removeGenerated(previous, routesDir);
  await fs.mkdir(outDir, { recursive: true });

  const collector = new RouteCollector();
  const scans: Array<{ root: string; addons: string[] }> = [];
  const discovered: GeneratedRoute[] = [];
  const menus: GeneratedMenu[] = [];
  let menuCount = 0;

  for (const rawRoot of options.roots) {
    const root = path.resolve(rawRoot);

    scans.push({ root, addons: await listDirectories(root) });
  }

  for (const { root, addons } of scans) {
    for (const addon of addons) {
      for (const section of SECTIONS) {
        const routerFile = path.join(root, addon, "web", "router", section, "index.mjs");

        if (!(await exists(routerFile))) {
          continue;
        }

        try {
          const module = (await importModule(routerFile)) as RouteModule;

          collectNodes(module.route ?? [], "", section, addon, root, path.dirname(routerFile), collector);
        } catch (error) {
          if ((error as Error).message?.startsWith("Duplicate add-on route:")) {
            throw error;
          }

          console.warn(`[addons] Skipping add-on router ${routerFile}: ${(error as Error).message}`);
        }
      }
    }
  }

  discovered.push(...collector.values());

  const componentsResolved = await resolveComponents(discovered);
  const targetCollector = new RouteCollector();

  for (const route of componentsResolved) {
    targetCollector.add(route);
  }

  const resolved = resolveRedirects(componentsResolved, targetCollector);

  // Rebuild the collector after skipping routes without a target component so
  // redirects and menus never point at a route that was not emitted.
  const finalCollector = new RouteCollector();

  for (const route of resolved) {
    finalCollector.add(route);
  }

  const known = new Set<string>(ROUTES.map((route) => route.name));

  for (const route of resolved) {
    known.add(route.name);
  }

  for (const { root, addons } of scans) {
    for (const addon of addons) {
      const collected = await collectMenus(root, addon, known);

      menus.push(...collected.menus);
      menuCount += collected.count;
    }
  }

  const routeFiles = await writeRouteFiles(routesDir, resolved, finalCollector);
  const registryFile = path.join(outDir, "index.ts");

  await fs.writeFile(registryFile, registrySource(resolved, menus));
  await fs.writeFile(
    manifestFile,
    `${JSON.stringify({ files: [...routeFiles, registryFile, manifestFile] }, null, 2)}\n`
  );

  return { routes: resolved.length, menus: menuCount };
}

function parseRoots(raw: string | undefined): string[] {
  if (raw === undefined) {
    return ["../add-on"];
  }

  return raw.split(":").filter(Boolean);
}

function argumentValue(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);

  return index === -1 ? undefined : args[index + 1];
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const rawRoots = argumentValue(args, "--roots") ?? process.env.ADDON_ROOTS;
  const outDir = argumentValue(args, "--outDir") ?? "src/generated/addons";
  const roots = parseRoots(rawRoots);
  const result = await generateAddons({ roots, outDir });

  console.log(`[addons] Generated ${result.routes} route(s) and ${result.menus} menu item(s)`);
}

const entry = process.argv[1] ? path.resolve(process.argv[1]) : "";

if (entry === path.resolve(fileURLToPath(import.meta.url))) {
  await main();
}
