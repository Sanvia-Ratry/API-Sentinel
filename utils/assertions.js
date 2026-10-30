const { expect } = require("@playwright/test");

async function expectSuccessfulResponse(response, status = 200) {
  expect(response.status()).toBe(status);
  expect(response.ok()).toBeTruthy();
}

async function expectJsonResponse(response) {
  const contentType = response.headers()["content-type"];

  expect(contentType).toContain("application/json");
}

module.exports = {
  expectSuccessfulResponse,
  expectJsonResponse,
};
