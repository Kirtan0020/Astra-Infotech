import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

export default function TestimonialCarousel({ items: testimonials }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  const go = (dir) => {
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (paused || testimonials.length === 0) return
    timerRef.current = setInterval(() => go(1), 5000)
    return () => clearInterval(timerRef.current)
  }, [paused, index, testimonials.length])

  if (testimonials.length === 0) return null

  const current = testimonials[index]

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="surface-card relative mx-auto max-w-2xl overflow-hidden !p-5 text-center md:!p-7"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-display text-lg leading-relaxed text-[var(--color-text)]/90 md:text-xl">
            &ldquo;{current.quote}&rdquo;
          </p>
          <div className="mt-3 md:mt-5">
            <p className="text-sm font-medium text-[var(--color-text)]">{current.name}</p>
            <p className="text-sm text-[var(--color-text)]/50">{current.role}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 flex items-center justify-center gap-3 md:mt-8">
        <button
          type="button"
          onClick={() => go(-1)}
          className="rounded-full border border-[var(--color-text)]/10 p-2 text-[var(--color-text)]/70 transition-colors hover:bg-[var(--color-text)]/5 hover:text-[var(--color-text)]"
          aria-label="Previous testimonial"
        >
          <HiChevronLeft size={18} />
        </button>
        <div className="flex gap-1.5">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-violet-500' : 'w-1.5 bg-[var(--color-text)]/20'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          className="rounded-full border border-[var(--color-text)]/10 p-2 text-[var(--color-text)]/70 transition-colors hover:bg-[var(--color-text)]/5 hover:text-[var(--color-text)]"
          aria-label="Next testimonial"
        >
          <HiChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
