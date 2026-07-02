export default function GradientAura({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2">
        <div
          className="aura-blob-1 h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.32) 0%, rgba(37,99,235,0.12) 45%, transparent 72%)' }}
        />
      </div>
      <div className="absolute right-[5%] top-[20%] h-[420px] w-[420px]">
        <div
          className="aura-blob-2 h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.28) 0%, rgba(124,58,237,0.1) 45%, transparent 72%)', animationDelay: '1s' }}
        />
      </div>
      <div className="absolute left-[5%] top-[40%] h-[360px] w-[360px]">
        <div
          className="aura-blob-3 h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,70,239,0.14) 0%, rgba(217,70,239,0.05) 45%, transparent 70%)', animationDelay: '0.5s' }}
        />
      </div>
    </div>
  )
}
