import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import CriarContaPage from './pages/CriarContaPage'
import RecuperarSenhaPage from './pages/RecuperarSenhaPage'
import FichaPage from './pages/FichaPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/criar-conta" element={<CriarContaPage />} />
      <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
      <Route path="/ficha" element={<FichaPage />} />
    </Routes>
  )
}

export default App
