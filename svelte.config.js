import path from "node:path";
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// The generator reads ADDON_ROOTS; the alias must point at the same checkout
// so generated `@addon/<name>/...` imports resolve (e.g. fixture runs).
const [addonRoot] = (process.env.ADDON_ROOTS ?? "").split(":").filter(Boolean);
const addonAlias = path.resolve(addonRoot ?? "../add-on");

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ fallback: "index.html" }),
    alias: {
      "@": "src",
      "@proto": "src/proto",
      "@addon": addonAlias,
      "@addon-kit": "src/lib/addons/kit.ts"
    }
  }
};
