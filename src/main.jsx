import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'
import App from './App.jsx'
import { DataProvider } from './context/DataContext'
import { CartProvider } from './context/CartContext'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <DataProvider>
        <CartProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </CartProvider>
      </DataProvider>
    </ClerkProvider>
  </StrictMode>
)