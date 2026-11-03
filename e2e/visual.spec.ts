import { expect, test } from "@playwright/test";
import { login, open } from "./fixtures";
import { ROUTES } from "./routes";

/** Volatile content is masked so the baseline stays stable across runs. */
const MASK = "[data-visual-mask], time";

for (const route of ROUTES) {
  test.describe(route.id, () => {
    if (route.auth) {
      test.beforeEach(async ({ page }) => {
        await login(page);
      });
    }

    test(`${route.path} matches its baseline`, async ({ page }) => {
      await open(page, route.path, { allowBlank: route.blank === true });

      await expect(page).toHaveScreenshot(`${route.id}.png`, {
        mask: [page.locator(MASK)]
      });
    });
  });
}
