import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    // Component tests run in jsdom and must import the browser build of svelte.
    conditions: ["browser"]
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,js}", "scripts/**/*.test.ts"],
    setupFiles: ["./src/lib/test/setup.ts"]
  }
});
