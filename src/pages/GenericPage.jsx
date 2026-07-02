import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Seo from '../components/Seo.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import StackedSectionList from '../components/StackedSectionList.jsx'
import SectionRenderer from '../content/SectionRenderer.jsx'
import { useContent } from '../content/ContentProvider.jsx'

// Renders any page the admin created (not one of the 7 built-in routes) by
// matching the current URL against the fetched pages' `path` — so a new page
// goes live the moment it's added in /admin, with zero code changes.
export default function GenericPage() {
  const { pathname } = useLocation()
  const { pages } = useContent()
  const page = Object.values(pages).find((p) => p.path === pathname)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!page) {
    return (
      <div id="top" className="relative flex min-h-screen flex-col bg-[var(--color-bg)]">
        <Navbar />
        <div className="flex flex-1 items-center justify-center text-center">
          <div>
            <p className="font-display text-3xl text-[var(--color-text)]">Page not found</p>
            <p className="mt-2 text-sm text-[var(--color-text)]/50">{pathname}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (page.layout === 'stacked') {
    const heroSection = page.sections.find((s) => s.type === 'hero')
    const otherSections = page.sections.filter((s) => s.type !== 'hero')
    return (
      <div id="top" className="relative min-h-screen bg-[var(--color-bg)]">
        <Seo {...page.meta} />
        <ScrollProgress />
        <Navbar />
        {heroSection && <SectionRenderer section={heroSection} />}
        <StackedSectionList sections={otherSections} />
        <Footer />
      </div>
    )
  }

  return (
    <div id="top" className="relative min-h-screen bg-[var(--color-bg)]">
      <Seo {...page.meta} />
      <ScrollProgress />
      <Navbar />
      {page.sections.map((section, i) => (
        <SectionRenderer key={section.id ?? i} section={section} />
      ))}
      <Footer />
    </div>
  )
}
