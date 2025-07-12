import React from 'react'
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
  tokens
} from '@fluentui/react-components'
import type { TableColumnDefinition } from '@fluentui/react-components'
import {
  WeatherSunnyRegular,
  ArrowSyncRegular
} from '@fluentui/react-icons'

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
})

interface WeatherData {
  id: string
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

const mockWeatherData: WeatherData[] = [
  { id: '1', date: '2025-07-12', temperatureC: 25, temperatureF: 77, summary: 'Soleado' },
  { id: '2', date: '2025-07-13', temperatureC: 22, temperatureF: 72, summary: 'Parcialmente nublado' },
  { id: '3', date: '2025-07-14', temperatureC: 18, temperatureF: 64, summary: 'Lluvioso' },
  { id: '4', date: '2025-07-15', temperatureC: 28, temperatureF: 82, summary: 'Muy soleado' },
  { id: '5', date: '2025-07-16', temperatureC: 20, temperatureF: 68, summary: 'Nublado' },
  { id: '6', date: '2025-07-17', temperatureC: 15, temperatureF: 59, summary: 'Tormentoso' },
  { id: '7', date: '2025-07-18', temperatureC: 26, temperatureF: 79, summary: 'Soleado con nubes' },
]

const Weather: React.FC = () => {
  const styles = useStyles()

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
      renderHeaderCell: () => 'Fecha',
      renderCell: (item) => formatDate(item.date),
    }),
    createTableColumn<WeatherData>({
      columnId: 'temperatureC',
      compare: (a, b) => a.temperatureC - b.temperatureC,
      renderHeaderCell: () => 'Temperatura (°C)',
      renderCell: (item) => (
        <span className={styles.temperatureCell}>
          {item.temperatureC}°C
        </span>
      ),
    }),
    createTableColumn<WeatherData>({
      columnId: 'temperatureF',
      compare: (a, b) => a.temperatureF - b.temperatureF,
      renderHeaderCell: () => 'Temperatura (°F)',
      renderCell: (item) => (
        <span className={styles.temperatureCell}>
          {item.temperatureF}°F
        </span>
      ),
    }),
    createTableColumn<WeatherData>({
      columnId: 'summary',
      compare: (a, b) => a.summary.localeCompare(b.summary),
      renderHeaderCell: () => 'Resumen',
      renderCell: (item) => (
        <span className={styles.summaryCell}>
          {item.summary}
        </span>
      ),
    }),
  ]

  const handleRefresh = () => {
    console.log('Actualizando datos meteorológicos...')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text as="h1" size={800} weight="semibold" className={styles.title}>
          Pronóstico del Tiempo
        </Text>
        <Button 
          icon={<ArrowSyncRegular />} 
          appearance="primary"
          onClick={handleRefresh}
        >
          Actualizar
        </Button>
      </div>
      
      <Body1>
        Consulta el pronóstico del tiempo para los próximos días.
      </Body1>
      
      <Card className={styles.infoCard}>
        <CardHeader>
          <Text weight="semibold">
            <WeatherSunnyRegular style={{ marginRight: '8px' }} />
            Información Meteorológica
          </Text>
        </CardHeader>
        <Body1>
          Mostrando pronóstico para {mockWeatherData.length} días. 
          Temperatura promedio: {Math.round(mockWeatherData.reduce((sum, item) => sum + item.temperatureC, 0) / mockWeatherData.length)}°C
        </Body1>
      </Card>

      <DataGrid
        items={mockWeatherData}
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
    </div>
  )
}

export default Weather