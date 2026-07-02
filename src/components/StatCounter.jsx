import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'

export default function StatCounter({ value, suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)
  const motionValue = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, motionValue])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl text-[var(--color-text)] md:text-5xl">
        {display}
        <span className="brand-gradient-text">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-[var(--color-text)]/60">{label}</p>
    </div>
  )
}
