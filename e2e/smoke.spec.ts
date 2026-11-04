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
});

test("admin add-on page renders its heading", async ({ page }) => {
  test.skip(!HAS_SAAS_ADDON, "saas add-on is not checked out");

  await login(page);
  await open(page, "/admin/license1");

  await expect(page.getByRole("heading", { name: "License 1 SaaS" })).toBeVisible();
  await expect(page).toHaveTitle("License");
});

test("unknown route renders the 404 page", async ({ page }) => {
  await open(page, "/this-route-does-not-exist");

  await expect(page.getByRole("heading", { name: "404 - Page Not Found" })).toBeVisible();
});
