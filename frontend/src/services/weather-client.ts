import { httpClient, ApiException } from './http-client'
import { appConfig } from '../config/app.config'

// Types for Weather API response
export interface WeatherForecastResponse {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

// Type for data processed in the frontend
export interface WeatherData {
  id: string
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

// Weather API specific client
export class WeatherClient {
  private readonly endpoint: string

  constructor() {
    this.endpoint = appConfig.endpoints.weatherForecast
  }

  /**
   * Gets the weather forecast
   * @returns Promise with forecast data
   */
  async getWeatherForecast(): Promise<WeatherData[]> {
    try {
      const response = await httpClient.get<WeatherForecastResponse[]>(this.endpoint)
      
      // Transform API data to frontend expected format
      return response.map((item, index) => ({
        id: `weather-${index + 1}`,
        date: item.date,
        temperatureC: item.temperatureC,
        temperatureF: item.temperatureF,
        summary: item.summary,
      }))
    } catch (error) {
      if (error instanceof ApiException) {
        // Re-throw API errors with additional context
        throw new ApiException(
          `Error getting weather forecast: ${error.message}`,
          error.status,
          error.code
        )
      }
      
      // Handle unknown errors
      throw new ApiException(
        'Unknown error getting weather forecast',
        0,
        'UNKNOWN_ERROR'
      )
    }
  }

  /**
   * Gets the forecast for a specific date
   * @param date Date in ISO string format
   * @returns Promise with forecast data for that date
   */
  async getWeatherForecastByDate(date: string): Promise<WeatherData | null> {
    try {
      const allForecasts = await this.getWeatherForecast()
      return allForecasts.find(forecast => forecast.date === date) || null
    } catch (error) {
      if (error instanceof ApiException) {
        throw error
      }
      throw new ApiException(
        'Error getting forecast for specific date',
        0,
        'UNKNOWN_ERROR'
      )
    }
  }

  /**
   * Gets weather forecast statistics
   * @returns Promise with calculated statistics
   */
  async getWeatherStats(): Promise<{
    averageTemperatureC: number
    averageTemperatureF: number
    minTemperatureC: number
    maxTemperatureC: number
    totalDays: number
    mostCommonSummary: string
  }> {
    try {
      const forecasts = await this.getWeatherForecast()
      
      if (forecasts.length === 0) {
        throw new ApiException('No data available', 404, 'NO_DATA')
      }

      const temperatures = forecasts.map(f => f.temperatureC)
      const summaries = forecasts.map(f => f.summary)
      
      // Calculate average temperature
      const averageTemperatureC = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length
      const averageTemperatureF = (averageTemperatureC * 9/5) + 32
      
      // Find minimum and maximum temperatures
      const minTemperatureC = Math.min(...temperatures)
      const maxTemperatureC = Math.max(...temperatures)
      
      // Find most common summary
      const summaryCount = summaries.reduce((acc, summary) => {
        acc[summary] = (acc[summary] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      const mostCommonSummary = Object.entries(summaryCount)
        .sort(([,a], [,b]) => b - a)[0][0]

      return {
        averageTemperatureC: Math.round(averageTemperatureC * 10) / 10,
        averageTemperatureF: Math.round(averageTemperatureF * 10) / 10,
        minTemperatureC,
        maxTemperatureC,
        totalDays: forecasts.length,
        mostCommonSummary,
      }
    } catch (error) {
      if (error instanceof ApiException) {
        throw error
      }
      throw new ApiException(
        'Error calculating weather statistics',
        0,
        'UNKNOWN_ERROR'
      )
    }
  }
}

// Global Weather client instance
export const weatherClient = new WeatherClient()
