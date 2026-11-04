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

  it("passes params only when props is true", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "license1");
    await addAddon(addon, "admin", routeModule(component, "props: true"));

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    await generateAddons({ roots: [ADDON_ROOT], outDir });

    const page = await readFile(pageFile(out, "private", "admin/license1"), "utf8");
    expect(page).toContain(`import("@addon/${addon}/web/pages/admin/license1.svelte")`);
    expect(page).toContain("{...page.params}");
    expect(page).toContain("{:catch error}");

    await expect(
      readFile(path.join(out, "src", "routes", "(private)", "admin", "license1", "+page.ts"), "utf8")
    ).rejects.toThrow();
  });

  it("does not pass params when props is false", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "license1");
    await addAddon(addon, "admin", routeModule(component));

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    await generateAddons({ roots: [ADDON_ROOT], outDir });

    const page = await readFile(pageFile(out, "private", "admin/license1"), "utf8");
    expect(page).toContain("<Component />");
    expect(page).not.toContain("page.params");
    expect(page).not.toContain('from "$app/state"');
  });

  it("writes a redirect load file for a named target", async () => {
    const addon = nextName("demo");
    await addAddon(
      addon,
      "admin",
      `export const route = [
        {
          path: "/admin",
          children: [
            {
              path: "redirect",
              name: "admin-redirect",
              redirect: { name: "admin-settings" }
            }
          ]
        }
      ];`
    );

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    await generateAddons({ roots: [ADDON_ROOT], outDir });

    const registry = await readFile(path.join(outDir, "index.ts"), "utf8");
    expect(registry).toContain('"pattern": "/admin/redirect"');

    const load = await readFile(path.join(out, "src", "routes", "(private)", "admin", "redirect", "+page.ts"), "utf8");
    expect(load).toContain('redirect(307, "/admin/settings")');
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

  it("rejects more than one add-on root", async () => {
    const first = await createOut();
    const second = await createOut();

    await expect(
      generateAddons({
        roots: [first, second],
        outDir: path.join(first, "src", "generated", "addons")
      })
    ).rejects.toThrow("supports exactly one root");
  });

  it("rejects URLs and names that collide with core routes", async () => {
    const urlAddon = nextName("demo");
    const urlComponent = await addPage(urlAddon, "admin", "users");
    await addAddon(
      urlAddon,
      "admin",
      `export const route = [
        { path: "/admin", children: [
          { path: "users", name: "addon-admin-users", component: () => import(${JSON.stringify(urlComponent)}) }
        ] }
      ];`
    );

    const urlOut = await createOut();
    await expect(
      generateAddons({ roots: [ADDON_ROOT], outDir: path.join(urlOut, "src", "generated", "addons") })
    ).rejects.toThrow("Add-on route collides with core route: /admin/users");

    await rm(ADDON_ROOT, { recursive: true, force: true });

    const nameAddon = nextName("demo");
    const nameComponent = await addPage(nameAddon, "admin", "extra");
    await addAddon(
      nameAddon,
      "admin",
      `export const route = [
        { path: "/admin", children: [
          { path: "extra", name: "admin-users", component: () => import(${JSON.stringify(nameComponent)}) }
        ] }
      ];`
    );

    const nameOut = await createOut();
    await expect(
      generateAddons({ roots: [ADDON_ROOT], outDir: path.join(nameOut, "src", "generated", "addons") })
    ).rejects.toThrow("Add-on route name collides with core route: admin-users");
  });

  it("refuses to overwrite a route file it did not generate", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "manual");
    await addAddon(
      addon,
      "admin",
      `export const route = [
        { path: "/admin", children: [
          { path: "manual", name: "admin-manual", component: () => import(${JSON.stringify(component)}) }
        ] }
      ];`
    );

    const out = await createOut();
    const manualFile = pageFile(out, "private", "admin/manual");
    await writeFileAt(manualFile, "<h1>host page</h1>");

    await expect(
      generateAddons({ roots: [ADDON_ROOT], outDir: path.join(out, "src", "generated", "addons") })
    ).rejects.toThrow("Refusing to overwrite existing route file");
    await expect(readFile(manualFile, "utf8")).resolves.toContain("host page");
  });

  it("falls back to the section default for an unsupported layout", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "wizard");
    await addAddon(
      addon,
      "admin",
      `export const route = [
        { path: "/admin", meta: { layout: "private" }, children: [
          {
            path: "wizard",
            name: "admin-wizard",
            meta: { layout: "wizard" },
            component: () => import(${JSON.stringify(component)})
          }
        ] }
      ];`
    );

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    await generateAddons({ roots: [ADDON_ROOT], outDir });

    await expect(readFile(pageFile(out, "private", "admin/wizard"), "utf8")).resolves.toContain("import(");
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Unknown layout "wizard"'));
  });

  it("roots an absolute child path instead of joining it", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "absolute");
    await addAddon(
      addon,
      "admin",
      `export const route = [
        { path: "/admin", children: [
          { path: "/absolute", name: "admin-absolute", component: () => import(${JSON.stringify(component)}) }
        ] }
      ];`
    );

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    await generateAddons({ roots: [ADDON_ROOT], outDir });

    const registry = await readFile(path.join(outDir, "index.ts"), "utf8");
    expect(registry).toContain('"pattern": "/absolute"');
    await expect(readFile(pageFile(out, "private", "absolute"), "utf8")).resolves.toContain("import(");
  });

  it("warns about duplicate add-on route names", async () => {
    const addon = nextName("demo");
    const first = await addPage(addon, "admin", "first");
    const second = await addPage(addon, "admin", "second");
    await addAddon(
      addon,
      "admin",
      `export const route = [
        { path: "/admin", children: [
          { path: "first", name: "admin-dup", component: () => import(${JSON.stringify(first)}) },
          { path: "second", name: "admin-dup", component: () => import(${JSON.stringify(second)}) }
        ] }
      ];`
    );

    const out = await createOut();
    await generateAddons({ roots: [ADDON_ROOT], outDir: path.join(out, "src", "generated", "addons") });

    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Duplicate add-on route name "admin-dup"'));
  });

  it("stores relative manifest paths and writes a managed routes gitignore", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "license1");
    await addAddon(addon, "admin", routeModule(component));

    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    await generateAddons({ roots: [ADDON_ROOT], outDir });

    const manifest = JSON.parse(await readFile(path.join(outDir, "manifest.json"), "utf8")) as {
      files: string[];
    };

    expect(manifest.files.length).toBeGreaterThan(0);
    expect(manifest.files.every((file) => !path.isAbsolute(file))).toBe(true);

    const gitignore = await readFile(path.join(out, "src", "routes", ".gitignore"), "utf8");
    expect(gitignore).toContain("/(private)/admin/license1/+page.svelte");
  });

  it("escapes glob characters in the managed routes gitignore", async () => {
    const addon = nextName("demo");
    const component = await addPage(addon, "admin", "detail");
    await addAddon(
      addon,
      "admin",
      `export const route = [
        { path: "/admin/:id", children: [
          { path: "detail", name: "admin-detail", component: () => import(${JSON.stringify(component)}) }
        ] }
      ];`
    );

    const out = await createOut();
    await generateAddons({ roots: [ADDON_ROOT], outDir: path.join(out, "src", "generated", "addons") });

    const gitignore = await readFile(path.join(out, "src", "routes", ".gitignore"), "utf8");
    expect(gitignore).toContain("/(private)/admin/\\[id\\]/detail/+page.svelte");
  });

  it("generates the checked-in fixture add-on and exposes the add-on kit surface", async () => {
    const out = await createOut();
    const outDir = path.join(out, "src", "generated", "addons");
    const result = await generateAddons({
      roots: [path.join(process.cwd(), "e2e", "fixtures")],
      outDir
    });

    expect(result.routes).toBe(1);
    expect(result.menus).toBe(1);

    const page = await readFile(pageFile(out, "private", "admin/fixture"), "utf8");
    expect(page).toContain('import("@addon/addon/web/pages/admin/fixture.svelte")');

    const kit = await import("../../src/lib/addons/kit");
    for (const name of [
      "gotoRoute",
      "routePath",
      "isActiveRoute",
      "authStore",
      "systemStore",
      "projectStore",
      "getMenu",
      "menuHref"
    ]) {
      expect(kit).toHaveProperty(name);
    }
  });
});
