import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { BodaPage } from './features/boda/BodaPage.jsx'
import { BodaRespuestasPage } from './features/boda/BodaRespuestasPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<BodaPage />} />
        <Route path="/respuestas" element={<BodaRespuestasPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
