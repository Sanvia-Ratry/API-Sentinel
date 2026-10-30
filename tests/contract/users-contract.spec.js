const addFormats = require("ajv-formats");
const { test, expect } = require("@playwright/test");
const Ajv = require("ajv");
const userSchema = require("../../schemas/user.schema.json");
const { createUsersClient } = require("../../src/clients/users.client");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateUser = ajv.compile(userSchema);

test("User response follows the JSON Schema contract", async ({ request }) => {
  const usersApi = createUsersClient(request);

  const response = await usersApi.getUser(1);
  expect(response.status()).toBe(200);

  const user = await response.json();

  const valid = validateUser(user);

  expect(valid, JSON.stringify(validateUser.errors, null, 2)).toBeTruthy();
});
test("User schema rejects an invalid response", async () => {
  const invalidUser = {
    id: "not-a-number",
    name: 123,
    email: "invalid-email",
  };

  const valid = validateUser(invalidUser);

  expect(valid).toBeFalsy();
  expect(validateUser.errors.length).toBeGreaterThan(0);
});
