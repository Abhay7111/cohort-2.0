import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Theme_context from './context/Theme.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme_context>
    <App />
  </Theme_context>
  </StrictMode>,
)
