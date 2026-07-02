import { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Seo from '../components/Seo.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import SectionRenderer from '../content/SectionRenderer.jsx'
import { useContent } from '../content/ContentProvider.jsx'

export default function About() {
  const { pages } = useContent()
  const page = pages.about
  const member = page.sections.find((s) => s.type === 'team')?.items?.[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div id="top" className="relative min-h-screen bg-[var(--color-bg)]">
      <Seo {...page.meta} />
      <ScrollProgress />
      <Navbar />
      {page.sections
        // The CEO bio renders inside the hero's visual column (style='team'
        // below), not as its own block — skip the standalone 'team' section
        // here so it isn't shown twice.
        .filter((s) => s.type !== 'team')
        .map((section, i) =>
          section.type === 'hero' ? (
            <SectionRenderer
              key={section.id ?? i}
              section={{ ...section, data: { ...section.data, style: 'team', member } }}
            />
          ) : (
            <SectionRenderer key={section.id ?? i} section={section} />
          )
        )}
      <Footer />
    </div>
  )
}
