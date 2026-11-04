import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Fails when Vue survives in the repository.
 *
 * ESLint covers imports in files it visits. This check also covers add-on web
 * folders (which live outside this project) and package files, and it rejects
 * any `.vue` component file.
 */

const BANNED_PACKAGES = [
  "vue",
  "vue-router",
  "pinia",
  "@vueuse/core",
  "notiwind",
  "@vitejs/plugin-vue",
  "vue-tsc",
  "vue-eslint-parser",
  "eslint-plugin-vue"
];

const SCANNED_EXTENSIONS = new Set([".js", ".mjs", ".cjs", ".ts", ".svelte", ".html", ".css"]);
const SKIPPED_DIRECTORIES = new Set([
  ".git",
  ".svelte-kit",
  ".superpowers",
  "baselines",
  "build",
  "dist",
  "node_modules",
  "playwright-report",
  "proto",
  "test-results"
]);

const projectRoot = path.resolve(import.meta.dirname, "..");
const skipDirectories = new Set([path.join(projectRoot, "src", "generated")]);

export type Finding = { file: string; line: number; detail: string };

function packagePattern(pkg: string): RegExp {
  const escaped = pkg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return new RegExp(`(?:from\\s*|require\\s*\\(\\s*|import\\s*\\(\\s*|import\\s+)["']${escaped}(?:/[^"']*)?["']`);
}

const IMPORT_PATTERNS = BANNED_PACKAGES.map(packagePattern);
const VUE_COMPONENT_PATTERN = /(?:from\s*|import\s*\(\s*)["'][^"']+\.vue["']/;

function listAddonWebRoots(): Promise<string[]> {
  const root = path.resolve(projectRoot, "..", "add-on");

  return fs
    .readdir(root, { withFileTypes: true })
    .then((entries) =>
      entries.filter((entry) => entry.isDirectory()).map((entry) => path.join(root, entry.name, "web"))
    )
    .catch(() => []);
}

async function walk(directory: string): Promise<string[]> {
  let entries;

  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }

  const files: string[] = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);

    if (entry.name.startsWith(".") || SKIPPED_DIRECTORIES.has(entry.name) || skipDirectories.has(absolute)) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...(await walk(absolute)));
    } else {
      files.push(absolute);
    }
  }

  return files;
}

async function scanPackageFile(file: string, relative: string): Promise<Finding[]> {
  const parsed = JSON.parse(await fs.readFile(file, "utf8")) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    scripts?: Record<string, string>;
  };
  const findings: Finding[] = [];
  const dependencies = { ...parsed.dependencies, ...parsed.devDependencies };

  for (const name of Object.keys(dependencies)) {
    if (BANNED_PACKAGES.some((pkg) => name === pkg || name.startsWith(`${pkg}/`))) {
      findings.push({ file: relative, line: 0, detail: `dependency ${name}` });
    }
  }

  for (const [name, value] of Object.entries(parsed.scripts ?? {})) {
    const usesBannedCommand = BANNED_PACKAGES.some((pkg) => {
      const escaped = pkg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      return new RegExp(`(?:^|\\s)${escaped}(?:\\s|$)`).test(value);
    });

    if (usesBannedCommand) {
      findings.push({ file: relative, line: 0, detail: `script ${name}: ${value}` });
    }
  }

  return findings;
}

export async function scanFile(file: string, relative: string): Promise<Finding[]> {
  if (path.basename(file) === "package.json") {
    return scanPackageFile(file, relative);
  }

  if (path.extname(file) === ".vue") {
    return [{ file: relative, line: 0, detail: "Vue single-file component" }];
  }

  if (!SCANNED_EXTENSIONS.has(path.extname(file))) {
    return [];
  }

  const findings: Finding[] = [];
  const lines = (await fs.readFile(file, "utf8")).split("\n");

  lines.forEach((line, index) => {
    if (IMPORT_PATTERNS.some((pattern) => pattern.test(line)) || VUE_COMPONENT_PATTERN.test(line)) {
      findings.push({ file: relative, line: index + 1, detail: line.trim() });
    }
  });

  return findings;
}

function report(findings: Finding[]): void {
  for (const finding of findings) {
    const location = finding.line > 0 ? `${finding.file}:${finding.line}` : finding.file;

    console.error(`${location}: ${finding.detail}`);
  }

  console.error(`\nFound ${findings.length} Vue reference(s). The SvelteKit migration forbids them.`);
}

export async function collectFindings(): Promise<Finding[]> {
  const addonRoots = await listAddonWebRoots();
  const files = [...(await walk(projectRoot)), ...(await Promise.all(addonRoots.map((root) => walk(root)))).flat()];
  const findings: Finding[] = [];

  for (const file of files) {
    findings.push(...(await scanFile(file, path.relative(projectRoot, file))));
  }

  return findings;
}

async function main(): Promise<void> {
  const findings = await collectFindings();

  if (findings.length > 0) {
    report(findings);
    process.exit(1);
  }

  console.log("[no-vue] No Vue references found.");
}

const entry = process.argv[1] ? path.resolve(process.argv[1]) : "";

if (entry === path.resolve(import.meta.dirname, "check-no-vue.ts")) {
  await main();
}
