import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// The generator reads ADDON_ROOTS; the alias must point at the same checkout
// so generated `@addon/<name>/...` imports resolve (e.g. fixture runs).
import { addonRoot } from "./addon-root.js";

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ fallback: "index.html" }),
    alias: {
      "@": "src",
      "@proto": "src/proto",
      "@addon": addonRoot,
      "@addon-kit": "src/lib/addons/kit.ts"
    }
  }
};
