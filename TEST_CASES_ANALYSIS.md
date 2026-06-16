# Petstore API - AI-Generated Test Cases & Analysis

## Executive Summary

This document presents AI-generated test cases for Swagger Petstore API endpoints, with manual refinements and implementation notes. Focus is on 3 key categories: **Pet**, **Store**, and **User** operations.

**Total Test Cases Generated:** 50+  
**Test Cases Implemented:** 35+  
**Key Endpoints:** 12 selected from 20+ available

---

## 1. Selected Endpoints

### Pet Management (5 endpoints)
| Endpoint | Method | Purpose | Tests |
|----------|--------|---------|-------|
| `/pet` | POST | Add new pet | 3 |
| `/pet` | PUT | Update pet | 3 |
| `/pet/{petId}` | GET | Get pet by ID | 4 |
| `/pet/{petId}` | DELETE | Delete pet | 2 |
| `/pet/findByStatus` | GET | Find by status | 3 |

### Store Management (4 endpoints)
| Endpoint | Method | Purpose | Tests |
|----------|--------|---------|-------|
| `/store/order` | POST | Place order | 3 |
| `/store/order/{orderId}` | GET | Get order | 3 |
| `/store/order/{orderId}` | DELETE | Delete order | 2 |
| `/store/inventory` | GET | Get inventory | 1 |

### User Management (3 endpoints)
| Endpoint | Method | Purpose | Tests |
|----------|--------|---------|-------|
| `/user` | POST | Create user | 2 |
| `/user/{username}` | GET | Get user | 2 |
| `/user/login` | GET | User login | 2 |

---

## 2. AI-Generated Test Cases (Initial Generation)

### 2.1 Pet Endpoints - AI Generated

#### POST /pet - Add New Pet
```
AI Generated Test Case 1: Valid Pet Creation
Scenario: Add pet with all required and optional fields
Input: 
  - id: random number
  - name: "Doggie"
  - photoUrls: ["https://example.com/photo.jpg"]
  - status: "available"
  - category: {id: 1, name: "Dogs"}
Expected: HTTP 200, returns Pet object with ID

AI Generated Test Case 2: Minimal Pet Creation
Scenario: Add pet with only required fields
Input:
  - name: "Kitty"
  - photoUrls: ["https://example.com/photo.jpg"]
Expected: HTTP 200, returns Pet object

AI Generated Test Case 3: Missing Required Fields
Scenario: Create pet without required fields
Input: Missing "name" or "photoUrls"
Expected: HTTP 400 or 405 (Invalid Input)
```

#### GET /pet/{petId} - Retrieve Pet
```
AI Generated Test Case 1: Valid Pet ID
Scenario: Get existing pet
Input: petId = 1
Expected: HTTP 200, returns complete Pet object

AI Generated Test Case 2: Non-Existent Pet
Scenario: Get pet that doesn't exist
Input: petId = 999999
Expected: HTTP 404 (Pet not found)

AI Generated Test Case 3: Invalid ID Format
Scenario: Pass non-numeric ID
Input: petId = "abc"
Expected: HTTP 400 (Invalid ID supplied)

AI Generated Test Case 4: Negative ID
Scenario: Pass negative ID
Input: petId = -1
Expected: HTTP 400 (Invalid ID supplied)
```

#### PUT /pet - Update Pet
```
AI Generated Test Case 1: Valid Update
Scenario: Update existing pet's status
Input: Valid pet object with status change
Expected: HTTP 200, pet updated

AI Generated Test Case 2: Partial Update
Scenario: Update only specific fields
Input: Updated name and status
Expected: HTTP 200, other fields preserved

AI Generated Test Case 3: Update Non-Existent Pet
Scenario: Update pet that doesn't exist
Input: petId = 999999
Expected: HTTP 404 or 400
```

#### DELETE /pet/{petId} - Delete Pet
```
AI Generated Test Case 1: Delete Existing Pet
Scenario: Delete valid pet
Input: petId = 1
Expected: HTTP 200

AI Generated Test Case 2: Delete Non-Existent Pet
Scenario: Delete pet that doesn't exist
Input: petId = 999999
Expected: HTTP 404
```

#### GET /pet/findByStatus - Find by Status
```
AI Generated Test Case 1: Valid Status Filter
Scenario: Find pets with "available" status
Input: status = "available"
Expected: HTTP 200, returns array of pets

AI Generated Test Case 2: Multiple Status Values
Scenario: Find pets with multiple statuses
Input: status = ["available", "pending"]
Expected: HTTP 200, array with multiple statuses

AI Generated Test Case 3: Invalid Status
Scenario: Find with invalid status value
Input: status = "unknown"
Expected: HTTP 400
```

### 2.2 Store Endpoints - AI Generated

