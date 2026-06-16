# Petstore API Testing Suite

Automated API tests for Swagger Petstore API using Playwright and TypeScript.

## ✨ Features

- ✅ Automated API testing with Playwright Test
- ✅ TypeScript for type safety
- ✅ Axios HTTP client wrapper
- ✅ Environment configuration support
- ✅ HTML test reports
- ✅ Easy-to-extend test structure

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run tests
npm test

# 3. View results
npx playwright show-report
```

## 📋 Available Commands

```bash
npm test              # Run all tests
npm run test:ui       # Interactive Playwright UI
npm run test:debug    # Debug mode with detailed output
npm run build         # Build TypeScript to JavaScript
npm run dev          # Watch mode for development
```

## 📁 Project Structure

```
swagger-tests2/
├── src/
│   └── apiClient.ts           # HTTP client wrapper
├── tests/
│   └── petstore.spec.ts        # API tests
├── .github/
│   └── copilot-instructions.md # Setup checklist
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── playwright.config.ts        # Playwright config
└── README.md                   # This file
```

## ⚙️ Configuration

### Environment Variables

Create `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

**Environment Variables:**

```env
# API Configuration
API_BASE_URL=https://petstore.swagger.io/v2

# Optional: Azure OpenAI (for AI-powered features)
AZURE_OPENAI_API_KEY=your-key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-35-turbo

# Test Configuration
TEST_TIMEOUT=30000
```

## 🧪 Tests Included

### Pet Operations
- ✅ Create a new pet (POST /pet)
- ✅ Get pet by ID (GET /pet/{id})
- ✅ Find pets by status (GET /pet/findByStatus)

### Store Operations
- ✅ Place an order (POST /store/order)
- ✅ Get inventory (GET /store/inventory)

### User Operations
- ✅ Create user (POST /user)
- ✅ Get user profile (GET /user/{username})

## 📊 Test Results

After running tests, view the HTML report:

```bash
npx playwright show-report
```

The report includes:
- ✅ Test execution timeline
- 📊 Pass/fail statistics
- 📝 Test output and logs
- 🔍 Network requests/responses

## 🔧 Extending Tests

### Add New Test

1. Open `tests/petstore.spec.ts`
2. Add new test case:

```typescript
test('My new test', async () => {
  const response = await apiClient.request({
    method: 'GET',
    endpoint: '/pet/1',
  });

  expect(response.status).toBe(200);
});
```

### Using APIClient

```typescript
import { APIClient } from '../src/apiClient';

const apiClient = new APIClient();

// GET request
const response = await apiClient.request({
  method: 'GET',
  endpoint: '/pet/1',
});

// POST request with data
const response = await apiClient.request({
  method: 'POST',
  endpoint: '/pet',
  data: petObject,
  headers: { 'Content-Type': 'application/json' },
});
```

## 🐛 Troubleshooting

### Tests Fail with "Cannot reach API"
- Check internet connection
- Verify API is online: https://petstore.swagger.io/v2/pet/1
- Check `API_BASE_URL` in `.env`

### TypeScript Compilation Errors
```bash
npm run build
```
Check errors and fix them before running tests

### Tests Timeout
- Increase `TEST_TIMEOUT` in `.env`
- Check API response times
- Verify network connectivity

## 📚 Resources

- [Petstore API Documentation](https://petstore.swagger.io/)
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Axios Documentation](https://axios-http.com/)

## 📄 Project Setup

This project was initialized with:
- Project Name: `petstore-api-tests`
- Framework: Playwright Test
- Language: TypeScript
- Runtime: Node.js

## ✅ Status

- ✅ Project structure created
- ✅ Dependencies installed
- ✅ TypeScript compiled
- ✅ Ready to run tests

**Next Step:** Run `npm test` to start testing!

## 📝 License

MIT

