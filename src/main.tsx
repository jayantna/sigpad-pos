import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Payment from './pages/Payment.tsx'
import PaymentTerminal from './pages/PaymentTerminal.tsx'
import PaymentSuccess from './pages/PaymentSuccess.tsx'
import Layout from './Layout.tsx'
import { Web3Provider } from './provider/Web3Provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Web3Provider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-terminal" element={<PaymentTerminal />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Web3Provider>
  </StrictMode>,
)
