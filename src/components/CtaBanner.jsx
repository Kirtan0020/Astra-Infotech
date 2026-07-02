import { motion } from 'framer-motion'
import { HiOutlineArrowRight } from 'react-icons/hi'
import Reveal from './Reveal.jsx'
import FloatingParticles from './FloatingParticles.jsx'
import { useContent } from '../content/ContentProvider.jsx'

export default function CtaBanner({ heading, subtext, buttonLabel, buttonHref }) {
  const { settings } = useContent()
  const resolvedHeading = heading ?? "Let's build something great together"
  const resolvedSubtext =
    subtext ?? "Tell us about your project — we'll reply with next steps within one business day."
  const resolvedLabel = buttonLabel ?? 'Get in touch'
  const resolvedHref = buttonHref ?? `mailto:${settings.email}`

  return (
    <section className="container-px pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-16 text-center md:px-16">
          <motion.div
            className="brand-gradient-bg absolute inset-0 opacity-90"
            style={{ backgroundSize: '200% 200%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
          <FloatingParticles color="bg-white/50" />
          <div className="relative">
            <h2 className="font-display text-3xl text-white md:text-5xl">{resolvedHeading}</h2>
            <p className="mx-auto mt-4 max-w-md text-white/80">{resolvedSubtext}</p>
            <a
              href={resolvedHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            >
              {resolvedLabel} <HiOutlineArrowRight />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
