"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIClient = void 0;
const axios_1 = __importDefault(require("axios"));
class APIClient {
    constructor(baseURL = process.env.API_BASE_URL || 'https://petstore.swagger.io/v2') {
        this.client = axios_1.default.create({
            baseURL,
            timeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
        });
    }
    async request(testRequest) {
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
                headers: response.headers,
            };
        }
        catch (error) {
            if (error.response) {
                return {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data,
                    headers: error.response.headers,
                };
            }
            throw error;
        }
    }
}
exports.APIClient = APIClient;
//# sourceMappingURL=apiClient.js.map