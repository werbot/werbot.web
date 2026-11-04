import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { generateAddons } from "./generate";

const ADDON_ROOT = path.join(process.cwd(), ".tmp-addons");
const outputDirs: string[] = [];
let sequence = 0;

function nextName(prefix: string): string {
  sequence += 1;

  return `${prefix}-${sequence}`;
}

async function createOut(): Promise<string> {
  const root = await mkdtemp(path.join(process.cwd(), ".tmp-output-"));
  outputDirs.push(root);

  return root;
}

async function writeFileAt(file: string, content: string): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
}

async function addPage(addon: string, section: string, name: string, withSvelte = true): Promise<string> {
  const vue = path.join(ADDON_ROOT, addon, "web", "pages", section, `${name}.vue`);

  await writeFileAt(vue, "<template><div /></template>");

  if (withSvelte) {
    await writeFileAt(
      path.join(ADDON_ROOT, addon, "web", "pages", section, `${name}.svelte`),
      `<h1>${name}</h1>
`
    );
  }

  return `../../pages/${section}/${name}.vue`;
}

async function addAddon(addon: string, section: string, routes: string, menu?: string): Promise<void> {
  await writeFileAt(path.join(ADDON_ROOT, addon, "web", "router", section, "index.mjs"), routes);

  if (menu !== undefined) {
    await writeFileAt(path.join(ADDON_ROOT, addon, "web", "pages", section, "menu.ts"), menu);
  }
}

function pageFile(root: string, group: string, segments: string): string {
  return path.join(root, "src", "routes", `(${group})`, segments, "+page.svelte");
}

function routeModule(component: string, extra = ""): string {
  return `export const route = [
    {
      path: "/admin",
      meta: { layout: "private" },
      children: [
        {
          path: "license1",
          name: "admin-license1",
          component: () => import(${JSON.stringify(component)}),
          ${extra}
        }
      ]
    }
  ];`;
}

beforeEach(() => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(async () => {
  vi.restoreAllMocks();
  await rm(ADDON_ROOT, { recursive: true, force: true });
  await Promise.all(outputDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("generateAddons", () => {
  it("flattens nested add-on routes", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "license1");
    await addAddon(addon, "admin", routeModule(component));

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    const result = await generateAddons({ roots: [ADDON_ROOT], outDir });

    expect(result.routes).toBe(1);

    const registry = await readFile(path.join(outDir, "index.ts"), "utf8");
    expect(registry).toContain('"name": "admin-license1",\n    "pattern": "/admin/license1"');

    const page = await readFile(pageFile(out, "private", "admin/license1"), "utf8");
    expect(page).toContain(`@addon/${addon}/web/pages/admin/license1.svelte`);
  });

  it("converts params and optional params", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "detail");
    await addAddon(
      addon,
      "admin",
      `export const route = [
        {
          path: "/admin/:id",
          children: [
            {
              path: "detail/:tab?",
              name: "admin-detail",
              component: () => import(${JSON.stringify(component)})
            }
          ]
        }
      ];`
    );

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    await generateAddons({ roots: [ADDON_ROOT], outDir });

    const registry = await readFile(path.join(outDir, "index.ts"), "utf8");
    expect(registry).toContain('"pattern": "/admin/[id]/detail/[[tab]]"');
    await expect(readFile(pageFile(out, "private", "admin/[id]/detail/[[tab]]"), "utf8")).resolves.toContain(
      'import("@addon/'
    );
  });

  it("keeps the child layout override", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "license1");
    await addAddon(
      addon,
      "admin",
      `export const route = [
        {
          path: "/admin",
          meta: { layout: "private" },
          children: [
            {
              path: "license1",
              name: "admin-license1",
              meta: { layout: "auth" },
              component: () => import(${JSON.stringify(component)})
            }
          ]
        }
      ];`
    );

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    await generateAddons({ roots: [ADDON_ROOT], outDir });

    await expect(readFile(pageFile(out, "auth", "admin/license1"), "utf8")).resolves.toContain('import("@addon/');
  });

  it("writes a page file that imports the add-on svelte component", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "license1");
    await addAddon(addon, "admin", routeModule(component, "props: true"));

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    await generateAddons({ roots: [ADDON_ROOT], outDir });

    const page = await readFile(pageFile(out, "private", "admin/license1"), "utf8");
    expect(page).toContain(`import("@addon/${addon}/web/pages/admin/license1.svelte")`);
    expect(page).toContain("{...page.params}");

    const load = await readFile(path.join(out, "src", "routes", "(private)", "admin", "license1", "+page.ts"), "utf8");
    expect(load).toContain("return params");
  });

  it("throws on duplicate URL", async () => {
    const first = nextName("demo");
    const second = nextName("demo");
    const firstComponent = await addPage(first, "admin", "license1");
    const secondComponent = await addPage(second, "admin", "license1");
    await addAddon(first, "admin", routeModule(firstComponent));
    await addAddon(second, "admin", routeModule(secondComponent));

    const out = await createOut();

    await expect(
      generateAddons({ roots: [ADDON_ROOT], outDir: path.join(out, "src", "generated", "addons") })
    ).rejects.toThrow("Duplicate add-on route: /admin/license1");
  });

  it("emits empty registry when no add-ons exist", async () => {
    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");

    const result = await generateAddons({ roots: [], outDir });

    expect(result).toEqual({ routes: 0, menus: 0 });

    const registry = await readFile(path.join(outDir, "index.ts"), "utf8");
    expect(registry).toContain("export const routes: RouteDef[] = [];");
    expect(registry).toContain("export const menus: Record<MenuSection, MenuGroup[]> = {");
  });

  it("skips a route whose svelte component is missing", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "license1", false);
    await addAddon(addon, "admin", routeModule(component));

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    const result = await generateAddons({ roots: [ADDON_ROOT], outDir });

    expect(result.routes).toBe(0);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Skipping add-on route /admin/license1"));
    await expect(readFile(pageFile(out, "private", "admin/license1"), "utf8")).rejects.toThrow();
  });

  it("registers menu groups from an add-on and filters items with unknown routes", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "license1");
    await addAddon(
      addon,
      "admin",
      routeModule(component),
      `export const menu = {
        group20: [
          { name: "License 1", link: { name: "admin-license1" }, icon: "license" },
          { name: "Missing", link: { name: "admin-missing" }, icon: "license" }
        ]
      };`
    );

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    const result = await generateAddons({ roots: [ADDON_ROOT], outDir });

    expect(result.menus).toBe(1);

    const registry = await readFile(path.join(outDir, "index.ts"), "utf8");
    expect(registry).toContain('"name": "License 1"');
    expect(registry).not.toContain('"name": "Missing"');
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Skipping add-on menu item "Missing"'));
  });

  it("removes routes generated by a previous run", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "license1");
    await addAddon(addon, "admin", routeModule(component));

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    await generateAddons({ roots: [ADDON_ROOT], outDir });
    await expect(readFile(pageFile(out, "private", "admin/license1"), "utf8")).resolves.toContain("license1");

    await generateAddons({ roots: [], outDir });

    await expect(readFile(pageFile(out, "private", "admin/license1"), "utf8")).rejects.toThrow();
  });
});
