import { expect, test } from "@playwright/test";
import { login, open } from "./fixtures";
import { HAS_SAAS_ADDON, ROUTES } from "./routes";

/** Volatile content is masked so the baseline stays stable across runs. */
const MASK = "[data-visual-mask], time";

for (const route of ROUTES) {
  /** Admin baselines include the `add-on/saas` sidebar entries, so they need the add-on. */
  const needsSaasAddon = route.path.startsWith("/admin") && !HAS_SAAS_ADDON;

  test.describe(route.id, () => {
    test.skip(needsSaasAddon, "admin baselines include the add-on/saas menu; check the add-on out to run them");

    if (route.auth) {
      test.beforeEach(async ({ page }) => {
        await login(page);
      });
    }

    test(`${route.path} matches its baseline`, async ({ page }) => {
      await open(page, route.path);

      await expect(page).toHaveScreenshot(`${route.id}.png`, {
        mask: [page.locator(MASK)]
      });
    });
  });
}
