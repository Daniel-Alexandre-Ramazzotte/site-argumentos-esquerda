import { test, expect } from "@playwright/test";
import { indicators } from "../data/historical";

test("séries anuais consistentes, sem lacunas ou mistura de unidades", () => {
  for (const i of indicators) {
    expect(i.points.length).toBeGreaterThan(1);
    for (let n = 1; n < i.points.length; n++)
      if (i.frequency !== "cycles")
        expect(i.points[n].year).toBe(i.points[n - 1].year + 1);
    expect(i.points.every((p) => Number.isFinite(p.value))).toBe(true);
    if (i.secondary)
      expect(i.secondary.points.map((p) => p.year)).toEqual(
        i.points.map((p) => p.year),
      );
  }
  expect(indicators.find((i) => i.slug === "inflacao")!.points.at(-1)).toEqual({
    year: 2025,
    value: 4.26,
  });
  expect(
    indicators
      .find((i) => i.slug === "inflacao-de-alimentos")!
      .points.find((p) => p.year === 2017)?.value,
  ).toBe(-1.87);
});

test("biblioteca abre análises internas, com busca e filtro", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000");
  await expect(
    page.getByRole("heading", { name: /Menos ruído/ }),
  ).toBeVisible();
  await expect(page.locator("#dados")).toHaveCount(0);
  await page.getByRole("button", { name: "Economia", exact: true }).click();
  await expect(page.locator(".article-card")).toHaveCount(4);
  await page
    .getByRole("textbox", { name: "Buscar indicadores" })
    .fill("alimentos");
  await expect(page.locator(".article-card")).toHaveCount(1);
  await expect(page.locator('.article-card a[target="_blank"]')).toHaveCount(0);
  await page.locator(".article-card .source-link").click();
  await expect(page).toHaveURL(/indicadores\/inflacao-de-alimentos\/?$/);
  await expect(
    page.getByRole("heading", {
      name: "Por que os alimentos pesam tanto no bolso?",
    }),
  ).toBeVisible();
});

test("gráfico filtra período, destaca governos, mostra tabela e exporta CSV", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/indicadores/inflacao");
  await expect(page.locator("[data-pt-band]")).toHaveCount(3);
  await page
    .getByRole("checkbox", { name: "Destacar governos do PT" })
    .uncheck();
  await expect(page.locator("[data-pt-band]")).toHaveCount(0);
  await page.getByLabel("Ano inicial").selectOption("2015");
  await page.getByLabel("Ano final").selectOption("2024");
  await expect(page.locator('.series-svg circle[role="button"]')).toHaveCount(
    10,
  );
  await page.getByRole("button", { name: /2016: 6,29/ }).focus();
  await expect(page.locator(".series-readout")).toContainText("Dilma / Temer");
  await page.getByRole("button", { name: "Ver tabela completa" }).click();
  await expect(
    page.getByRole("row", { name: "2016 6,29 Dilma / Temer" }),
  ).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("link", { name: "Baixar CSV deste período" }).click();
  expect((await download).suggestedFilename()).toBe("inflacao-2015-2024.csv");
  await page.screenshot({
    path: "artifacts/serie-desktop.png",
    caret: "initial",
  });
});

test("checagem tem página própria e preserva navegação dos dossiês", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/checagens");
  await page
    .getByRole("link", {
      name: "“O governo criou um imposto específico sobre o Pix.”",
    })
    .click();
  await expect(page).toHaveURL(/checagens\/imposto-sobre-pix\/?$/);
  await expect(
    page.getByRole("heading", { name: "O que a evidência mostra" }),
  ).toBeVisible();
  await page.goto("http://127.0.0.1:3000/pandemia");
  await page
    .locator("#linha-do-tempo")
    .getByRole("button", { name: "Vacinas", exact: true })
    .click();
  await expect(page.locator('#linha-do-tempo [role="tab"]')).toHaveCount(7);
  await page.goto("http://127.0.0.1:3000/justica");
  await page
    .getByRole("textbox", { name: "Buscar casos documentados" })
    .fill("joias");
  await expect(page.locator("#casos-bolsonaro .record-card")).toHaveCount(1);
  await expect(page.locator("#hospitais-rio .record-card")).toHaveCount(2);
});

test("zoom de 125% e layout sem vazamento horizontal em celular e desktop", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of [
      "/",
      "/indicadores/pobreza",
      "/indicadores/inflacao-de-alimentos",
      "/checagens",
    ]) {
      await page.goto("http://127.0.0.1:3000" + route);
      expect(
        await page.evaluate(
          () => getComputedStyle(document.documentElement).zoom,
        ),
      ).toBe("1.25");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} em ${width}px`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:3000");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Brasil Em Perspectiva" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Entenda os indicadores." }),
  ).toBeVisible();
  await page.screenshot({ path: "artifacts/mobile-125.png", caret: "initial" });
  expect(errors).toEqual([]);
});
