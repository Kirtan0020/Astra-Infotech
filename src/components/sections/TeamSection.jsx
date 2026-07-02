import Reveal from '../Reveal.jsx'
import GradientBlob from '../GradientBlob.jsx'

export default function TeamSection({ data = {}, items = [] }) {
  if (items.length === 0) return null

  return (
    <section className="relative pb-24 pt-16">
      <div className="container-px">
        {(data.eyebrow || data.heading) && (
          <Reveal>
            {data.eyebrow && <span className="section-eyebrow">{data.eyebrow}</span>}
            {data.heading && (
              <h2 className="max-w-xl font-display text-3xl text-[var(--color-text)] md:text-5xl">{data.heading}</h2>
            )}
          </Reveal>
        )}

        <div
          className={`mt-4 grid gap-10 ${
            items.length === 1 ? 'mx-auto max-w-xs justify-items-center' : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {items.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="relative mx-auto flex h-[280px] w-[240px] items-center justify-center">
                <div aria-hidden="true" className="absolute inset-0 z-0 opacity-70 blur-2xl">
                  <GradientBlob />
                </div>
                <div className="blob-drift relative z-10 h-full w-full">
                  <div className="blob-morph h-full w-full overflow-hidden shadow-[0_40px_90px_-20px_rgba(108,99,255,0.45)]">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-display text-lg text-[var(--color-text)]">{member.name}</p>
                <p className="text-sm text-[var(--color-text)]/50">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
