import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LocalHostLoginProvider } from './components/Login/LocalHostLoginProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <LocalHostLoginProvider>
       <App />
    </LocalHostLoginProvider>
    </BrowserRouter>
  </StrictMode>,
)
