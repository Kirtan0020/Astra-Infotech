import { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Seo from '../components/Seo.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import SectionRenderer from '../content/SectionRenderer.jsx'
import { useContent } from '../content/ContentProvider.jsx'

export default function Services() {
  const { pages } = useContent()
  const page = pages.services

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
