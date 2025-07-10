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
  AddRegular,
  EditRegular,
  DeleteRegular
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
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
})

interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
}

const mockClients: Client[] = [
  { id: '1', name: 'Juan Pérez', email: 'juan@empresa.com', phone: '123-456-7890', company: 'Empresa A' },
  { id: '2', name: 'María García', email: 'maria@empresa.com', phone: '098-765-4321', company: 'Empresa B' },
  { id: '3', name: 'Carlos López', email: 'carlos@empresa.com', phone: '555-123-4567', company: 'Empresa C' },
]

const Clients: React.FC = () => {
  const styles = useStyles()

  const columns: TableColumnDefinition<Client>[] = [
    createTableColumn<Client>({
      columnId: 'name',
      compare: (a, b) => a.name.localeCompare(b.name),
      renderHeaderCell: () => 'Nombre',
      renderCell: (item) => item.name,
    }),
    createTableColumn<Client>({
      columnId: 'email',
      compare: (a, b) => a.email.localeCompare(b.email),
      renderHeaderCell: () => 'Email',
      renderCell: (item) => item.email,
    }),
    createTableColumn<Client>({
      columnId: 'phone',
      compare: (a, b) => a.phone.localeCompare(b.phone),
      renderHeaderCell: () => 'Teléfono',
      renderCell: (item) => item.phone,
    }),
    createTableColumn<Client>({
      columnId: 'company',
      compare: (a, b) => a.company.localeCompare(b.company),
      renderHeaderCell: () => 'Empresa',
      renderCell: (item) => item.company,
    }),
    createTableColumn<Client>({
      columnId: 'actions',
      renderHeaderCell: () => 'Acciones',
      renderCell: () => (
        <div className={styles.actionButtons}>
          <Button size="small" icon={<EditRegular />} appearance="subtle" />
          <Button size="small" icon={<DeleteRegular />} appearance="subtle" />
        </div>
      ),
    }),
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text as="h1" size={800} weight="semibold" className={styles.title}>
          Listado de Clientes
        </Text>
        <Button icon={<AddRegular />} appearance="primary">
          Agregar Cliente
        </Button>
      </div>
      
      <Body1>
        Gestiona todos los clientes del sistema desde esta sección.
      </Body1>
      
      <Card className={styles.infoCard}>
        <CardHeader>
          <Text weight="semibold">Información</Text>
        </CardHeader>
        <Body1>
          Total de clientes registrados: {mockClients.length}
        </Body1>
      </Card>

      <DataGrid
        items={mockClients}
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
        <DataGridBody<Client>>
          {({ item, rowId }) => (
            <DataGridRow<Client> key={rowId}>
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

export default Clients