import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(springY, [0, 1], [7, -7])
  const rotateY = useTransform(springX, [0, 1], [-7, 7])
  const glowX = useTransform(x, [0, 1], ['0%', '100%'])
  const glowY = useTransform(y, [0, 1], ['0%', '100%'])
  const glowBackground = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, rgba(139,92,246,0.35), transparent 70%)`

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`group relative h-full overflow-hidden rounded-3xl ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: glowBackground }}
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  )
}
