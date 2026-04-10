import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import './styles/index.scss'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductPage />} />
      </Route>
    </Routes>
  )
}

export default App
