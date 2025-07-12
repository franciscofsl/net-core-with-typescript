# Frontend con React + TypeScript + Vite + Microsoft Fluent UI

Este proyecto es un frontend moderno construido con React, TypeScript, Vite y Microsoft Fluent UI, que proporciona una experiencia de usuario similar a Dynamics 365.

## Características

- **React 18** con TypeScript para desarrollo type-safe
- **Microsoft Fluent UI** para componentes y diseño modernos
- **Vite** para desarrollo rápido y hot reload
- **Arquitectura limpia** con separación de responsabilidades
- **Cliente HTTP reutilizable** con manejo de errores y reintentos
- **Configuración flexible** para diferentes entornos

## Páginas Disponibles

- **Home**: Página principal con navegación
- **Clientes**: Gestión de clientes con DataGrid
- **Productos**: Gestión de productos con DataGrid
- **Weather**: Pronóstico del tiempo con integración API

## Configuración de la API

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto para configurar la URL de la API:

```env
VITE_API_BASE_URL=https://localhost:7192
```

### Configuración para Diferentes Entornos

- **Desarrollo**: `.env.local` o `.env.development`
- **Producción**: `.env.production`
- **Staging**: `.env.staging`

Ejemplo de configuración:

```env
# Desarrollo local
VITE_API_BASE_URL=https://localhost:7192

# Producción
VITE_API_BASE_URL=https://api.midominio.com

# Staging
VITE_API_BASE_URL=https://api-staging.midominio.com
```

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── UserHeader.tsx   # Header con menu de usuario
│   └── FluentNavigation.tsx # Navegación con tabs
├── pages/               # Páginas principales
│   ├── clients.tsx      # Gestión de clientes
│   ├── products.tsx     # Gestión de productos
│   └── weather.tsx      # Pronóstico del tiempo
├── services/            # Servicios y clientes API
│   ├── http-client.ts   # Cliente HTTP reutilizable
│   └── weather-client.ts # Cliente específico para Weather API
├── config/              # Configuración
│   └── app.config.ts    # Configuración global
├── common/              # Utilidades comunes
└── assets/              # Recursos estáticos
```

## Servicios y APIs

### HTTP Client

El proyecto incluye un cliente HTTP reutilizable con las siguientes características:

- **Manejo de errores** automático
- **Reintentos** configurable
- **Timeout** configurable
- **Interceptores** para request/response
- **Tipos TypeScript** para responses

### Weather Client

Cliente específico para la API de Weather con:

- **Abstracción completa** de la API
- **Transformación de datos** automática
- **Manejo de errores** específico
- **Métodos de utilidad** para estadísticas

## Desarrollo

### Agregar Nueva Página

1. Crear componente en `src/pages/`
2. Agregar ruta en `src/App.tsx`
3. Agregar navegación en `src/components/FluentNavigation.tsx`

### Agregar Nuevo Servicio API

1. Crear cliente en `src/services/`
2. Definir tipos de datos
3. Implementar métodos usando `httpClient`
4. Agregar endpoint en `src/config/app.config.ts`

### Configuración ESLint

Para habilitar reglas de lint más estrictas para producción:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
