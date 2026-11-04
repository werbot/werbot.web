import type { Page } from "@playwright/test";

/**
 * Credentials come from `fixtures/migration/20221122125822_init_data.sql`
 * (admin: `admin@werbot.net` / `admin@werbot.net`).
 *
 * The shared `Input` component renders its label as a sibling of the input
 * without a `for`/`id` association (kept for layout parity), so
 * `getByLabel("Password")` matches nothing. The inputs are targeted by their
 * `autocomplete` attributes instead.
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

/** Budget for a cold dev server to compile and paint the route. */
const FIRST_PAINT_TIMEOUT_MS = 15_000;

/** Open a route and wait until a layout is painted and webfonts have settled. */
export async function open(page: Page, path: string): Promise<void> {
  await page.goto(path);

  try {
    await page.waitForLoadState("domcontentloaded");
    await page.locator(RENDERED).first().waitFor({ state: "visible", timeout: FIRST_PAINT_TIMEOUT_MS });
  } catch (error) {
    throw new Error(`${(error as Error).message} on ${path}`);
  }

  await page.waitForFunction(() => document.fonts.status === "loaded");
}
