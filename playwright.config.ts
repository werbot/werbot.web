import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  timeout: 60_000,

  snapshotPathTemplate: "e2e/baselines/{arg}{ext}",

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: "disabled"
    }
  },

  use: {
    baseURL: process.env.WEB_BASE_URL ?? "http://localhost:5173",
    viewport: { width: 1440, height: 900 },
    screenshot: "only-on-failure"
  },

  webServer: process.env.WEB_BASE_URL
    ? undefined
    : {
        command: "bun run dev -- --port 5173",
        url: "http://localhost:5173",
        reuseExistingServer: true
      }
});
