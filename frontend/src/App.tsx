import { Routes, Route } from 'react-router'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import './App.css'
import Home from './common/home'
import Clients from './pages/clients'
import Products from './pages/products'
import UserHeader from './components/UserHeader'
import FluentNavigation from './components/FluentNavigation'

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="app">
        <UserHeader />
        <FluentNavigation />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
      </div>
    </FluentProvider>
  )
}

export default App
