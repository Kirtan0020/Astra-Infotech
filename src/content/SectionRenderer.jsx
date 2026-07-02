import HeroSection from '../components/sections/HeroSection.jsx'
import StatsSection from '../components/sections/StatsSection.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import WorkSection from '../components/sections/WorkSection.jsx'
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx'
import FaqSection from '../components/sections/FaqSection.jsx'
import ValuesSection from '../components/sections/ValuesSection.jsx'
import ClientsSection from '../components/sections/ClientsSection.jsx'
import CtaSection from '../components/sections/CtaSection.jsx'
import TeamSection from '../components/sections/TeamSection.jsx'
import RichTextSection from '../components/sections/RichTextSection.jsx'

// Types whose component returns bare content (no <section> wrapper of its
// own) because their wrapper differs between normal in-flow pages and Home's
// sticky-stack layout — SectionRenderer supplies a plain wrapper here; the
// stacked layout supplies its own sticky one instead (see StackedSectionList).
const NEEDS_WRAPPER = new Set(['services', 'process', 'work', 'testimonials', 'faq', 'values'])

const COMPONENTS = {
  hero: HeroSection,
  stats: StatsSection,
  services: ServicesSection,
  process: ProcessSection,
  work: WorkSection,
  testimonials: TestimonialsSection,
  faq: FaqSection,
  values: ValuesSection,
  clients: ClientsSection,
  cta: CtaSection,
  team: TeamSection,
  richtext: RichTextSection,
}

export const SECTION_TYPES = Object.keys(COMPONENTS)

// Matches each type's original per-page spacing (Services/Work grids used
// pb-28; About's values grid used pb-28 pt-24; Career's used pb-16 — kept via
// `data.compact`, set in the seed, rather than homogenized into one value).
function wrapperClassName(section) {
  if (section.type === 'values') {
    return section.data.compact ? 'relative pb-16' : 'relative pb-28 pt-24'
  }
  return 'relative pb-28'
}

export default function SectionRenderer({ section, stacked = false }) {
  const Component = COMPONENTS[section.type]
  if (!Component) return null

  const el = <Component data={section.data} items={section.items} stacked={stacked} />

  // When `stacked`, the caller (StackedSectionList) already supplies the
  // sticky <section> wrapper — adding another one here would nest two.
  if (!stacked && NEEDS_WRAPPER.has(section.type)) {
    return <section className={wrapperClassName(section)}>{el}</section>
  }
  return el
}
