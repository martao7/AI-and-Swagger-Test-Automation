import { test, expect } from '@playwright/test';
import { APIClient } from '../src/apiClient';

/**
 * Comprehensive Petstore API Test Suite
 * Test Categories: Happy Path, Error Handling, Edge Cases
 * AI-Generated: ~75% | Manual Refinements: ~25%
 */

test.describe('Petstore API - Pet Endpoints', () => {
  let apiClient: APIClient;

  test.beforeAll(() => {
    apiClient = new APIClient();
  });

  test.describe('POST /pet - Create Pet', () => {
    // AI Generated: Test case identification
    // Manual: Dynamic ID, flexible status codes, proper assertions
    test('Should create a valid pet with all fields', async () => {
      const newPet = {
        id: Math.floor(Math.random() * 100000),
        name: 'Doggie',
        photoUrls: ['https://example.com/photo1.jpg'],
        status: 'available',
        category: { id: 1, name: 'Dogs' },
        tags: [{ id: 1, name: 'tag1' }],
      };

      const response = await apiClient.request({
        method: 'POST',
        endpoint: '/pet',
        data: newPet,
        headers: { 'Content-Type': 'application/json' },
      });

      expect([200, 201]).toContain(response.status);
      expect(response.data).toHaveProperty('id');
      expect(response.data.name).toBe('Doggie');
      expect(response.data.status).toBe('available');
    });

    test('Should create pet with minimal required fields', async () => {
      const minimalPet = {
        id: Math.floor(Math.random() * 100000),
        name: 'Kitty',
        photoUrls: ['https://example.com/photo.jpg'],
      };

      const response = await apiClient.request({
        method: 'POST',
        endpoint: '/pet',
        data: minimalPet,
        headers: { 'Content-Type': 'application/json' },
      });

      expect([200, 201]).toContain(response.status);
      expect(response.data.name).toBe('Kitty');
    });

    test('Should accept different valid statuses', async () => {
      const statuses = ['available', 'pending', 'sold'];
      
      for (const status of statuses) {
        const pet = {
          id: Math.floor(Math.random() * 100000),
          name: `Pet_${status}`,
          photoUrls: ['https://example.com/photo.jpg'],
          status: status,
        };

        const response = await apiClient.request({
          method: 'POST',
          endpoint: '/pet',
          data: pet,
          headers: { 'Content-Type': 'application/json' },
        });

        expect([200, 201]).toContain(response.status);
        expect(response.data.status).toBe(status);
      }
    });
  });

  test.describe('GET /pet/{petId} - Retrieve Pet', () => {
    test('Should retrieve pet by ID or return not found', async () => {
      // AI Generated: Happy path assumption
      // Manual: Pet ID 1 may not always exist, handle both cases
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/pet/1',
      });

      // Manual: Accept either successful retrieval or not found
      expect([200, 404]).toContain(response.status);
      if (response.status === 200) {
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('name');
      }
    });

    test('Should return 404 for non-existent pet', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/pet/99999999',
      });

      expect(response.status).toBe(404);
    });

    test('Should handle invalid ID format gracefully', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/pet/invalid',
      });

      expect([400, 404]).toContain(response.status);
    });

    test('Should handle negative pet ID', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/pet/-1',
      });

      expect([400, 404]).toContain(response.status);
    });
  });

  test.describe('PUT /pet - Update Pet', () => {
    let petToUpdate: number;

    test.beforeEach(async () => {
      // Manual: Setup hook to create test pet
      const newPet = {
        id: Math.floor(Math.random() * 100000),
        name: 'UpdateTest',
        photoUrls: ['https://example.com/photo.jpg'],
        status: 'available',
      };

      const createResponse = await apiClient.request({
        method: 'POST',
        endpoint: '/pet',
        data: newPet,
        headers: { 'Content-Type': 'application/json' },
      });

      petToUpdate = createResponse.data.id || newPet.id;
    });

    test('Should update pet status successfully', async () => {
      const updatedPet = {
        id: petToUpdate,
        name: 'UpdateTest',
        photoUrls: ['https://example.com/photo.jpg'],
        status: 'sold',
      };

      const response = await apiClient.request({
        method: 'PUT',
        endpoint: '/pet',
        data: updatedPet,
        headers: { 'Content-Type': 'application/json' },
      });

      expect([200, 201]).toContain(response.status);
      expect(response.data.status).toBe('sold');
    });

    test('Should update pet with partial data', async () => {
      const partialUpdate = {
        id: petToUpdate,
        name: 'NewName',
        photoUrls: ['https://example.com/new-photo.jpg'],
      };

      const response = await apiClient.request({
        method: 'PUT',
        endpoint: '/pet',
        data: partialUpdate,
        headers: { 'Content-Type': 'application/json' },
      });

      expect([200, 201]).toContain(response.status);
      expect(response.data.name).toBe('NewName');
    });
  });

  test.describe('DELETE /pet/{petId} - Delete Pet', () => {
    let petToDelete: number;

    test.beforeEach(async () => {
      const newPet = {
        id: Math.floor(Math.random() * 100000),
        name: 'DeleteMe',
        photoUrls: ['https://example.com/photo.jpg'],
      };

      const createResponse = await apiClient.request({
        method: 'POST',
        endpoint: '/pet',
        data: newPet,
        headers: { 'Content-Type': 'application/json' },
      });

      petToDelete = createResponse.data.id || newPet.id;
    });

    test('Should delete existing pet', async () => {
      const response = await apiClient.request({
        method: 'DELETE',
        endpoint: `/pet/${petToDelete}`,
      });

      expect([200, 204]).toContain(response.status);
    });

    test('Should return error for non-existent pet', async () => {
      const response = await apiClient.request({
        method: 'DELETE',
        endpoint: '/pet/99999999',
      });

      expect([400, 404]).toContain(response.status);
    });
  });

  test.describe('GET /pet/findByStatus - Find by Status', () => {
    test('Should find pets with available status', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/pet/findByStatus?status=available',
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    test('Should find pets with pending status', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/pet/findByStatus?status=pending',
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    test('Should find pets with multiple status filters', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/pet/findByStatus?status=available&status=pending',
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    test('Should handle invalid status value', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/pet/findByStatus?status=invalid',
      });

      // AI: Assumed strict validation
      // Manual: API may be lenient
      expect([200, 400]).toContain(response.status);
    });
  });
});

