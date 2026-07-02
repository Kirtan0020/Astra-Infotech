const defaultParticles = [
  { top: '15%', left: '8%', size: 6, duration: 5, delay: 0 },
  { top: '65%', left: '4%', size: 4, duration: 6, delay: 0.6 },
  { top: '30%', left: '92%', size: 5, duration: 7, delay: 1.1 },
  { top: '78%', left: '88%', size: 7, duration: 5.5, delay: 0.3 },
  { top: '45%', left: '96%', size: 3, duration: 6.5, delay: 1.6 },
  { top: '10%', left: '55%', size: 4, duration: 8, delay: 0.9 },
]

export default function FloatingParticles({ color = 'bg-violet-400/40', particles = defaultParticles }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      {particles.map((p, i) => (
        <span
          key={i}
          className={`particle-float absolute rounded-full ${color}`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
