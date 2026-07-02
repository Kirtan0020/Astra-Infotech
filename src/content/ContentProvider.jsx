import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fallbackSettings, fallbackNavLinks, fallbackFooterLinks, fallbackPages } from './fallbackContent.js'

const CACHE_KEY = 'astra_cms_content_cache_v1'

const fallbackValue = {
  settings: fallbackSettings,
  navLinks: fallbackNavLinks,
  footerLinks: fallbackFooterLinks,
  pages: fallbackPages,
}

const ContentContext = createContext({ ...fallbackValue, status: 'fallback' })

export default function ContentProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        return { ...JSON.parse(cached), status: 'cached' }
      }
    } catch {
      // sessionStorage unavailable or corrupt cache — fall through to fallback
    }
    return { ...fallbackValue, status: 'loading' }
  })

  useEffect(() => {
    let cancelled = false

    fetch('/api/public/site.php')
      .then((res) => {
        if (!res.ok) throw new Error(`site.php ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setState({ ...data, status: 'ready' })
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(data))
        } catch {
          // storage full/unavailable — non-fatal, just skip caching
        }
      })
      .catch(() => {
        if (cancelled) return
        setState((prev) => ({ ...prev, status: prev.status === 'cached' ? 'cached' : 'fallback' }))
      })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => state, [state])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  return useContext(ContentContext)
}
