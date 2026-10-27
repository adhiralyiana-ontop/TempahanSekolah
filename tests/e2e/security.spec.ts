import { test, expect } from "@playwright/test";

test("public pages emit defence-in-depth headers", async ({ request }) => {
  for (const path of ["/", "/demo", "/not-a-page"]) {
    const response = await request.get(path);
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-powered-by"]).toBeUndefined();
    expect(headers["content-security-policy"]).toContain("base-uri 'none'");
    expect(headers["content-security-policy"]).toContain(
      "frame-ancestors 'none'",
    );
    expect(headers["content-security-policy"]).toContain("form-action 'none'");
  }
});

test("unimplemented sensitive routes fail closed without pretending to authorize", async ({
  request,
}) => {
  for (const path of [
    "/app",
    "/login",
    "/platform",
    "/api/v1/admin/programs",
    "/api/v1/public/checkouts",
    "/api/v1/webhooks/payments/billplz",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
  const response = await request.post("/api/v1/webhooks/payments/billplz", {
    data: { paid: true, amount: 1 },
  });
  expect([404, 405]).toContain(response.status());
});

test("untrusted query text cannot execute script or establish paid status", async ({
  page,
}) => {
  await page.goto(
    "/?paid=true&message=" +
      encodeURIComponent('<img src=x onerror="window.__auditXss=true">'),
  );
  expect(
    await page.evaluate(() => Reflect.get(window, "__auditXss")),
  ).toBeUndefined();
  await expect(
    page.getByText("Ilustrasi sahaja · Tiada tempahan atau bayaran dibuat"),
  ).toBeVisible();
});

test("mobile navigation is hidden after resizing to desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Buka menu" }).click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  await expect(
    page.getByRole("navigation", { name: "Navigasi utama", exact: true }),
  ).toBeVisible();
});

test("responsive layouts remain within viewport", async ({ page }) => {
  for (const width of [360, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `width ${width}`,
    ).toBe(true);
  }
});
