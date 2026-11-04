import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import type { Manifest } from "./types";

let importCounter = 0;

export async function exists(file: string): Promise<boolean> {
  try {
    await fs.access(file);

    return true;
  } catch {
    return false;
  }
}

export async function listDirectories(root: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(root, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort();
  } catch {
    console.warn(`[addons] Skipping missing add-on root: ${root}`);

    return [];
  }
}

export async function importModule(file: string): Promise<Record<string, unknown>> {
  importCounter += 1;

  // Bun resolves file URLs and keeps the cache-busting query (the CLI runs in
  // Bun before svelte-kit sync). Vitest's resolver cannot load a file URL with
  // a query, and every fixture path is unique there, so plain paths are safe.
  if (typeof (globalThis as { Bun?: unknown }).Bun === "undefined") {
    return import(file);
  }

  return import(`${pathToFileURL(file).href}?v=${Date.now()}-${importCounter}`);
}

export async function readManifest(file: string): Promise<string[]> {
  try {
    const manifest = JSON.parse(await fs.readFile(file, "utf8")) as Manifest;

    return manifest.files ?? [];
  } catch {
    return [];
  }
}

export async function removeGenerated(files: string[], routesDir: string): Promise<void> {
  for (const file of files) {
    await fs.rm(file, { force: true });

    let dir = path.dirname(file);

    while (dir.startsWith(routesDir) && dir !== routesDir) {
      try {
        await fs.rmdir(dir);
      } catch {
        break;
      }

      dir = path.dirname(dir);
    }
  }
}
