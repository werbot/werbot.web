import type { Page } from "@playwright/test";

/**
 * Credentials come from `fixtures/migration/20221122125822_init_data.sql`
 * (admin: `admin@werbot.net` / `admin@werbot.net`).
 *
 * The Vue `FormInput` component renders its label as a sibling of the input
 * without a `for`/`id` association, so the plan's accessible-name selectors
 * (`getByRole("textbox", { name: "Email" })`, `getByLabel("Password")`) match
 * nothing. The inputs are targeted by their `autocomplete` attributes instead.
 *
 * The dev backend throttles repeated sign-ins (`429 ResourceExhausted`), so the
 * tokens from the first successful sign-in are reused by later tests in the
 * same worker instead of signing in for every test.
 */
export async function login(page: Page): Promise<void> {
  if (session && !isExpiring(session.access_token)) {
    await adoptSession(page, session);
    return;
  }

  await signIn(page);
  session = await readSession(page);
}

interface Session {
  access_token: string;
  refresh_token: string;
}

let session: Session | null = null;

/** Refresh the cached tokens shortly before they expire. */
const EXPIRY_MARGIN_MS = 120_000;

function isExpiring(token: string): boolean {
  const payload = token.split(".")[1];

  if (!payload) {
    return true;
  }

  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: number };

    return !exp || exp * 1000 - Date.now() < EXPIRY_MARGIN_MS;
  } catch {
    return true;
  }
}

async function signIn(page: Page): Promise<void> {
  const attempts = 3;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    await open(page, "/auth/signin");

    await page.locator('input[autocomplete="username"]').fill("admin@werbot.net");
    await page.locator('input[autocomplete="current-password"]').fill("admin@werbot.net");
    await page.getByRole("button", { name: "Login" }).click();

    try {
      await page.waitForURL("/", { timeout: 10_000 });
      return;
    } catch (error) {
      if (attempt === attempts) {
        throw error;
      }
    }
  }
}

async function readSession(page: Page): Promise<Session> {
  const stored = await page.evaluate(() => ({
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token")
  }));

  if (!stored.access_token || !stored.refresh_token) {
    throw new Error("the sign-in response did not store tokens");
  }

  return { access_token: stored.access_token, refresh_token: stored.refresh_token };
}

async function adoptSession(page: Page, stored: Session): Promise<void> {
  await page.goto("/auth/signin");
  await page.evaluate((tokens) => {
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
  }, stored);

  await open(page, "/");
}

/** First element every layout paints: `.content`/`.artboard` (private), `.card` (auth), `h1` (404). */
const RENDERED = ".content, .card, .artboard, h1";

export async function waitForRendered(page: Page, timeout = 10_000): Promise<void> {
  await page.locator(RENDERED).first().waitFor({ state: "visible", timeout });
  await page.waitForLoadState("networkidle");
  await page.waitForFunction(() => document.fonts.status === "loaded");
}

/**
 * Force the Vue root to re-render.
 *
 * The current Vue app sometimes loses the race between `app.mount()` and the
 * async layout import in `router.beforeEach`: the route resolves, but `App.vue`
 * keeps a placeholder vnode (`<!--[object Object]-->`) instead of the layout, so
 * the page stays blank after a full load (almost always for `/admin/**`). The
 * root instance already holds the resolved route, so a forced update paints it.
 */
async function repaint(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const app = (
      document.querySelector("#app") as
        | (Element & { __vue_app__?: { _instance?: { proxy?: { $forceUpdate?: () => void } } } })
        | null
    )?.__vue_app__;

    const forceUpdate = app?._instance?.proxy?.$forceUpdate;

    if (!forceUpdate) {
      return false;
    }

    forceUpdate();
    return true;
  });
}

interface OpenOptions {
  /**
   * Allow the route to stay blank. Used by routes whose Vue page throws while
   * rendering: their baseline records the blank page the current app shows.
   */
  allowBlank?: boolean;
}

/**
 * Open a route and wait until it is painted.
 *
 * A plain page load is used first. When it leaves the blank page described in
 * `repaint`, the root is repainted, which is enough to show the loaded route.
 * The repaint is only reached while the Vue app has this defect; later tasks
 * are expected to paint on a plain `goto`.
 */
export async function open(page: Page, path: string, options: OpenOptions = {}): Promise<void> {
  await page.goto(path);

  try {
    await waitForRendered(page, 3_000);
    return;
  } catch {
    // fall through to the repaint below
  }

  if (!(await repaint(page))) {
    throw new Error(`the app did not mount on ${path}`);
  }

  try {
    await waitForRendered(page, options.allowBlank ? 2_000 : 10_000);
  } catch (error) {
    if (!options.allowBlank) {
      throw error;
    }

    // Let the failed render settle so the screenshot is stable.
    await page.waitForTimeout(500);
  }
}
