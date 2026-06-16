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
export declare class APIClient {
    private client;
    constructor(baseURL?: string);
    request(testRequest: TestRequest): Promise<TestResponse>;
}
