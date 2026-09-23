import { test, expect } from "@playwright/test";

test.describe("home page metadata", () => {
  test("has matching canonical, hreflang, and OG/Twitter share data", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://e63recordings.com/");
    await expect(page.locator('link[hreflang="de"]')).toHaveAttribute("href", "https://e63recordings.com/");
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", "https://e63recordings.com/en/");
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });

  test("English home page canonical points at /en/", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://e63recordings.com/en/");
  });
});
