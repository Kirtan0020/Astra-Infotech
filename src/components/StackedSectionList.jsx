import GradientAura from './GradientAura.jsx'
import FloatingParticles from './FloatingParticles.jsx'
import SectionRenderer from '../content/SectionRenderer.jsx'

const PARTICLE_COLORS = [undefined, 'bg-blue-400/40', 'bg-fuchsia-400/40', 'bg-violet-400/40', 'bg-blue-400/40', undefined]

// Anchor ids that Navbar/Footer links (`#services`, `#work`, etc.) target.
const ANCHOR_IDS = new Set(['services', 'process', 'work', 'testimonials', 'faq'])

// Home's sticky-scroll "stacked cards" treatment, generalized to whatever
// sections the page currently has (after hero/stats) so they stay
// add/reorder/remove-able from the admin instead of being 6 hardcoded
// functions pinned to fixed offsets.
export default function StackedSectionList({ sections }) {
  return (
    <div className="relative">
      {sections.map((section, i) => (
        <section
          key={section.id ?? i}
          id={ANCHOR_IDS.has(section.type) ? section.type : undefined}
          style={{ '--stack-top': `${i * 22}px`, '--stack-z': 10 + i * 10 }}
          className={`stack-section flex min-h-0 flex-col justify-center overflow-hidden rounded-t-[40px] border-t border-[var(--color-text)]/10 py-16 shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.6)] md:min-h-[92vh] md:py-28 ${
            i % 2 === 0 ? 'bg-[var(--color-bg-soft)]' : 'bg-[var(--color-bg-alt)]'
          } ${section.type === 'testimonials' ? '!py-14 md:!py-28' : ''}`}
        >
          {section.type !== 'cta' && (
            <>
              <GradientAura className="opacity-60" />
              <FloatingParticles color={PARTICLE_COLORS[i % PARTICLE_COLORS.length]} />
            </>
          )}
          <SectionRenderer section={section} stacked />
        </section>
      ))}
    </div>
  )
}
