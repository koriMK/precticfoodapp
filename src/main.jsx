import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'  // Updated import path
import './styles/global.css'
import { AppProvider } from './AppContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
)