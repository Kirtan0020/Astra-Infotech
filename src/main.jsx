import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import ContentProvider from './content/ContentProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ContentProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContentProvider>
    </HelmetProvider>
  </StrictMode>,
)

// Fade out and remove the static index.html preloader once React has
// painted the real UI (fallback content renders synchronously, so this is
// never waiting on the network — just the next frame after mount).
requestAnimationFrame(() => {
  const preloader = document.getElementById('preloader')
  if (!preloader) return
  preloader.classList.add('preloader-hidden')
  setTimeout(() => preloader.remove(), 450)
})
