import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineArrowRight, HiChevronLeft, HiChevronRight, HiOutlineCheck } from 'react-icons/hi'
import Reveal from '../Reveal.jsx'
import TiltCard from '../TiltCard.jsx'
import { getIcon } from '../../content/iconRegistry.js'
import { useTrackWheelScroll, makeTrackScroller } from '../../content/useTrackWheelScroll.js'

// `stacked` (true on Home's sticky layout) uses the pulsing icon-badge +
// watermark card treatment; other pages render a plain static grid with the
// full feature list and tags. The stacked cards' horizontal snap-scroll is
// md+ only (plain grid below that) — nesting a horizontal snap-scroll track
// inside a vertically-scrolling page fought touch scrolling on phones.
export default function ServicesSection({ data = {}, items = [], stacked = false }) {
  const trackRef = useRef(null)
  const scroll = makeTrackScroller(trackRef)
  useTrackWheelScroll(trackRef, scroll)

  return (
    <div className="container-px">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          {data.eyebrow && <span className="section-eyebrow">{data.eyebrow}</span>}
          <h2 className="max-w-xl font-display text-3xl text-[var(--color-text)] md:text-5xl">{data.heading}</h2>
        </div>
        {data.viewAllHref && (
          <div className="flex items-center gap-3">
            <Link to={data.viewAllHref} className="btn-ghost">
              {data.viewAllLabel} <HiOutlineArrowRight />
            </Link>
            {stacked && (
              <>
                <button
                  type="button"
                  onClick={() => scroll(-1)}
                  className="hidden rounded-full border border-[var(--color-text)]/10 p-3 text-[var(--color-text)]/70 transition-colors hover:bg-[var(--color-text)]/5 hover:text-[var(--color-text)] md:block"
                  aria-label="Scroll services left"
                >
                  <HiChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => scroll(1)}
                  className="hidden rounded-full border border-[var(--color-text)]/10 p-3 text-[var(--color-text)]/70 transition-colors hover:bg-[var(--color-text)]/5 hover:text-[var(--color-text)] md:block"
                  aria-label="Scroll services right"
                >
                  <HiChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        )}
      </Reveal>

      {stacked ? (
        <div
          ref={trackRef}
          className="no-scrollbar mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 md:mt-14 md:flex md:snap-x md:snap-mandatory md:gap-5 md:overflow-x-auto md:scroll-smooth md:pb-4"
        >
          {items.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <Reveal
                key={service.title}
                delay={i * 0.08}
                className="md:w-[85%] md:shrink-0 md:snap-start lg:w-[calc((100%-20px)/2)]"
              >
                <TiltCard>
                  <div className="surface-card relative h-full !p-9 transition-colors group-hover:border-violet-500/40">
                    <Icon
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-4 -top-4 select-none text-[7rem] text-[var(--color-text)]/5"
                    />
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="brand-gradient-bg relative flex h-11 w-11 items-center justify-center rounded-xl"
                    >
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-xl bg-primary"
                        animate={{ opacity: [0.55, 0, 0.55], scale: [1, 1.7, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                      />
                      <Icon size={20} className="relative text-[var(--color-text)]" />
                    </motion.div>
                    <h3 className="relative mt-5 font-display text-lg text-[var(--color-text)]">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)]/60">{service.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(service.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--color-text)]/10 px-3 py-1 text-xs text-[var(--color-text)]/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      ) : (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <Reveal key={service.title} delay={i * 0.08} className="h-full">
                <TiltCard>
                  <div className="surface-card relative h-full !p-8 transition-colors group-hover:border-violet-500/40">
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="brand-gradient-bg flex h-12 w-12 items-center justify-center rounded-xl"
                    >
                      <Icon size={22} className="text-[var(--color-text)]" />
                    </motion.div>

                    <h2 className="mt-6 font-display text-2xl text-[var(--color-text)]">{service.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)]/60">{service.desc}</p>

                    <ul className="mt-6 space-y-2.5">
                      {(service.features ?? []).map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--color-text)]/70">
                          <HiOutlineCheck className="mt-0.5 shrink-0 text-violet-400" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {(service.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--color-text)]/10 px-3 py-1 text-xs text-[var(--color-text)]/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      )}
    </div>
  )
}
