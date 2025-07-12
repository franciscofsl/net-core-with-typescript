import { appConfig } from '../config/app.config'

// Types for error handling
export interface ApiError {
  message: string
  status?: number
  code?: string
}

export class ApiException extends Error {
  public status?: number
  public code?: string
  
  constructor(
    message: string,
    status?: number,
    code?: string
  ) {
    super(message)
    this.name = 'ApiException'
    this.status = status
    this.code = code
  }
}

// Request configuration
export interface RequestConfig {
  headers?: Record<string, string>
  timeout?: number
  retries?: number
}

// Reusable base HTTP client
export class HttpClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>
  private timeout: number
  private retries: number

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || appConfig.apiBaseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    this.timeout = appConfig.http.timeout
    this.retries = appConfig.http.retries
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      return response
    } finally {
      clearTimeout(timeoutId)
    }
  }

  private async executeRequest(
    url: string,
    options: RequestInit,
    config?: RequestConfig
  ): Promise<Response> {
    const mergedHeaders = {
      ...this.defaultHeaders,
      ...config?.headers,
    }

    const requestOptions: RequestInit = {
      ...options,
      headers: mergedHeaders,
    }

    const timeout = config?.timeout || this.timeout
    const retries = config?.retries || this.retries

    let lastError: Error | null = null

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, requestOptions, timeout)
        
        if (!response.ok) {
          const errorText = await response.text()
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`
          
          try {
            const errorJson = JSON.parse(errorText)
            errorMessage = errorJson.message || errorMessage
          } catch {
            // If not JSON, use plain text
            errorMessage = errorText || errorMessage
          }

          throw new ApiException(
            errorMessage,
            response.status,
            response.status.toString()
          )
        }

        return response
      } catch (error) {
        lastError = error as Error
        
        if (error instanceof ApiException) {
          throw error
        }

        if (attempt === retries) {
          if (error instanceof Error && error.name === 'AbortError') {
            throw new ApiException(
              `Request timeout after ${timeout}ms`,
              408,
              'TIMEOUT'
            )
          }
          throw new ApiException(
            `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            0,
            'NETWORK_ERROR'
          )
        }

        // Wait before next attempt
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)))
      }
    }

    throw lastError || new ApiException('Unknown error occurred')
  }

  // HTTP methods
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await this.executeRequest(url, { method: 'GET' }, config)
    return await response.json()
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await this.executeRequest(
      url,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      },
      config
    )
    return await response.json()
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await this.executeRequest(
      url,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      },
      config
    )
    return await response.json()
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await this.executeRequest(url, { method: 'DELETE' }, config)
    return await response.json()
  }

  // Method to set default headers
  setDefaultHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value
  }

  // Method to set authorization token
  setAuthToken(token: string): void {
    this.setDefaultHeader('Authorization', `Bearer ${token}`)
  }
}

// Global HTTP client instance
export const httpClient = new HttpClient()
