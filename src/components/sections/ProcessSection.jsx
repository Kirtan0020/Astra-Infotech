import { motion } from 'framer-motion'
import Reveal from '../Reveal.jsx'
import TiltCard from '../TiltCard.jsx'
import { getIcon } from '../../content/iconRegistry.js'

export default function ProcessSection({ data = {}, items = [] }) {
  return (
    <div className="container-px">
      <Reveal>
        {data.eyebrow && <span className="section-eyebrow">{data.eyebrow}</span>}
        <h2 className="max-w-xl font-display text-3xl text-[var(--color-text)] md:text-5xl">{data.heading}</h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = getIcon(item.icon)
          return (
            <Reveal key={item.step} delay={i * 0.08}>
              <TiltCard>
                <div className="relative h-full rounded-3xl border border-[var(--color-text)]/10 bg-[var(--color-bg)] !p-9">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-8xl font-light text-[var(--color-text)]/5"
                  >
                    {item.step}
                  </span>
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="brand-gradient-bg relative flex h-12 w-12 items-center justify-center rounded-xl"
                    >
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-xl bg-primary"
                        animate={{ opacity: [0.55, 0, 0.55], scale: [1, 1.7, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                      />
                      <Icon size={22} className="relative text-white" />
                    </motion.div>
                    <span className="brand-gradient-text mt-5 block font-display text-2xl">{item.step}</span>
                    <h3 className="mt-2 font-display text-lg text-[var(--color-text)]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)]/60">{item.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
