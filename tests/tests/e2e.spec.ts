import { test, expect } from "@playwright/test";

// URL base (usa local por defecto, o la de Vercel si la defines con BASE_URL)
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Mapa de los Temperamentos - E2E", () => {
  
  test("1. Rutas de tarjetas renderizan", async ({ page }) => {
    const types = ["SG", "CL", "FL", "ML"];
    for (const t of types) {
      await page.goto(`${BASE_URL}/tarjeta/${t}`);
      await expect(page.locator("body")).toContainText(t);
    }
  });

  test("2. Radar gráfico abre con parámetros", async ({ page }) => {
    const url = `${BASE_URL}/resultados?SG=40&CL=30&FL=20&ML=10`;
    await page.goto(url);
    await expect(page.locator("canvas")).toBeVisible();
  });

  test("3. API devuelve top y url correctos", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/tarjeta`, {
      data: { SG: 45, CL: 30, FL: 15, ML: 10 },
    });
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.top).toBe("SG");
    expect(json.url).toContain("/tarjeta/SG");
  });

});