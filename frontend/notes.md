# Step-by-Step Guide: React + TypeScript + Vite Project

## 📋 Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (included with Node.js)
- **Code editor** (VS Code recommended)
- **Git** (optional but recommended)

## 🚀 Project Creation

### 1. Create project with Vite
```bash
npm create vite@latest my-project -- --template react-ts
cd my-project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Initial project structure
```
my-project/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## ⚙️ package.json Configuration

### Recommended scripts:
```json
{
  "scripts": {
    "start": "vite",
    "dev": "vite", 
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "preview": "vite preview"
  }
}
```

## 🔧 Important Dependencies

### Main dependencies:
- `react` - Main library
- `react-dom` - DOM rendering
- `@rollup/rollup-win32-x64-msvc` - For Windows (if needed)

### Development dependencies:
- `@vitejs/plugin-react` - Vite plugin for React
- `typescript` - TypeScript compiler
- `@types/react` - Types for React
- `@types/react-dom` - Types for React DOM
- `eslint` - Code linter
- `vite` - Build tool

## 🏃‍♂️ Commands to Execute

### Daily development:
```bash
# Install dependencies (first time)
npm install

# Start development server
npm start
# or
npm run dev
```

### Code verification:
```bash
# Check linting errors
npm run lint

# Fix errors automatically
npm run lint:fix
```

### Production:
```bash
# Compile for production
npm run build

# Preview production build
npm run preview
```

## 🔥 Hot Reloading

- Code changes are reflected automatically
- Server runs on `http://localhost:5173/`
- No need to restart server to see changes

## ❌ Common Problem Solutions

### Rollup error on Windows:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Install specific dependency for Windows
npm install @rollup/rollup-win32-x64-msvc
```

### Port occupied:
```bash
# Vite automatically finds a free port
# or you can specify one:
npm run dev -- --port 3000
```

### TypeScript errors:
```bash
# Check configuration in tsconfig.json
# Make sure types are installed
npm install @types/react @types/react-dom
```

## 📁 Recommended Structure

```
src/
├── components/          # Reusable components
├── pages/              # Main pages/views
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── types/              # Type definitions
├── assets/             # Images, icons, etc.
└── styles/             # CSS/SCSS files
```

## 🎯 Recommended Workflow

1. **Development:**
   ```bash
   npm start
   ```

2. **Before commit:**
   ```bash
   npm run lint
   npm run build
   ```

3. **Deploy:**
   ```bash
   npm run build
   # Files will be in dist/
   ```

## 🔗 Useful Links

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)

## 💡 Additional Tips

- Use **ESLint** to maintain consistent code
- Take advantage of **TypeScript** for static typing
- **Vite** is faster than Create React App
- **Hot reloading** speeds up development
- Use small and reusable **components**