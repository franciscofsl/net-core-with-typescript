import { Routes, Route, Link } from 'react-router'
import './App.css'
import Home from './common/home'
import Clients from './pages/clients'
import Products from './pages/products'

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>Mi Sistema</h2>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">Inicio</Link>
          </li>
          <li>
            <Link to="/clients" className="nav-link">Clientes</Link>
          </li>
          <li>
            <Link to="/products" className="nav-link">Productos</Link>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
