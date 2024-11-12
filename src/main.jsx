import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LocalHostLoginProvider } from './components/Login/LocalHostLoginProvider.jsx'
import { DataFetcherProvider } from './components/Data/DataFetcherProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <LocalHostLoginProvider>
      <DataFetcherProvider>
        <App />
      </DataFetcherProvider>
    </LocalHostLoginProvider>
    </BrowserRouter>
  </StrictMode>,
)
