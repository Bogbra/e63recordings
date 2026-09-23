import { test, expect } from "@playwright/test";

test.describe("menu anchor links", () => {
  test("point at in-page anchors on the home page", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page.locator("#site-menu .menuLinks a").evaluateAll((links) =>
      links.map((a) => a.getAttribute("href"))
    );
    expect(hrefs).toEqual(["#latest", "#about", "#artists", "#demos", "#contact"]);

    // Every anchor must resolve to a real element on this page.
    for (const href of hrefs) {
      const id = href!.slice(1);
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("point back at the home page's sections from a standalone legal page", async ({ page }) => {
    await page.goto("/impressum/");
    const hrefs = await page.locator("#site-menu .menuLinks a").evaluateAll((links) =>
      links.map((a) => a.getAttribute("href"))
    );
    expect(hrefs).toEqual(["/#latest", "/#about", "/#artists", "/#demos", "/#contact"]);
  });

  test("point back at the English home page from an English legal page", async ({ page }) => {
    await page.goto("/en/privacy/");
    const hrefs = await page.locator("#site-menu .menuLinks a").evaluateAll((links) =>
      links.map((a) => a.getAttribute("href"))
    );
    expect(hrefs).toEqual(["/en/#latest", "/en/#about", "/en/#artists", "/en/#demos", "/en/#contact"]);
  });
});

test.describe("language switch", () => {
  const pages = [
    ["/", "/en/"],
    ["/en/", "/"],
    ["/impressum/", "/en/imprint/"],
    ["/en/imprint/", "/impressum/"],
    ["/datenschutz/", "/en/privacy/"],
    ["/en/privacy/", "/datenschutz/"],
  ] as const;

  for (const [from, to] of pages) {
    test(`${from} links to ${to} and that page actually loads`, async ({ page, request }) => {
      await page.goto(from);
      const href = await page.locator(".langSwitch").getAttribute("href");
      expect(href).toBe(to);

      const response = await request.get(to);
      expect(response.ok()).toBe(true);
    });
  }
});
