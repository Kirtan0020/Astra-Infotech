import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Reveal from '../Reveal.jsx'
import TiltCard from '../TiltCard.jsx'
import { useTrackWheelScroll, makeTrackScroller } from '../../content/useTrackWheelScroll.js'

// `stacked` still picks which card design to use (Home's dark-overlay-caption
// style vs the standalone Work page's image-plus-content style) — but the
// horizontal snap-scroll behavior itself is md+ only now (plain grid below
// that), via responsive classes rather than a JS breakpoint check. Nesting a
// horizontal snap-scroll track inside a vertically-scrolling page fought
// touch scrolling on phones.
export default function WorkSection({ data = {}, items = [], stacked = false }) {
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
                  aria-label="Scroll work left"
                >
                  <HiChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => scroll(1)}
                  className="hidden rounded-full border border-[var(--color-text)]/10 p-3 text-[var(--color-text)]/70 transition-colors hover:bg-[var(--color-text)]/5 hover:text-[var(--color-text)] md:block"
                  aria-label="Scroll work right"
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
          {items.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 0.08}
              className="md:w-[65%] md:shrink-0 md:snap-start lg:w-[calc((100%-40px)/3)]"
            >
              <TiltCard>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block h-full overflow-hidden rounded-3xl border border-[var(--color-text)]/10"
                >
                  <div className="h-full min-h-[220px] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 rounded-b-3xl bg-black/60 !p-7 backdrop-blur-sm">
                    <p className="font-display text-lg text-white">{project.title}</p>
                    <p className="text-sm text-white/60">{project.category}</p>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08} className="h-full">
              <TiltCard>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-text)]/10"
                >
                  <div className="min-h-[200px] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-[200px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div
                    className="flex flex-1 flex-col p-7"
                    style={{
                      background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg-soft) 100%)',
                    }}
                  >
                    <p className="text-sm text-[var(--color-text)]/50">{project.category}</p>
                    <h2 className="mt-2 font-display text-xl text-[var(--color-text)]">{project.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text)]/60">{project.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {(project.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--color-text)]/10 px-3 py-1 text-xs text-[var(--color-text)]/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
