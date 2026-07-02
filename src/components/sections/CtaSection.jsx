import { HiOutlineArrowRight } from 'react-icons/hi'
import Reveal from '../Reveal.jsx'
import CtaBanner from '../CtaBanner.jsx'

export default function CtaSection({ data = {} }) {
  if (data.variant === 'card') {
    return (
      <section className="pb-24">
        <div className="container-px">
          <Reveal>
            <div className="surface-card relative overflow-hidden !p-10 text-center md:!p-16">
              {data.eyebrow && <span className="section-eyebrow">{data.eyebrow}</span>}
              <h2 className="mx-auto max-w-xl font-display text-2xl text-[var(--color-text)] md:text-4xl">
                {data.heading}
              </h2>
              {data.subtext && (
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[var(--color-text)]/60 md:text-base">
                  {data.subtext}
                </p>
              )}
              {data.buttonLabel && (
                <a href={data.buttonHref} className="btn-primary mt-8 inline-flex">
                  {data.buttonLabel} <HiOutlineArrowRight />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  return <CtaBanner {...data} />
}
