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
// painted AND at least MIN_VISIBLE_MS has passed — the animation is fast
// enough that on a quick connection it could otherwise disappear almost
// instantly, before it's actually seen.
const MIN_VISIBLE_MS = 1500

setTimeout(() => {
  const preloader = document.getElementById('preloader')
  if (!preloader) return
  preloader.classList.add('preloader-hidden')
  setTimeout(() => preloader.remove(), 450)
}, MIN_VISIBLE_MS)
