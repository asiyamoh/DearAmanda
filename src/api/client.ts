/**
 * Base API client with error handling and response parsing
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

class ApiClientError extends Error {
  statusCode?: number;
  error?: string;

  constructor(message: string, statusCode?: number, error?: string) {
    super(message);
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.error = error;
  }
}

/**
 * Base fetch wrapper with error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Handle non-JSON responses (like 204 No Content)
    if (response.status === 204) {
      // For 204 No Content, return undefined (caller should use void type)
      return undefined as T;
    }

    // Check if response has content
    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      // If no JSON content, return empty object
      return {} as T;
    }

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        message: data.message || 'An error occurred',
        statusCode: response.status,
        error: data.error || response.statusText,
      };
      console.error('❌ API Client: Error response:', error);
      throw new ApiClientError(error.message, error.statusCode, error.error);
    }
    return data as T;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    // Network or other errors
    throw new ApiClientError(
      error instanceof Error ? error.message : 'Network error occurred',
      0
    );
  }
}

/**
 * GET request
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'GET' });
}

/**
 * POST request
 */
export async function apiPost<T>(endpoint: string, body?: unknown): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * PATCH request
 */
export async function apiPatch<T>(
  endpoint: string,
  body?: unknown
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * DELETE request
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'DELETE' });
}
