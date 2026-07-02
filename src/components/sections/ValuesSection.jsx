import Reveal from '../Reveal.jsx'
import TiltCard from '../TiltCard.jsx'

export default function ValuesSection({ data = {}, items = [] }) {
  return (
    <div className="container-px">
      <Reveal>
        {data.eyebrow && <span className="section-eyebrow">{data.eyebrow}</span>}
        <h2 className="max-w-xl font-display text-3xl text-[var(--color-text)] md:text-5xl">{data.heading}</h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {items.map((value, i) => (
          <Reveal key={value.title} delay={i * 0.08} className="h-full">
            <TiltCard>
              <div className="surface-card relative h-full !p-8 transition-colors group-hover:border-violet-500/40">
                <h3 className="font-display text-xl text-[var(--color-text)]">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)]/60">{value.desc}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
