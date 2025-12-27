import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Payment from './pages/Payment.tsx'
import Layout from './Layout.tsx'
import { Web3Provider } from './provider/Web3Provider.tsx'
import { VerificationProvider } from './context/VerificationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Web3Provider>
      <VerificationProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<App />} />
              <Route path="/payment" element={<Payment />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </VerificationProvider>
    </Web3Provider>
  </StrictMode>,
)
