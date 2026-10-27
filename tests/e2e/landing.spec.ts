import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("landing is accessible, responsive, and free of runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/TempahSekolah/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ms");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Program sekolah,",
  );
  await expect(page.getByText("CONTOH PAPARAN", { exact: true })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test("category choices update the illustration without offering checkout", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Barangan", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Barangan", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("heading", { name: "Baju hari sukan" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Nasi ayam", exact: true }),
  ).toHaveCount(0);
  for (const [category, item] of [
    ["Penyertaan", "Larian keluarga"],
    ["Slot", "Sesi pagi"],
    ["Kemudahan", "Tapak gerai"],
    ["Makanan", "Nasi ayam"],
  ]) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await expect(
      page.getByRole("heading", { name: item, exact: true }),
    ).toBeVisible();
  }
  await expect(
    page.getByText("Ilustrasi sahaja · Tiada tempahan atau bayaran dibuat"),
  ).toBeVisible();
});

test("FAQ and navigation work by keyboard", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Langkau ke kandungan" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  expect(await page.evaluate(() => location.hash)).toBe("#kandungan");
  if (testInfo.project.name.includes("mobile")) {
    const menu = page.getByRole("button", { name: "Buka menu" });
    await menu.click();
    await expect(
      page.getByRole("button", { name: "Tutup menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    await page
      .getByRole("navigation", { name: "Navigasi mudah alih" })
      .getByRole("link", { name: "Soalan lazim" })
      .click();
    await expect(
      page.getByRole("button", { name: "Buka menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  } else {
    await page
      .getByRole("navigation", { name: "Navigasi utama", exact: true })
      .getByRole("link", { name: "Soalan lazim" })
      .click();
  }
  const question = page.locator("summary", {
    hasText: "Adakah tempahan dan pembayaran sudah dibuka?",
  });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByText("Belum. Versi ini memperkenalkan konsep produk sahaja.", {
      exact: false,
    }),
  ).toBeVisible();
});

test("demo request accurately reflects server configuration", async ({
  page,
}) => {
  await page.goto("/demo");
  if (process.env.TEST_DEMO_CONTACT_EMAIL) {
    const link = page.getByRole("link", { name: "Buka draf e-mel" });
    await expect(link).toHaveAttribute(
      "href",
      /^mailto:demo@example\.com\?subject=/,
    );
    await expect(
      page.getByText("Semak dan hantar sendiri.", { exact: false }),
    ).toBeVisible();
  } else {
    await expect(
      page.getByRole("heading", { name: "Permintaan demo belum dibuka" }),
    ).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  }
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("link", { name: "Kembali ke laman utama" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Program sekolah,",
  );
});

test("unknown pages return 404 with a working recovery link", async ({
  page,
}) => {
  const response = await page.goto("/halaman-tiada");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: "Kembali ke laman utama" }).click();
  await expect(page).toHaveURL("/");
});
