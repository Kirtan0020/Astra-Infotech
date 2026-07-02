import Reveal from '../Reveal.jsx'
import TestimonialCarousel from '../TestimonialCarousel.jsx'

export default function TestimonialsSection({ data = {}, items = [] }) {
  if (items.length === 0) return null
  return (
    <div className="container-px">
      <Reveal className="text-center">
        {data.eyebrow && <span className="section-eyebrow">{data.eyebrow}</span>}
        <h2 className="mx-auto max-w-xl font-display text-3xl text-[var(--color-text)] md:text-5xl">
          {data.heading}
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-6 md:mt-14">
        <TestimonialCarousel items={items} />
      </Reveal>
    </div>
  )
}
