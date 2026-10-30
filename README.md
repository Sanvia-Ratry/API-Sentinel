# API Sentinel
### API Reliability & Contract Testing Framework

API Sentinel is a Playwright-based API testing framework designed to validate API behavior, enforce response contracts, and test reliability under controlled failure conditions.

The project demonstrates API automation, reusable client design, JSON Schema validation, fault injection, diagnostics, and continuous integration using GitHub Actions.

## Features

- **API Testing:** GET, POST, PUT, PATCH, and DELETE request coverage.
- **Reusable API Clients:** Centralized API request methods for maintainable tests.
- **Contract Testing:** JSON Schema validation using Ajv.
- **Negative Validation:** Tests that reject invalid API response objects.
- **Fault Injection:** Local mock API endpoints for simulating server errors, malformed JSON, and delayed responses.
- **Timeout Testing:** Validates request timeout behavior.
- **Connection Failure Testing:** Checks behavior when the API server is unreachable.
- **Diagnostics:** Logs HTTP method, endpoint, status, response time, and response body.
- **Reporting:** Playwright HTML reports and trace retention on failures.
- **CI/CD:** Automated test execution using GitHub Actions.

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript | Test implementation |
| Node.js | Runtime |
| Playwright Test | API automation |
| Ajv | JSON Schema validation |
| JSON Schema | API contract definition |
| Git & GitHub | Version control |
| GitHub Actions | Continuous integration |

## Project Structure

```text
API-Sentinel/
├── .github/
│   └── workflows/
│       └── api-sentinel.yml
├── mock/
│   └── server.js
├── schemas/
│   ├── user.schema.json
│   └── post.schema.json
├── src/
│   └── clients/
│       └── users.client.js
├── tests/
│   ├── api/
│   │   └── users-api.spec.js
│   ├── contract/
│   │   └── users-contract.spec.js
│   ├── reliability/
│   │   └── mock-api.spec.js
│   └── smoke/
│       └── api-smoke.spec.js
├── utils/
│   ├── assertions.js
│   └── api-diagnostics.js
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Sanvia-Ratry/API-Sentinel.git
```

Navigate into the project:

```bash
cd API-Sentinel
```

Install dependencies:

```bash
npm ci
```

## Running Tests

Run the complete test suite:

```bash
npm test
```

Run API tests:

```bash
npx playwright test tests/api
```

Run contract tests:

```bash
npx playwright test tests/contract
```

Run reliability tests:

```bash
npx playwright test tests/reliability
```

Run smoke tests:

```bash
npm run test:smoke
```

## Local Mock API

API Sentinel includes a locally controlled mock API for deterministic reliability testing.

Start the mock server:

```bash
npm run mock:api
```

The mock API runs at:

```text
http://localhost:3001
```

Available endpoints:

| Endpoint | Expected behavior |
|---|---|
| `/health` | Returns HTTP 200 |
| `/faults/server-error` | Simulates HTTP 500 |
| `/faults/malformed-json` | Returns malformed JSON |
| `/faults/delay` | Delays the response by five seconds |

Keep the mock server running in a separate terminal while executing reliability tests.

## Test Reports and Diagnostics

Generate the Playwright HTML report by running the test suite:

```bash
npm test
```

Open the report:

```bash
npm run test:report
```

Playwright also retains trace evidence for failed tests through the configured trace setting.

## Continuous Integration

GitHub Actions automatically runs the test suite on pushes to `main` and pull requests targeting `main`.

The workflow:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs dependencies using `npm ci`.
4. Starts the local mock API.
5. Executes Playwright tests.
6. Uploads HTML reports and test-result artifacts.

## Test Coverage

The current test suite covers:

- User API operations.
- JSON Schema contract validation.
- Invalid schema data rejection.
- API health checks.
- HTTP 500 responses.
- Malformed JSON responses.
- Delayed responses.
- Request timeouts.
- Connection failures.

## Important Note

JSONPlaceholder is used as the public API for API exercises. Its write operations are simulated and do not permanently modify the underlying data.

The local mock API provides controlled failure scenarios so reliability tests do not depend on unpredictable external service behavior.

## Author

**Sanvia Ratry**

GitHub: https://github.com/Sanvia-Ratry
