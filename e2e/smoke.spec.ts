import { expect, test } from "@playwright/test";
import { login, open } from "./fixtures";
import { HAS_SAAS_ADDON } from "./routes";

const PROJECT = "/projects/2bef1080-cd6e-49e5-8042-1224cf6a3da9";

test("sign-in lands on the dashboard", async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL("/");
});

test("sidebar shows profile groups", async ({ page }) => {
  await login(page);
  await open(page, "/profile/setting");

  const sidebar = page.locator("nav.sidebar");
  await expect(sidebar.getByRole("link", { name: "Settings" })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "SSH keys" })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "Logs" })).toBeVisible();
});

test("sidebar shows project groups", async ({ page }) => {
  await login(page);
  await open(page, PROJECT);

  const sidebar = page.locator("nav.sidebar");
  await expect(sidebar.getByRole("link", { name: "Servers" })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "Members" })).toBeVisible();
  // Group separator between the resource and project groups.
  await expect(sidebar.locator("hr").first()).toBeVisible();
});

test("admin user sees the admin menu", async ({ page }) => {
  await login(page);
  await open(page, "/admin");

  const sidebar = page.locator("nav.sidebar");
  await expect(sidebar.getByRole("link", { name: "Users" })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "Projects" })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "Subscriptions" })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "License", exact: true })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "Settings" })).toBeVisible();

  if (HAS_SAAS_ADDON) {
    await expect(sidebar.getByRole("link", { name: "SaaS License 1" })).toBeVisible();
    await expect(sidebar.getByRole("link", { name: "SaaS License 2" })).toBeVisible();
  }
});

test("admin add-on page renders its heading", async ({ page }) => {
  test.skip(!HAS_SAAS_ADDON, "saas add-on is not checked out");

  await login(page);
  await open(page, "/admin/license1");

  await expect(page.getByRole("heading", { name: "License 1 SaaS" })).toBeVisible();
  await expect(page).toHaveTitle("License");
});

test("profile logs list renders events", async ({ page }) => {
  await login(page);
  await open(page, "/profile/logs");

  const rows = page.locator(".artboard table tbody tr");
  await expect(rows.first()).toBeVisible();
  expect(await rows.count()).toBeGreaterThan(0);

  await rows.first().click();
  await expect(page.locator(".drawer__content")).toBeVisible();
});

test("profile keys list renders keys", async ({ page }) => {
  await login(page);
  await open(page, "/profile/keys");

  const rows = page.locator(".artboard table tbody tr");
  await expect(rows.first()).toBeVisible();
  expect(await rows.count()).toBeGreaterThan(0);
});

test("server add scheme shows readable auth labels", async ({ page }) => {
  await login(page);
  await open(page, `${PROJECT}/servers/add/server_ssh`);

  const dropdown = page.locator(".form-dropdown button");
  await dropdown.click();
  await expect(page.getByRole("listitem").filter({ hasText: "Password" })).toBeVisible();
  await expect(page.getByRole("listitem").filter({ hasText: "Key" })).toBeVisible();
});

test("activity drag does not leave text selected", async ({ page }) => {
  await login(page);
  await open(page, `${PROJECT}/servers/1f503895-7d76-49f6-ab53-d60a650bcc1d/activity`);

  const cell = page.locator(".worktime-hours-item").first();
  const box = await cell.boundingBox();
  if (!box) {
    throw new Error("activity cell has no bounding box");
  }
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down({ button: "right" });
  await page.mouse.move(box.x + box.width * 2, box.y + box.height / 2);
  await page.mouse.up({ button: "right" });

  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe("");
});

test("admin users table spans the content width", async ({ page }) => {
  await login(page);
  await open(page, "/admin/users");

  const table = page.locator(".content table");
  await expect(table).toBeVisible();
  const box = await table.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(800);
});

test("unknown route renders the 404 page", async ({ page }) => {
  await open(page, "/this-route-does-not-exist");

  await expect(page.getByRole("heading", { name: "404 - Page Not Found" })).toBeVisible();
});