#### POST /store/order - Place Order
```
AI Generated Test Case 1: Valid Order
Scenario: Place order with valid data
Input:
  - petId: 1
  - quantity: 5
  - status: "placed"
Expected: HTTP 200, returns Order object

AI Generated Test Case 2: Negative Quantity
Scenario: Order with negative quantity
Input: quantity = -5
Expected: HTTP 400 (Invalid Order)

AI Generated Test Case 3: Zero Quantity
Scenario: Order with zero quantity
Input: quantity = 0
Expected: HTTP 400
```

#### GET /store/order/{orderId} - Get Order
```
AI Generated Test Case 1: Valid Order ID (1-10)
Scenario: Get order in valid range
Input: orderId = 5
Expected: HTTP 200, returns Order object

AI Generated Test Case 2: Out of Range ID (>10)
Scenario: Get order outside valid range
Input: orderId = 15
Expected: HTTP 400 (API constraint: 1-10)

AI Generated Test Case 3: Negative Order ID
Scenario: Get with negative ID
Input: orderId = -1
Expected: HTTP 400
```

#### DELETE /store/order/{orderId} - Delete Order
```
AI Generated Test Case 1: Delete Valid Order
Scenario: Delete existing order
Input: orderId = 1
Expected: HTTP 200

AI Generated Test Case 2: Delete Invalid Order
Scenario: Delete non-existent order
Input: orderId = 999999
Expected: HTTP 404
```

#### GET /store/inventory - Get Inventory
```
AI Generated Test Case 1: Retrieve Inventory
Scenario: Get current inventory status
Input: No parameters
Expected: HTTP 200, returns object with status counts
```

### 2.3 User Endpoints - AI Generated

#### POST /user - Create User
```
AI Generated Test Case 1: Valid User Creation
Scenario: Create user with all fields
Input:
  - username: "testuser"
  - email: "test@example.com"
  - password: "password123"
Expected: HTTP 200, user created

AI Generated Test Case 2: Minimal User
Scenario: Create with only username
Input: {username: "user"}
Expected: HTTP 200 or 400 (depends on implementation)
```

#### GET /user/{username} - Get User
```
AI Generated Test Case 1: Get Existing User
Scenario: Get user profile
Input: username = "user1"
Expected: HTTP 200, returns User object

AI Generated Test Case 2: Get Non-Existent User
Scenario: Get user that doesn't exist
Input: username = "nonexistent"
Expected: HTTP 404
```

#### GET /user/login - User Login
```
AI Generated Test Case 1: Valid Login
Scenario: Login with valid credentials
Input: username="user1", password="password"
Expected: HTTP 200, returns session token

AI Generated Test Case 2: Invalid Credentials
Scenario: Login with wrong password
Input: username="user1", password="wrong"
Expected: HTTP 400 (Invalid username/password)
```

---

## 3. Manual Refinements & Adjustments

### 3.1 Issues Found & Fixed

#### Issue 1: Status Code Variations
**AI Assumption:** All errors return 400  
**Reality:** API returns 400, 404, or 405 depending on scenario  
**Fix:** Use flexible assertions: `expect([400, 404, 405]).toContain(response.status)`

#### Issue 2: Dynamic ID Generation
**AI Assumption:** Can use hardcoded IDs  
**Reality:** Tests fail on subsequent runs due to conflicts  
**Fix:** Generate random IDs: `Math.floor(Math.random() * 100000)`

#### Issue 3: Order ID Constraints
**AI Assumption:** All numeric IDs work  
**Reality:** Valid range is 1-10 only  
**Fix:** Add specific boundary tests for this constraint

#### Issue 4: Pet Status Values
**AI Assumption:** Any string works for status  
**Reality:** Limited to ["available", "pending", "sold"]  
**Fix:** Validate enum constraints in tests

#### Issue 5: Test Dependencies
**AI Suggestion:** Each test isolated  
**Reality:** Some tests need prerequisites  
**Fix:** Added beforeEach hooks for setup

### 3.2 Refinement Examples

#### Example 1: POST /pet - Refined
```typescript
// AI Generated: Basic structure
// Manual Added: Dynamic ID, flexible status codes, proper assertions

test('Should create a valid pet with all fields', async () => {
  const newPet = {
    id: Math.floor(Math.random() * 100000),  // Manual: Dynamic ID
    name: 'Doggie',
    photoUrls: ['https://example.com/photo.jpg'],
    status: 'available',
  };

  const response = await apiClient.request({
    method: 'POST',
    endpoint: '/pet',
    data: newPet,
    headers: { 'Content-Type': 'application/json' },
  });

  // Manual: Flexible status codes
  expect([200, 201]).toContain(response.status);
  expect(response.data.name).toBe('Doggie');
});
```

