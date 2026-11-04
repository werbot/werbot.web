import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { scanFile } from "./check-no-vue";

let directory: string;

function file(name: string): string {
  return path.join(directory, name);
}

async function scan(name: string, content: string): Promise<number> {
  const target = file(name);

  await writeFile(target, content);

  return (await scanFile(target, name)).length;
}

beforeEach(async () => {
  directory = await mkdtemp(path.join(os.tmpdir(), "no-vue-"));
});

afterEach(async () => {
  await rm(directory, { recursive: true, force: true });
});

describe("no-Vue check", () => {
  it("accepts Svelte and TypeScript sources", async () => {
    expect(await scan("page.svelte", '<script lang="ts">import { page } from "$app/state";</script>')).toBe(0);
    expect(await scan("store.ts", 'import { writable } from "svelte/store";')).toBe(0);
  });

  it("rejects Vue, Vue Router, Pinia, VueUse and Notiwind imports", async () => {
    for (const pkg of ["vue", "vue-router", "pinia", "@vueuse/core", "notiwind"]) {
      expect(await scan(`uses-${pkg.replace(/\W/g, "-")}.ts`, `import { x } from "${pkg}";`)).toBe(1);
    }
  });

  it("rejects side-effect imports", async () => {
    const pkg = "pinia";

    expect(await scan("side-effect.ts", `import "${pkg}";`)).toBe(1);
  });

  it("rejects a Vue single-file component", async () => {
    expect(await scan("Legacy.vue", "<template><div /></template>")).toBe(1);
  });

  it("rejects component imports that still point at a .vue file", async () => {
    const extension = "vue";

    expect(await scan("router.mjs", `export const route = () => import("./pages/legacy.${extension}");`)).toBe(1);
  });

  it("rejects a Vue dependency in package.json", async () => {
    expect(await scan("package.json", JSON.stringify({ devDependencies: { vue: "^3.0.0" } }))).toBe(1);
  });

  it("rejects a Vue CLI script but allows this check's own name", async () => {
    expect(await scan("package.json", JSON.stringify({ scripts: { build: "vue-tsc && vite build" } }))).toBe(1);
    expect(await scan("package.json", JSON.stringify({ scripts: { lint: "bun scripts/check-no-vue.ts" } }))).toBe(0);
  });
});
