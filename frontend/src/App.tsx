import { Routes, Route } from 'react-router'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import './App.css'
import Home from './common/home'
import Weather from './pages/weather'
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
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </main>
      </div>
    </FluentProvider>
  )
}

export default App
