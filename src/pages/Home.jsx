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

  const sameAs = [
    settings.social_twitter,
    settings.social_linkedin,
    settings.social_instagram,
    settings.social_facebook,
    settings.social_github,
  ].filter(Boolean)

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: settings.site_name,
    url: settings.site_url,
    logo: `${settings.site_url}${settings.logo_path}`,
    image: `${settings.site_url}${settings.logo_path}`,
    email: settings.email,
    telephone: settings.phone,
    areaServed: 'Worldwide',
    description:
      'Astra Infotech is a design & development studio offering web development, app development, UI/UX design, and branding.',
    sameAs,
  }

  // Hero and stats keep their non-sticky top-of-page treatment; every other
  // section (in whatever order/selection the admin has set) gets the sticky
  // "stacked cards" scroll effect via StackedSectionList.
  const heroSection = page.sections.find((s) => s.type === 'hero')
  const statsSection = page.sections.find((s) => s.type === 'stats')
  const faqSection = page.sections.find((s) => s.type === 'faq')
  const stackedSections = page.sections.filter((s) => s.type !== 'hero' && s.type !== 'stats')

  // FAQPage structured data — this is what AI answer engines (Google AI
  // Overviews, ChatGPT/Perplexity search, etc.) and classic featured
  // snippets lift Q&A pairs from directly.
  const faqJsonLd =
    faqSection && faqSection.items.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqSection.items.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        }
      : null

  return (
    <div id="top" className="relative min-h-screen bg-[var(--color-bg)]">
      <Seo {...page.meta} jsonLd={faqJsonLd ? [orgJsonLd, faqJsonLd] : orgJsonLd} />
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
