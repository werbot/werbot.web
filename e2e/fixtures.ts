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

/** Delay before each sign-in retry; the backend answers `429` on bursts. */
const SIGN_IN_BACKOFF_MS = [2_000, 5_000];

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
  const attempts = SIGN_IN_BACKOFF_MS.length + 1;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    await open(page, "/auth/signin");

    await page.locator('input[autocomplete="username"]').fill("admin@werbot.net");
    await page.locator('input[autocomplete="current-password"]').fill("admin@werbot.net");

    const responsePromise = page
      .waitForResponse(
        (response) => response.request().method() === "POST" && new URL(response.url()).pathname === "/auth/signin",
        { timeout: 15_000 }
      )
      .catch(() => null);

    await page.getByRole("button", { name: "Login" }).click();

    try {
      await page.waitForURL("/", { timeout: 10_000 });
      return;
    } catch (error) {
      const response = await responsePromise;
      const details = response
        ? `${response.status()} ${(await response.text().catch(() => "")).slice(0, 300)}`
        : "no response";
      console.warn(`[e2e] sign-in attempt ${attempt}/${attempts} failed: ${details}`);

      if (attempt === attempts) {
        throw error;
      }

      await page.waitForTimeout(SIGN_IN_BACKOFF_MS[attempt - 1]);
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

async function waitForRendered(page: Page, timeout: number): Promise<void> {
  await page.waitForLoadState("domcontentloaded");
  await page.locator(RENDERED).first().waitFor({ state: "visible", timeout });
  await page.waitForFunction(() => document.fonts.status === "loaded");
}

async function isRendered(page: Page): Promise<boolean> {
  return page
    .locator(RENDERED)
    .first()
    .isVisible()
    .catch(() => false);
}

async function hasMountedApp(page: Page): Promise<boolean> {
  return page.evaluate(() => (document.querySelector("#app")?.childNodes.length ?? 0) > 0);
}

/**
 * Force the Vue root to re-render.
 *
 * The current Vue app sometimes loses the race between `app.mount()` and the
 * async layout import in `router.beforeEach`: the route resolves, but `App.vue`
 * keeps a placeholder vnode (`<!--[object Object]-->`) instead of the layout, so
 * the page stays blank after a full load (almost always for `/admin/**`). The
 * root instance already holds the resolved route, so a forced update paints it.
 *
 * TODO(sveltekit-task-17): remove after Vue app is gone.
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

/** How long a route gets to paint before the Vue placeholder bug is suspected. */
const FIRST_PAINT_TIMEOUT_MS = 8_000;

/** How long a mounted app may stay unpainted before it is treated as the placeholder bug. */
const MOUNT_GRACE_MS = 1_500;

type FirstPaint = "rendered" | "stalled";

/**
 * Poll the route after a page load.
 *
 * Returns `rendered` as soon as a layout is visible. Returns `stalled` when the
 * app mounted but stayed unpainted past the grace period (the Vue placeholder
 * bug), or when the first-paint budget ran out with a mounted app. Throws when
 * nothing mounted at all.
 */
async function waitForFirstPaint(page: Page): Promise<FirstPaint> {
  const deadline = Date.now() + FIRST_PAINT_TIMEOUT_MS;
  let mountedAt: number | null = null;

  while (Date.now() < deadline) {
    if (await isRendered(page)) {
      return "rendered";
    }

    if (await hasMountedApp(page)) {
      mountedAt ??= Date.now();

      if (Date.now() - mountedAt >= MOUNT_GRACE_MS) {
        return "stalled";
      }
    }

    await page.waitForTimeout(100);
  }

  if (await hasMountedApp(page)) {
    return "stalled";
  }

  throw new Error(`the app did not mount within ${FIRST_PAINT_TIMEOUT_MS}ms`);
}

/**
 * Open a route and wait until it is painted.
 *
 * A plain page load is used first, with a generous timeout for a cold dev
 * server. Only when the app has mounted but nothing is painted is the Vue
 * placeholder bug (`repaint`) suspected; an app that never mounts reports the
 * original timeout instead of a misleading repaint error.
 */
export async function open(page: Page, path: string, options: OpenOptions = {}): Promise<void> {
  await page.goto(path);

  let paint: FirstPaint;

  try {
    paint = await waitForFirstPaint(page);
  } catch (error) {
    throw new Error(`${(error as Error).message} on ${path}`);
  }

  if (paint === "rendered") {
    await page.waitForFunction(() => document.fonts.status === "loaded");
    return;
  }

  if (!(await repaint(page))) {
    throw new Error(`the app mounted on ${path} but exposes no Vue root to repaint`);
  }

  try {
    await waitForRendered(page, options.allowBlank ? 2_000 : 15_000);
  } catch (error) {
    if (!options.allowBlank) {
      throw error;
    }

    // Let the failed render settle so the screenshot is stable.
    await page.waitForTimeout(500);
  }
}
