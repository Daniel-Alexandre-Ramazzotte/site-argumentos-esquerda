import { test, expect } from "@playwright/test";
import { Pool } from "pg";
process.loadEnvFile(".env");

test("cenários da pandemia consultados no banco preservam a base do estudo", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/pandemia/mortes-evitaveis");
  await expect(
    page.getByText("86.639 mortes evitáveis estimadas", { exact: true }),
  ).toBeVisible();
  await page.getByRole("combobox",{name:/Cenário alternativo/}).selectOption("2");
  await expect(
    page.getByText("391.647 mortes evitáveis estimadas", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".death-bar")).toHaveAttribute(
    "aria-label",
    /654572.*262925.*391647/,
  );
});

test("PostgreSQL e API entregam os mesmos dados com usuário de leitura", async ({
  request,
}) => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const { rows } = await pool.query(
      "SELECT value::text FROM economia.observations WHERE slug='pib' AND geo_id='br' AND extract(year from period)=2025 AND kind='primary'",
    );
    const result = await request.get("http://127.0.0.1:3000/api/indicators");
    expect(result.ok()).toBe(true);
    const list = await result.json();
    expect(
      list
        .find((i: { slug: string }) => i.slug === "pib")
        .points.find((p: { year: number }) => p.year === 2025).value,
    ).toBe(Number(rows[0].value));
    const permissions = await pool.query(
      "SELECT has_table_privilege(current_user,'core.observations','INSERT') AS can_write",
    );
    expect(permissions.rows[0].can_write).toBe(false);
  } finally {
    await pool.end();
  }
});

test("entrada por temas grandes e comparação de PIB selecionável", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/indicadores");
  await expect(page.locator(".article-card")).toHaveCount(0);
  await page
    .locator(".theme-cards")
    .getByRole("link", { name: /Economia/ })
    .click();
  await page.getByRole("link", { name: /PIB e atividade econômica/ }).click();
  await expect(page.locator(".comparison [data-series]")).toHaveCount(3);
  await expect(page.locator(".comparison-scale")).toContainText("Índice");
  await page
    .locator(".comparison-toggles")
    .getByRole("button", { name: "Crescimento anual do PIB", exact: true })
    .click();
  await expect(page.locator(".comparison [data-series]")).toHaveCount(2);
  await expect(page.locator(".comparison-scale")).toContainText("Eixo direito");
});

test("médicos distingue formação, emprego e recorte de empregadores", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/saude/medicos");
  await expect(page.locator(".comparison [data-series]")).toHaveCount(2);
  await page
    .locator(".comparison-toggles")
    .getByRole("button", {
      name: "Concluintes de medicina · Inep",
      exact: true,
    })
    .click();
  await expect(page.locator(".comparison [data-series]")).toHaveCount(3);
  await page
    .getByText("Contratação por tipo de empregador · retrato de 2023", {
      exact: true,
    })
    .click();
  await expect(page.locator(".research-card")).toContainText("255.199");
  await expect(page.locator(".research-card")).toContainText(
    "vínculos formais",
  );
  await page.screenshot({
    path: "artifacts/medicos-comparacao.png",
    fullPage: true,
  });
});

test("orçamento troca ano e etapa preservando 100% das funções", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/economia/orcamento");
  await expect(page.locator(".budget-row")).toHaveCount(28);
  await page.getByLabel("Ano do orçamento").selectOption("2020");
  await page.getByLabel("Etapa da despesa").selectOption("Despesas Empenhadas");
  const sum = await page
    .locator(".budget-row meter")
    .evaluateAll((ms) =>
      ms.reduce((s, m) => s + Number(m.getAttribute("value")), 0),
    );
  expect(sum).toBeCloseTo(100, 8);
  const first = await page
    .locator(".budget-row meter")
    .first()
    .getAttribute("value");
  await page
    .getByRole("button", { name: "Valor real · IPCA", exact: true })
    .click();
  await expect(page.locator(".budget-row meter").first()).toHaveAttribute(
    "value",
    first!,
  );
});

test("novas áreas funcionam em celular sem vazamento horizontal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of [
    "/indicadores",
    "/economia/atividade-economica",
    "/economia/bancos",
    "/economia/divida",
    "/economia/orcamento",
    "/transportes/movimentacao",
    "/saude/medicos",
    "/saude/infraestrutura",
    "/populacao",
    "/programas-sociais",
    "/como-funciona",
    "/pandemia/mortes-evitaveis",
  ]) {
    await page.goto("http://127.0.0.1:3000" + route);
    await expect(page.locator("h1").first()).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBe(true);
  }
  expect(errors).toEqual([]);
  await page.screenshot({
    path: "artifacts/contexto-mobile.png",
    fullPage: true,
  });
});
