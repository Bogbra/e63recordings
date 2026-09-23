import { test, expect } from "@playwright/test";

test.describe("legal dialog", () => {
  test("opens with the correct content and restores focus to the exact trigger link", async ({ page }) => {
    await page.goto("/");
    const privacyLink = page.locator(".footerLegal a", { hasText: "Datenschutz" });
    await privacyLink.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { level: 2 })).toHaveText("Datenschutz");

    // The dialog's aria-labelledby must point at ITS OWN heading, not at
    // some other element with a colliding id elsewhere in the document.
    const labelledBy = await dialog.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    const labelText = await page.locator(`#${labelledBy}`).textContent();
    expect(labelText).toBe("Datenschutz");

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(privacyLink).toBeFocused();
  });

  test("still opens the imprint dialog from the standalone privacy page", async ({ page }) => {
    // Regression check for the duplicate id="legal-title" bug: opening the
    // dialog on a static legal page (which has its own h1 with a legal
    // title) must not mislabel the dialog with the page's title instead of
    // the dialog's own.
    await page.goto("/datenschutz/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Datenschutz");

    await page.locator(".footerLegal a", { hasText: "Impressum" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("heading", { level: 2 })).toHaveText("Impressum");

    const labelledBy = await dialog.getAttribute("aria-labelledby");
    const labelText = await page.locator(`#${labelledBy}`).textContent();
    expect(labelText).toBe("Impressum");
  });
});

test.describe("standalone legal pages", () => {
  const pages = [
    { path: "/impressum/", heading: "Impressum" },
    { path: "/datenschutz/", heading: "Datenschutz" },
    { path: "/en/imprint/", heading: "Imprint" },
    { path: "/en/privacy/", heading: "Privacy Policy" },
  ];

  for (const { path, heading } of pages) {
    test(`${path} renders its content without JS-dependent state and is noindex`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);

      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots).toContain("noindex");

      // Must not inherit the home page's Open Graph/description/keywords.
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(0);
      await expect(page.locator('meta[name="keywords"]')).toHaveCount(0);
    });
  }
});
