import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineChevronDown } from 'react-icons/hi'
import Reveal from '../Reveal.jsx'

export default function FaqSection({ data = {}, items = [] }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="container-px grid gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
      <Reveal>
        {data.eyebrow && <span className="section-eyebrow">{data.eyebrow}</span>}
        <h2 className="max-w-sm font-display text-3xl text-[var(--color-text)] md:text-4xl">{data.heading}</h2>
        {data.subtext && (
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-text)]/60">{data.subtext}</p>
        )}
      </Reveal>

      <div className="space-y-3">
        {items.map((faq, i) => (
          <Reveal key={faq.q} delay={i * 0.05}>
            <div className="overflow-hidden rounded-2xl border border-[var(--color-text)]/10">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium text-[var(--color-text)]">{faq.q}</span>
                <HiOutlineChevronDown
                  className={`shrink-0 text-[var(--color-text)]/50 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <motion.div initial={false} animate={{ height: openIndex === i ? 'auto' : 0 }} className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--color-text)]/60">{faq.a}</p>
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
