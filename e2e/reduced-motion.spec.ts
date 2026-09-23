import { test, expect } from "@playwright/test";

test.describe("reduced motion", () => {
  test("replaces the animated carousel with a plain, visible, linked list", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const stage = page.locator(".albums__stage");
    await expect(stage).toBeHidden();

    const list = page.locator(".albums__a11yList");
    await expect(list).toBeVisible();

    const links = list.getByRole("link");
    await expect(links).toHaveCount(3);
    // Under reduced motion this list is the only way to reach each release,
    // so its links must be real, keyboard-reachable links, not decorative
    // text — verify at least one actually has a working href.
    await expect(links.first()).toHaveAttribute("href", /bandcamp\.com/);
  });

  test("keeps the sr-only list as plain, non-interactive text with motion enabled", async ({ page }) => {
    await page.goto("/");

    const list = page.locator(".albums__a11yList");
    // Still present for screen readers, just not visible or interactive —
    // a permanently invisible but focusable link has no visible focus
    // indicator, which is why this must stay non-interactive here.
    await expect(list.getByRole("link")).toHaveCount(0);
    await expect(list.locator("li")).toHaveCount(3);

    // The visible carousel's own CTA must be the one that's reachable.
    const cta = page.locator(".albums__link");
    await expect(cta).not.toHaveAttribute("tabindex", "-1");
    await expect(cta).toBeVisible();
  });
});
