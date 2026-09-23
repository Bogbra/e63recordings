import { test, expect } from "@playwright/test";

test.describe("site menu", () => {
  test("opens, traps Tab, and Escape restores focus to the menu button", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Menü" });
    await menuButton.click();

    const nav = page.locator("#site-menu");
    await expect(nav).toHaveClass(/siteMenu--open/);

    const firstLink = nav.getByRole("link").first();
    await expect(firstLink).toBeFocused();

    // Tab forward through every link in the menu; the last Tab must wrap
    // back to the first link, not escape into the (inert) rest of the page.
    const linkCount = await nav.getByRole("link").count();
    for (let i = 0; i < linkCount; i++) {
      await page.keyboard.press("Tab");
    }
    await expect(firstLink).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(nav).not.toHaveClass(/siteMenu--open/);
    await expect(menuButton).toBeFocused();
  });

  test("brand link and language switch become inert while the menu is open", async ({ page }) => {
    await page.goto("/");

    const isInert = (selector: string) =>
      page.evaluate((sel) => document.querySelector(sel)?.closest("[inert]") !== null, selector);

    expect(await isInert(".brandLink")).toBe(false);
    expect(await isInert(".langSwitch")).toBe(false);

    await page.getByRole("button", { name: "Menü" }).click();

    expect(await isInert(".brandLink")).toBe(true);
    expect(await isInert(".langSwitch")).toBe(true);
  });
});
