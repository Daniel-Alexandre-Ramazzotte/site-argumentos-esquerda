import { test, expect } from "@playwright/test";
import mobility from "../data/mobility.json";
import { fuelIndicators } from "../data/mobility-indicators";
import { realValue, realIndicator } from "../data/price-adjustment";
import index from "../data/price-index.json";

test("importação preserva meses, datas, territórios e unidades", () => {
  const means = mobility.currency["3698"].monthly;
  const closing = mobility.currency["3695"].monthly;
  expect(means[0].month).toBe("1994-07");
  expect(means.at(-1)!.month).toBe("2026-09");
  expect(means.map((p) => p.month)).toEqual(closing.map((p) => p.month));
  expect(new Set(means.map((p) => p.month)).size).toBe(means.length);
  expect(fuelIndicators).toHaveLength(7);
  for (const fuel of fuelIndicators) {
    for (const geo of fuel.geographies!) {
      expect(new Set(geo.points.map((p) => p.year)).size).toBe(
        geo.points.length,
      );
      expect(geo.points.every((p) => p.year <= 2025 && p.value > 0)).toBe(true);
    }
  }
  expect(fuelIndicators[6].unit).toBe("R$/botijão de 13 kg");
  expect(realValue(100, "2025-12")).toBe(100);
  const historicalIndex = index.points.find(
    (p) => p.month === "2001-12",
  )!.index;
  const baseIndex = index.points.find((p) => p.month === "2025-12")!.index;
  expect(realValue(100, "2001-12")).toBeCloseTo(
    (100 * baseIndex) / historicalIndex,
    10,
  );
  expect(realIndicator(fuelIndicators[0]).points.at(-1)!.value).toBe(
    fuelIndicators[0].points.at(-1)!.value,
  );
});

test("combustíveis mudam produto e território com unidades corretas", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/indicadores/combustiveis");
  await page.getByLabel("Visualizar por").selectOption("state");
  await page
    .getByLabel("Escolha a localidade")
    .selectOption({ label: "São Paulo" });
  await expect(page.locator(".indicator-summary strong")).toHaveText(
    "São Paulo",
  );
  await expect(page.locator(".series-toolbar")).toContainText("São Paulo");
  await page.getByLabel("Indicador e metodologia").selectOption("6");
  await expect(
    page.getByRole("heading", {
      name: "Gás de cozinha (GLP P13) · preço médio em dezembro",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator(".series-toolbar")).toContainText(
    "R$/botijão de 13 kg",
  );
  await expect(page.locator(".indicator-summary strong")).toHaveText("Brasil");
});

test("dólar alterna frequência e compara média e fechamento mensal", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/indicadores/dolar");
  await page
    .getByRole("button", { name: "Mensal · média e fechamento", exact: true })
    .click();
  await page.getByLabel("Mês inicial", { exact: true }).fill("2020-01");
  await page.getByLabel("Mês final", { exact: true }).fill("2020-12");
  await expect(page.locator('.series-svg circle[role="button"]')).toHaveCount(
    24,
  );
  await page.getByLabel("Séries mensais do dólar").selectOption("3695");
  await expect(page.locator('.series-svg circle[role="button"]')).toHaveCount(
    12,
  );
  await page.getByRole("button", { name: "Ver tabela mensal" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(12);
  await expect(page.locator("tbody tr").last()).toContainText("12/2020");
  const download = page.waitForEvent("download");
  await page.getByRole("link", { name: "Baixar CSV mensal" }).click();
  expect((await download).suggestedFilename()).toBe(
    "dolar-mensal-2020-01-2020-12.csv",
  );
  await page.screenshot({ path: "artifacts/dolar-mensal.png", fullPage: true });
});

test("transportes oferece análises internas e eventos com estágio e fontes", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/transportes");
  await expect(page.locator(".article-card")).toHaveCount(5);
  await page
    .locator(".transport-history")
    .getByRole("button", { name: "Hidrovias", exact: true })
    .click();
  await expect(page.locator('.transport-history [role="tab"]')).toHaveCount(2);
  await expect(page.getByRole("tabpanel")).toContainText(
    "Não é registro de obra concluída",
  );
  await expect(page.getByRole("tabpanel").getByRole("link")).toHaveCount(1);
});

test("novos registros distinguem autoria e preservam contexto dos vídeos", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/pandemia");
  await page.getByRole("tab", { name: /Élcio Franco alega vírus/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "não uma declaração pessoal de Bolsonaro",
  );
  await page.goto("http://127.0.0.1:3000/justica");
  await page.getByLabel("Buscar casos documentados").fill("Moro deixa");
  await expect(page.locator("#casos-bolsonaro .record-card")).toHaveCount(1);
  await expect(page.locator("#casos-bolsonaro")).toContainText(
    "Bolsonaro negou interferência",
  );
  await page.goto("http://127.0.0.1:3000/checagens/aborto");
  await expect(page.locator(".evidence-video iframe")).toHaveAttribute(
    "src",
    /MDCmI1sFibQ/,
  );
  await expect(page.locator(".check-explanation")).toContainText("China");
});

test("pandemia documenta desestímulo e respostas institucionais com contexto",async({page})=>{
  await page.goto("http://127.0.0.1:3000/pandemia");
  await expect(page.locator(".prevention-card")).toHaveCount(4);
  await page.getByRole("tab",{name:/Live divulga associação falsa/}).click();
  await expect(page.getByRole("tabpanel")).toContainText("a vacina não transmite HIV");
  await expect(page.getByRole("tabpanel").getByRole("link",{name:/UNAIDS/})).toHaveAttribute("href",/unaids.org.br/);
  await page.locator("#linha-do-tempo").getByRole("button",{name:"Máscaras",exact:true}).click();
  await expect(page.locator('#linha-do-tempo [role="tab"]')).toHaveCount(3);
  await expect(page.getByRole("tabpanel")).toContainText("não proibiu o uso de máscaras");
  await page.getByRole("tab",{name:/Congresso derruba veto/}).click();
  await expect(page.getByRole("tabpanel")).toContainText("19 AGO 2020");
});

test("novas páginas mantêm o conteúdo na largura do celular a 125%", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/transportes",
    "/economia",
    "/indicadores/combustiveis",
    "/indicadores/dolar",
    "/checagens/aborto",
  ]) {
    await page.goto("http://127.0.0.1:3000" + route);
    if (route.endsWith("dolar"))
      await page
        .getByRole("button", {
          name: "Mensal · média e fechamento",
          exact: true,
        })
        .click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBe(true);
  }
  await page.screenshot({
    path: "artifacts/aborto-video-mobile.png",
    fullPage: true,
  });
});

