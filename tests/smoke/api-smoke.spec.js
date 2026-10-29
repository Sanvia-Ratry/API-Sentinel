const { test, expect } = require("@playwright/test");

test("API Sentinel can retrieve a user", async ({ request }) => {
  const response = await request.get("/users/1");

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const user = await response.json();

  expect(user.id).toBe(1);
  expect(typeof user.name).toBe("string");
  expect(typeof user.email).toBe("string");
});
