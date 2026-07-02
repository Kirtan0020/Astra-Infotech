import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Seo from '../components/Seo.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import TechMarquee from '../components/TechMarquee.jsx'
import StackedSectionList from '../components/StackedSectionList.jsx'
import SectionRenderer from '../content/SectionRenderer.jsx'
import { useContent } from '../content/ContentProvider.jsx'

export default function Home() {
  const { pages, settings } = useContent()
  const page = pages.home

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.site_name,
    url: settings.site_url,
    logo: `${settings.site_url}${settings.logo_path}`,
    email: settings.email,
    sameAs: [],
  }

  // Hero and stats keep their non-sticky top-of-page treatment; every other
  // section (in whatever order/selection the admin has set) gets the sticky
  // "stacked cards" scroll effect via StackedSectionList.
  const heroSection = page.sections.find((s) => s.type === 'hero')
  const statsSection = page.sections.find((s) => s.type === 'stats')
  const stackedSections = page.sections.filter((s) => s.type !== 'hero' && s.type !== 'stats')

  return (
    <div id="top" className="relative min-h-screen bg-[var(--color-bg)]">
      <Seo {...page.meta} jsonLd={orgJsonLd} />
      <ScrollProgress />
      <Navbar />
      {heroSection && <SectionRenderer section={heroSection} />}
      <TechMarquee />
      {statsSection && <SectionRenderer section={statsSection} />}
      <StackedSectionList sections={stackedSections} />
      <Footer />
    </div>
  )
}
