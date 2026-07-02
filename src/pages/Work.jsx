import { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Seo from '../components/Seo.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import SectionRenderer from '../content/SectionRenderer.jsx'
import { useContent } from '../content/ContentProvider.jsx'

export default function Work() {
  const { pages } = useContent()
  const page = pages.work
  const workItems = page.sections.find((s) => s.type === 'work')?.items ?? []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div id="top" className="relative min-h-screen bg-[var(--color-bg)]">
      <Seo {...page.meta} />
      <ScrollProgress />
      <Navbar />
      {page.sections.map((section, i) =>
        section.type === 'hero' ? (
          <SectionRenderer
            key={section.id ?? i}
            section={{ ...section, data: { ...section.data, previewItems: workItems } }}
          />
        ) : (
          <SectionRenderer key={section.id ?? i} section={section} />
        )
      )}
      <Footer />
    </div>
  )
}
