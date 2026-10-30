const { test, expect } = require("@playwright/test");
const { createUsersClient } = require("../../src/clients/users.client");
const { expectSuccessfulResponse, expectJsonResponse } = require("../../utils/assertions");
const { logApiResponse } = require("../../utils/api-diagnostics");
test.describe("Users API", () => {
  test("GET retrieves a user", async ({ request }) => {
    const api = createUsersClient(request);

    const start = Date.now();
    const response = await api.getUser(1);
    const duration = Date.now() - start;

    await logApiResponse(
      response,
      {
        method: "GET",
        url: "/users/1",
      },
      duration,
      "GET User Details",
    );

    await expectSuccessfulResponse(response);
    await expectJsonResponse(response);

    const user = await response.json();
    expect(user.id).toBe(1);
  });

  test("POST creates a user", async ({ request }) => {
    const api = createUsersClient(request);

    const response = await api.createUser({
      name: "API Sentinel",
      username: "sentinel",
      email: "sentinel@example.com",
    });

    await expectSuccessfulResponse(response, 201);

    const user = await response.json();
    expect(user.name).toBe("API Sentinel");
  });

  test("PUT updates a user", async ({ request }) => {
    const api = createUsersClient(request);

    const response = await api.updateUser(1, {
      id: 1,
      name: "Updated User",
      username: "updated",
      email: "updated@example.com",
    });

    await expectSuccessfulResponse(response);

    const user = await response.json();
    expect(user.name).toBe("Updated User");
  });

  test("PATCH partially updates a user", async ({ request }) => {
    const api = createUsersClient(request);

    const response = await api.patchUser(1, {
      name: "Patched User",
    });

    await expectSuccessfulResponse(response);

    const user = await response.json();
    expect(user.name).toBe("Patched User");
  });

  test("DELETE deletes a user", async ({ request }) => {
    const api = createUsersClient(request);

    const response = await api.deleteUser(1);

    expect(response.status()).toBe(200);
  });
});