test("modo escuro persiste entre páginas e recarregamentos", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/indicadores/combustiveis");
  await page
    .getByRole("button", { name: "Ativar modo escuro", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Ativar modo claro", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Valor real · IPCA", exact: true })
    .click();
  await page.screenshot({
    path: "artifacts/combustiveis-dark-real.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "artifacts/combustiveis-dark-mobile.png",
    fullPage: true,
  });
  await page.goto("http://127.0.0.1:3000/transportes");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Ativar modo claro", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("valor real atualiza pontos, unidades e exportação sem corrigir taxas", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/indicadores/combustiveis");
  const first = page.locator('.series-svg circle[role="button"]').first();
  const nominal = await first.getAttribute("aria-label");
  await page
    .getByRole("button", { name: "Valor real · IPCA", exact: true })
    .click();
  await expect(first).not.toHaveAttribute("aria-label", nominal!);
  await expect(page.locator(".series-toolbar")).toContainText(
    "R$ de dez/2025/litro",
  );
  const csv = await page
    .getByRole("link", { name: "Baixar CSV deste período" })
    .getAttribute("href");
  expect(decodeURIComponent(csv!)).toContain("R$ de dez/2025/litro");
  await page
    .getByRole("button", { name: "Valor nominal", exact: true })
    .click();
  await expect(first).toHaveAttribute("aria-label", nominal!);
  await page.goto("http://127.0.0.1:3000/indicadores/dolar");
  await page
    .getByRole("button", { name: "Mensal · média e fechamento", exact: true })
    .click();
  const monthlyFirst = page
    .locator('.series-svg circle[role="button"]')
    .first();
  const monthlyNominal = await monthlyFirst.getAttribute("aria-label");
  await page
    .getByRole("button", { name: "Valor real · IPCA", exact: true })
    .click();
  await expect(monthlyFirst).not.toHaveAttribute("aria-label", monthlyNominal!);
  await expect(page.locator(".series-toolbar")).toContainText(
    "reais de dez/2025",
  );
  await expect(page.locator(".price-display")).toContainText(
    "não é uma taxa de câmbio real",
  );
  await page.goto("http://127.0.0.1:3000/indicadores/desemprego");
  await expect(
    page.getByRole("button", { name: "Valor real · IPCA", exact: true }),
  ).toHaveCount(0);
  await page.goto("http://127.0.0.1:3000/indicadores/industrializacao");
  await expect(
    page.getByRole("button", { name: "Valor real · IPCA", exact: true }),
  ).toHaveCount(0);
  await expect(
    page
      .locator(".coverage-note")
      .filter({ hasText: "já está em preços constantes" }),
  ).toBeVisible();
});
