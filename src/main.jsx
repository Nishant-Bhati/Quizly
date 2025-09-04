import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Entry point: mount React app under #root
// StrictMode helps identify potential problems during development.
// BrowserRouter enables client-side routing for '/', '/quiz', and '/results'.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
