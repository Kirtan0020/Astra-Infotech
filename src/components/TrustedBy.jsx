import Reveal from './Reveal.jsx'

export default function TrustedBy({ delay = 0, className = '', clients }) {
  if (!clients || clients.length === 0) return null
  return (
    <Reveal delay={delay} className={className}>
      <p className="text-center text-xs uppercase tracking-widest text-[var(--color-text)]/40">Trusted by</p>
      <div className="mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-2.5 md:mt-6 md:gap-4">
        {clients.map((client) => (
          <a
            key={client.name}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            title={client.name}
            className="flex h-10 items-center rounded-xl bg-white/95 px-3 shadow-sm transition-transform hover:scale-105 md:h-14 md:px-4"
          >
            <img
              src={client.logo}
              alt={client.name}
              loading="lazy"
              className="h-5 w-auto object-contain md:h-8"
            />
          </a>
        ))}
      </div>
    </Reveal>
  )
}
