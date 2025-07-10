import React from 'react'
import {
  Text,
  Card,
  CardHeader,
  CardPreview,
  Body1,
  Button,
  Badge,
  makeStyles,
  tokens
} from '@fluentui/react-components'
import {
  AddRegular,
  ShoppingBagRegular,
  MoneyRegular
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
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
  productCard: {
    height: 'fit-content',
  },
  productImage: {
    width: '100%',
    height: '200px',
    backgroundColor: tokens.colorNeutralBackground3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.borderRadiusMedium,
  },
  productContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  productHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productPrice: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  productActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  },
})

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  status: 'available' | 'out-of-stock' | 'discontinued'
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Dell XPS 13',
    description: 'Laptop ultrabook con procesador Intel i7, 16GB RAM, 512GB SSD',
    price: 1299.99,
    category: 'Tecnología',
    stock: 15,
    status: 'available'
  },
  {
    id: '2',
    name: 'Mouse Logitech MX Master 3',
    description: 'Mouse inalámbrico ergonómico para productividad',
    price: 89.99,
    category: 'Accesorios',
    stock: 0,
    status: 'out-of-stock'
  },
  {
    id: '3',
    name: 'Monitor LG 27" 4K',
    description: 'Monitor 4K UHD de 27 pulgadas con conectividad USB-C',
    price: 449.99,
    category: 'Monitores',
    stock: 8,
    status: 'available'
  },
]

const Products: React.FC = () => {
  const styles = useStyles()

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'available':
        return <Badge appearance="filled" color="success">Disponible</Badge>
      case 'out-of-stock':
        return <Badge appearance="filled" color="danger">Sin stock</Badge>
      case 'discontinued':
        return <Badge appearance="filled" color="subtle">Descontinuado</Badge>
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text as="h1" size={800} weight="semibold" className={styles.title}>
          Catálogo de Productos
        </Text>
        <Button icon={<AddRegular />} appearance="primary">
          Agregar Producto
        </Button>
      </div>
      
      <Body1>
        Gestiona el inventario y catálogo de productos disponibles.
      </Body1>
      
      <Card className={styles.infoCard}>
        <CardHeader>
          <Text weight="semibold">Resumen del Inventario</Text>
        </CardHeader>
        <Body1>
          Total de productos: {mockProducts.length} | 
          En stock: {mockProducts.filter(p => p.status === 'available').length} | 
          Sin stock: {mockProducts.filter(p => p.status === 'out-of-stock').length}
        </Body1>
      </Card>

      <div className={styles.productsGrid}>
        {mockProducts.map((product) => (
          <Card key={product.id} className={styles.productCard}>
            <CardPreview>
              <div className={styles.productImage}>
                <ShoppingBagRegular fontSize={48} color={tokens.colorNeutralForeground3} />
              </div>
            </CardPreview>
            
            <div className={styles.productContent}>
              <div className={styles.productHeader}>
                <Text weight="semibold" size={500}>
                  {product.name}
                </Text>
                {getStatusBadge(product.status)}
              </div>
              
              <Body1>{product.description}</Body1>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text className={styles.productPrice} size={600}>
                  ${product.price}
                </Text>
                <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
                  Stock: {product.stock}
                </Text>
              </div>
              
              <div className={styles.productActions}>
                <Button size="small" appearance="outline" style={{ flex: 1 }}>
                  Editar
                </Button>
                <Button 
                  size="small" 
                  appearance="primary" 
                  icon={<MoneyRegular />}
                  style={{ flex: 1 }}
                  disabled={product.status !== 'available'}
                >
                  Vender
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Products