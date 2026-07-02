import Reveal from '../Reveal.jsx'
import StatCounter from '../StatCounter.jsx'

export default function StatsSection({ data = {}, items = [] }) {
  if (items.length === 0) return null
  return (
    <section
      className={`bg-[var(--color-text)]/[0.02] py-14 ${data.bordered ? 'border-y border-[var(--color-text)]/10' : ''}`}
    >
      <div className="container-px grid grid-cols-2 gap-8 md:grid-cols-4">
        {items.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <StatCounter {...stat} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