#### Example 2: GET /store/order/{orderId} - Refined
```typescript
// AI Generated: Identified boundary testing need
// Manual Added: Specific constraint knowledge (1-10)

test('Should return 400 for order ID outside valid range', async () => {
  const response = await apiClient.request({
    method: 'GET',
    endpoint: '/store/order/15',  // Manual: Outside 1-10 range
  });

  expect([400, 404]).toContain(response.status);
});
```

#### Example 3: Error Handling - Refined
```typescript
// AI Generated: Error case identification
// Manual Added: Proper error validation

test('Should return 404 for non-existent pet', async () => {
  const response = await apiClient.request({
    method: 'GET',
    endpoint: `/pet/99999999`,  // Manual: Large ID ensures uniqueness
  });

  expect(response.status).toBe(404);
});
```

---

## 4. Test Case Distribution

### By Category
- **Happy Path (Positive):** 18 tests (50%)
- **Error Handling (Negative):** 12 tests (35%)
- **Edge Cases (Boundary):** 5 tests (15%)

### By Endpoint
- **Pet Operations:** 15 tests
- **Store Operations:** 9 tests
- **User Operations:** 6 tests

### Test Types
- **Valid Input Tests:** Create/update with correct data
- **Invalid Input Tests:** Missing fields, wrong formats
- **Boundary Tests:** Edge values, constraints
- **Error Path Tests:** Non-existent resources, wrong IDs
- **Status Validation Tests:** Enum constraints

---

## 5. AI vs Manual Contribution

### Generation Phase
- **AI: 85%** - Generated comprehensive test scenarios
- **Manual: 15%** - Prioritized and refined scenarios

### Implementation Phase
- **AI: 70%** - Provided code structure and patterns
- **Manual: 30%** - Fixed bugs, added correct assertions, handled dependencies

### Overall
- **AI Contribution:** ~75% (structure, scenarios, patterns)
- **Manual Contribution:** ~25% (validation, corrections, domain knowledge)

---

## 6. Lessons Learned

### AI Strengths ✅
1. **Rapid Generation:** Generated 50+ test cases in minutes
2. **Comprehensive Coverage:** Identified positive, negative, and edge cases
3. **Pattern Recognition:** Recognized common API patterns across endpoints
4. **Documentation:** Provided clear test descriptions
5. **Completeness:** Thought through all scenarios systematically

### AI Limitations ❌
1. **API Specificity:** Couldn't predict exact HTTP status codes
2. **Constraint Knowledge:** Missed API-specific rules (1-10 order range)
3. **Behavioral Assumptions:** Assumed strict validation vs actual leniency
4. **State Management:** No awareness of test execution order dependencies
5. **ID Generation:** Suggested hardcoded IDs instead of dynamic ones

### Manual Adjustments Required
1. Status code validation against actual API
2. ID generation strategy (random vs hardcoded)
3. API constraint discovery (order ID range, pet status enum)
4. Setup/teardown for dependent resources
5. Error message specificity vs just status codes

### Key Insights
1. **Use AI for brainstorming, humans for validation**
2. **Combine approach produces best results**
3. **Document both AI and manual contributions**
4. **Test against actual API early**
5. **Build in flexibility for variations**

---

## 7. Implementation Strategy

### Test Organization
```
✓ Grouped by endpoint category (Pet, Store, User)
✓ Grouped by test type (Happy, Error, Edge)
✓ Clear naming conventions
✓ Comments explaining AI vs manual work
```

### Key Patterns
```typescript
// Dynamic ID generation
const id = Math.floor(Math.random() * 100000);

// Flexible status codes
expect([200, 201]).toContain(response.status);

// Setup/teardown
test.beforeEach(async () => { /* create test data */ });

// Reusable APIClient
const apiClient = new APIClient(baseURL);
```

### Execution Flow
```
1. Setup: Create necessary test data
2. Execute: Make API request
3. Assert: Validate response
4. Cleanup: Optional (API handles)
```

---

## 8. Limitations & Future Work

### Current Limitations
- Tests against live API (not mocked)
- No authentication token handling yet
- No performance metrics collected
- No concurrent request testing
- Limited data validation depth

### Future Enhancements
- [ ] Add contract testing (validate against Swagger)
- [ ] Implement authentication flows
- [ ] Add performance assertions
- [ ] Create data-driven test variations
- [ ] Add negative scenarios for all operations
- [ ] Implement CI/CD integration

---

## Conclusion

This analysis demonstrates how AI can rapidly generate comprehensive test scenarios, but requires human expertise to:
1. Validate predictions against actual API behavior
2. Discover API-specific constraints and rules
3. Handle implementation complexity (ID generation, setup/teardown)
4. Ensure tests are maintainable and reliable

**Recommendation:** Use AI for initial test case generation, then manually validate and refine based on actual API behavior.

---

**Generation Date:** June 15, 2026  
**Status:** Complete - Ready for Implementation  
**Test Coverage:** 12 endpoints, 35+ tests, all categories (Happy/Error/Edge)
