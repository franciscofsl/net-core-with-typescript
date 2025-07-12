import React, { useState, useEffect } from 'react'
import {
  Text,
  Card,
  CardHeader,
  Body1,
  Button,
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridCell,
  DataGridBody,
  createTableColumn,
  makeStyles,
  tokens,
  Spinner,
  MessageBar,
  MessageBarBody
} from '@fluentui/react-components'
import type { TableColumnDefinition } from '@fluentui/react-components'
import {
  WeatherSunnyRegular,
  ArrowSyncRegular,
  ErrorCircleRegular
} from '@fluentui/react-icons'
import { weatherClient, type WeatherData } from '../services/weather-client'
import { ApiException } from '../services/http-client'

const useStyles = makeStyles({
  container: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    color: tokens.colorNeutralForeground1,
  },
  infoCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: '16px',
    borderRadius: tokens.borderRadiusMedium,
  },
  dataGrid: {
    width: '100%',
  },
  temperatureCell: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  summaryCell: {
    fontStyle: 'italic',
    color: tokens.colorNeutralForeground2,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    gap: '12px',
  },
  errorContainer: {
    marginBottom: '16px',
  },
})

const Weather: React.FC = () => {
  const styles = useStyles()
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadWeatherData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await weatherClient.getWeatherForecast()
      setWeatherData(data)
    } catch (err) {
      console.error('Error loading weather data:', err)
      let errorMessage = 'Unknown error loading weather data'
      
      if (err instanceof ApiException) {
        switch (err.status) {
          case 404:
            errorMessage = 'Weather data not found'
            break
          case 500:
            errorMessage = 'Server error while fetching weather data'
            break
          case 0:
            errorMessage = 'Connection error. Please check your internet connection and that the API is running'
            break
          default:
            errorMessage = `Server error: ${err.message}`
        }
      } else if (err instanceof Error) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWeatherData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const columns: TableColumnDefinition<WeatherData>[] = [
    createTableColumn<WeatherData>({
      columnId: 'date',
      compare: (a, b) => a.date.localeCompare(b.date),
      renderHeaderCell: () => 'Date',
      renderCell: (item) => formatDate(item.date),
    }),
    createTableColumn<WeatherData>({
      columnId: 'temperatureC',
      compare: (a, b) => a.temperatureC - b.temperatureC,
      renderHeaderCell: () => 'Temperature (°C)',
      renderCell: (item) => (
        <span className={styles.temperatureCell}>
          {item.temperatureC}°C
        </span>
      ),
    }),
    createTableColumn<WeatherData>({
      columnId: 'temperatureF',
      compare: (a, b) => a.temperatureF - b.temperatureF,
      renderHeaderCell: () => 'Temperature (°F)',
      renderCell: (item) => (
        <span className={styles.temperatureCell}>
          {item.temperatureF}°F
        </span>
      ),
    }),
    createTableColumn<WeatherData>({
      columnId: 'summary',
      compare: (a, b) => a.summary.localeCompare(b.summary),
      renderHeaderCell: () => 'Summary',
      renderCell: (item) => (
        <span className={styles.summaryCell}>
          {item.summary}
        </span>
      ),
    }),
  ]

  const handleRefresh = () => {
    loadWeatherData()
  }

  const averageTemperature = weatherData.length > 0 
    ? Math.round(weatherData.reduce((sum, item) => sum + item.temperatureC, 0) / weatherData.length)
    : 0

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text as="h1" size={800} weight="semibold" className={styles.title}>
          Weather Forecast
        </Text>
        <Button 
          icon={<ArrowSyncRegular />} 
          appearance="primary"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>
      
      <Body1>
        Check the weather forecast for the upcoming days.
      </Body1>

      {error && (
        <div className={styles.errorContainer}>
          <MessageBar intent="error">
            <MessageBarBody>
              <ErrorCircleRegular style={{ marginRight: '8px' }} />
              {error}
            </MessageBarBody>
          </MessageBar>
        </div>
      )}

      {loading && !error && (
        <div className={styles.loadingContainer}>
          <Spinner size="medium" />
          <Body1>Loading weather data...</Body1>
        </div>
      )}

      {!loading && !error && (
        <>
          <Card className={styles.infoCard}>
            <CardHeader>
              <Text weight="semibold">
                <WeatherSunnyRegular style={{ marginRight: '8px' }} />
                Weather Information
              </Text>
            </CardHeader>
            <Body1>
              Showing forecast for {weatherData.length} days. 
              {weatherData.length > 0 && (
                <> Average temperature: {averageTemperature}°C</>
              )}
            </Body1>
          </Card>

          <DataGrid
            items={weatherData}
            columns={columns}
            sortable
            className={styles.dataGrid}
            getRowId={(item) => item.id}
          >
            <DataGridHeader>
              <DataGridRow>
                {({ renderHeaderCell }) => (
                  <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                )}
              </DataGridRow>
            </DataGridHeader>
            <DataGridBody<WeatherData>>
              {({ item, rowId }) => (
                <DataGridRow<WeatherData> key={rowId}>
                  {({ renderCell }) => (
                    <DataGridCell>{renderCell(item)}</DataGridCell>
                  )}
                </DataGridRow>
              )}
            </DataGridBody>
          </DataGrid>
        </>
      )}
    </div>
  )
}

export default Weather