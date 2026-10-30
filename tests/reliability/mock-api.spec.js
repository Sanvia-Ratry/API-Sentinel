const { test, expect } = require("@playwright/test");

const BASE_URL = "http://localhost:3001";

test.describe("API Reliability Tests", () => {
  test("Health endpoint returns a healthy response", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/health`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status).toBe("healthy");
  });

  test("API correctly exposes a server error", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/faults/server-error`);

    expect(response.status()).toBe(500);

    const body = await response.json();
    expect(body.error).toBe("Simulated server error");
  });

  test("API returns malformed JSON", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/faults/malformed-json`);

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");

    const body = await response.text();
    expect(() => JSON.parse(body)).toThrow();
  });

  test("API delay can be measured", async ({ request }) => {
    const start = Date.now();

    const response = await request.get(`${BASE_URL}/faults/delay`, { timeout: 10000 });

    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeGreaterThanOrEqual(4500);
  });
});
test("API request times out when response exceeds the limit", async ({ request }) => {
  await expect(request.get(`${BASE_URL}/faults/delay`, { timeout: 1000 })).rejects.toThrow(
    /timeout/i,
  );
});
test("API request fails when the server is unreachable", async ({ request }) => {
  await expect(request.get("http://127.0.0.1:3999/health", { timeout: 2000 })).rejects.toThrow();
});
