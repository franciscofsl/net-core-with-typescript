import React from 'react'
import {
  Text,
  Card,
  CardHeader,
  Body1,
  makeStyles,
  tokens
} from '@fluentui/react-components'

const useStyles = makeStyles({
  container: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: {
    color: tokens.colorNeutralForeground1,
    marginBottom: '8px',
  },
  welcomeCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: '16px',
    borderRadius: tokens.borderRadiusMedium,
  },
})

const Home: React.FC = () => {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <Text as="h1" size={800} weight="semibold" className={styles.title}>
        Hola, Bienvenido al sistema
      </Text>
      
      <Body1>
        Esta es la página de inicio del sistema. Desde aquí puedes navegar a las diferentes secciones.
      </Body1>
      
      <Card className={styles.welcomeCard}>
        <CardHeader>
          <Text weight="semibold">Sistema iniciado correctamente</Text>
        </CardHeader>
        <Body1>
          Utiliza la navegación superior para acceder a las secciones de Clientes y Productos.
        </Body1>
      </Card>
    </div>
  )
}

export default Home