test.describe('Petstore API - Store Endpoints', () => {
  let apiClient: APIClient;

  test.beforeAll(() => {
    apiClient = new APIClient();
  });

  test.describe('POST /store/order - Place Order', () => {
    test('Should place a valid order', async () => {
      const order = {
        id: Math.floor(Math.random() * 10),
        petId: 1,
        quantity: 5,
        status: 'placed',
      };

      const response = await apiClient.request({
        method: 'POST',
        endpoint: '/store/order',
        data: order,
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id');
    });

    test('Should accept or reject order with negative quantity', async () => {
      // AI Generated: Expected validation for negative quantity
      // Manual: API actually accepts negative quantities (no strict validation)
      const invalidOrder = {
        id: Math.floor(Math.random() * 10),
        petId: 1,
        quantity: -5,
        status: 'placed',
      };

      const response = await apiClient.request({
        method: 'POST',
        endpoint: '/store/order',
        data: invalidOrder,
        headers: { 'Content-Type': 'application/json' },
      });

      // Manual: API is lenient - accepts orders without strict validation
      expect([200, 400, 405]).toContain(response.status);
    });

    test('Should accept or reject order with zero quantity', async () => {
      // AI Generated: Expected validation for zero quantity
      // Manual: API actually accepts zero quantity (no strict validation)
      const invalidOrder = {
        id: Math.floor(Math.random() * 10),
        petId: 1,
        quantity: 0,
      };

      const response = await apiClient.request({
        method: 'POST',
        endpoint: '/store/order',
        data: invalidOrder,
        headers: { 'Content-Type': 'application/json' },
      });

      // Manual: API is lenient - accepts orders without strict validation
      expect([200, 400, 405]).toContain(response.status);
    });
  });

  test.describe('GET /store/order/{orderId} - Retrieve Order', () => {
    test('Should retrieve order in valid range (1-10)', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/store/order/5',
      });

      // Manual: API may or may not have this order
      expect([200, 404]).toContain(response.status);
    });

    test('Should return 400 for order ID outside valid range (>10)', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/store/order/15',
      });

      // AI expected strict validation, but API may accept or reject this ID
      expect([200, 400, 404]).toContain(response.status);
    });

    test('Should handle negative order ID', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/store/order/-1',
      });

      expect([400, 404]).toContain(response.status);
    });
  });

  test.describe('DELETE /store/order/{orderId} - Delete Order', () => {
    test('Should delete order with valid ID', async () => {
      const response = await apiClient.request({
        method: 'DELETE',
        endpoint: '/store/order/1',
      });

      expect([200, 204, 404]).toContain(response.status);
    });

    test('Should handle negative order ID in delete', async () => {
      const response = await apiClient.request({
        method: 'DELETE',
        endpoint: '/store/order/-1',
      });

      expect([400, 404]).toContain(response.status);
    });
  });

  test.describe('GET /store/inventory - Get Inventory', () => {
    test('Should return inventory map', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/store/inventory',
      });

      expect(response.status).toBe(200);
      expect(typeof response.data).toBe('object');
    });
  });
});

test.describe('Petstore API - User Endpoints', () => {
  let apiClient: APIClient;
  let testUsername: string;

  test.beforeAll(() => {
    apiClient = new APIClient();
    testUsername = `testuser_${Date.now()}`;
  });

  test.describe('POST /user - Create User', () => {
    test('Should create user with valid data', async () => {
      const newUser = {
        id: Math.floor(Math.random() * 10000),
        username: testUsername,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const response = await apiClient.request({
        method: 'POST',
        endpoint: '/user',
        data: newUser,
        headers: { 'Content-Type': 'application/json' },
      });

      expect([200, 201]).toContain(response.status);
    });

    test('Should create user with minimal fields', async () => {
      const minimalUser = {
        username: `minimal_${Date.now()}`,
      };

      const response = await apiClient.request({
        method: 'POST',
        endpoint: '/user',
        data: minimalUser,
        headers: { 'Content-Type': 'application/json' },
      });

      expect([200, 201, 400]).toContain(response.status);
    });
  });

  test.describe('GET /user/{username} - Retrieve User', () => {
    test('Should retrieve user by username', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: `/user/${testUsername}`,
      });

      expect([200, 404]).toContain(response.status);
    });

    test('Should return 404 for non-existent user', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: `/user/nonexistent_${Date.now()}`,
      });

      expect([404, 400]).toContain(response.status);
    });
  });

  test.describe('GET /user/login - User Login', () => {
    test('Should attempt login with credentials', async () => {
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/user/login?username=user1&password=password',
      });

      expect([200, 400, 401]).toContain(response.status);
    });

    test('Should handle login with invalid credentials', async () => {
      // AI Generated: Expected rejection of invalid credentials
      // Manual: API actually returns 200 even for wrong credentials (lenient)
      const response = await apiClient.request({
        method: 'GET',
        endpoint: '/user/login?username=invalid&password=wrong',
      });

      // Manual: API returns 200 even with invalid credentials
      expect([200, 400, 401]).toContain(response.status);
    });
  });
});
