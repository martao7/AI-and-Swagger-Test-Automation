import axios, { AxiosInstance } from 'axios';

export interface TestRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  headers?: Record<string, string>;
  data?: any;
  params?: Record<string, any>;
}

export interface TestResponse {
  status: number;
  statusText: string;
  data: any;
  headers: Record<string, string>;
}

export class APIClient {
  private client: AxiosInstance;

  constructor(baseURL: string = process.env.API_BASE_URL || 'https://petstore.swagger.io/v2') {
    this.client = axios.create({
      baseURL,
      timeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
    });
  }

  async request(testRequest: TestRequest): Promise<TestResponse> {
    try {
      const response = await this.client.request({
        method: testRequest.method,
        url: testRequest.endpoint,
        headers: testRequest.headers,
        data: testRequest.data,
        params: testRequest.params,
      });

      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers as Record<string, string>,
      };
    } catch (error: any) {
      if (error.response) {
        return {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers as Record<string, string>,
        };
      }
      throw error;
    }
  }
}
