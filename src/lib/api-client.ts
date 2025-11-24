/**
 * Lightweight API client using native fetch
 * No external dependencies - keeps bundle size small
 */

export interface ApiError {
  message: string
  status?: number
  statusText?: string
  data?: unknown
}

export class ApiClientError extends Error {
  status?: number
  statusText?: string
  data?: unknown

  constructor(message: string, status?: number, statusText?: string, data?: unknown) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.statusText = statusText
    this.data = data
  }
}

export interface RequestConfig extends RequestInit {
  baseURL?: string
  timeout?: number
}

/**
 * Get API base URL from environment or use relative path
 */
function getBaseURL(): string {
  if (typeof window === 'undefined') return ''
  return import.meta.env.VITE_API_BASE_URL || ''
}

/**
 * Create full URL from path and base URL
 */
function createURL(path: string, baseURL?: string): string {
  const base = baseURL || getBaseURL()
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  if (base && !path.startsWith('/')) {
    return `${base}/${path}`
  }
  return base ? `${base}${path}` : path
}

/**
 * Create timeout promise
 */
function createTimeout(timeout: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeout)
  })
}

/**
 * Make API request with error handling
 */
async function request<T>(path: string, config: RequestConfig = {}): Promise<T> {
  const { baseURL, timeout = 30000, ...fetchConfig } = config

  const url = createURL(path, baseURL)
  const headers = new Headers(fetchConfig.headers)

  // Set default headers
  if (!headers.has('Content-Type') && fetchConfig.body) {
    headers.set('Content-Type', 'application/json')
  }

  try {
    const controller = new AbortController()
    const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null

    const response = await Promise.race([
      fetch(url, {
        ...fetchConfig,
        headers,
        signal: controller.signal,
      }),
      timeout ? createTimeout(timeout) : Promise.never(),
    ])

    if (timeoutId) clearTimeout(timeoutId)

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type')
    const isJSON = contentType?.includes('application/json')

    let data: T
    if (isJSON) {
      data = await response.json()
    } else {
      data = (await response.text()) as unknown as T
    }

    if (!response.ok) {
      throw new ApiClientError(
        (data as { message?: string })?.message || response.statusText || 'Request failed',
        response.status,
        response.statusText,
        data
      )
    }

    return data
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error
    }
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiClientError('Request timeout', 408)
      }
      throw new ApiClientError(error.message)
    }
    throw new ApiClientError('Unknown error occurred')
  }
}

/**
 * API Client with common HTTP methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get: <T>(path: string, config?: RequestConfig): Promise<T> => {
    return request<T>(path, { ...config, method: 'GET' })
  },

  /**
   * POST request
   */
  post: <T>(path: string, data?: unknown, config?: RequestConfig): Promise<T> => {
    return request<T>(path, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  /**
   * PUT request
   */
  put: <T>(path: string, data?: unknown, config?: RequestConfig): Promise<T> => {
    return request<T>(path, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  /**
   * PATCH request
   */
  patch: <T>(path: string, data?: unknown, config?: RequestConfig): Promise<T> => {
    return request<T>(path, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  /**
   * DELETE request
   */
  delete: <T>(path: string, config?: RequestConfig): Promise<T> => {
    return request<T>(path, { ...config, method: 'DELETE' })
  },
}

/**
 * React Query integration helper
 * Use with @tanstack/react-query
 */
export function createQueryFn<T>(path: string, config?: RequestConfig) {
  return () => apiClient.get<T>(path, config)
}

/**
 * React Query mutation helper
 */
export function createMutationFn<TData, TVariables>(
  method: 'post' | 'put' | 'patch' | 'delete',
  path: string | ((variables: TVariables) => string),
  config?: RequestConfig
) {
  return (variables: TVariables) => {
    const url = typeof path === 'function' ? path(variables) : path
    return apiClient[method]<TData>(url, variables, config)
  }
}
