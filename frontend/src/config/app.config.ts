// Global application configuration
export const appConfig = {
  // API base URL
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7192',
  
  // Specific endpoints
  endpoints: {
    weatherForecast: '/WeatherForecast',
  },
  
  // HTTP configuration
  http: {
    timeout: 10000, // 10 seconds
    retries: 3,
  },
  
  // Other configurations
  app: {
    name: 'My System',
    version: '1.0.0',
  },
} as const

// Type for config
export type AppConfig = typeof appConfig

// Helper to get complete URLs
export const getApiUrl = (endpoint: string): string => {
  return `${appConfig.apiBaseUrl}${endpoint}`
}

// Helper to get specific endpoint
export const getWeatherForecastUrl = (): string => {
  return getApiUrl(appConfig.endpoints.weatherForecast)
}
