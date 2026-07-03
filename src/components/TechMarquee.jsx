import {
  SiReact,
  SiNextdotjs,
  SiWordpress,
  SiShopify,
  SiFlutter,
  SiNodedotjs,
  SiTailwindcss,
  SiFigma,
} from 'react-icons/si'

const stack = [
  { icon: SiReact, label: 'React' },
  { icon: SiNextdotjs, label: 'Next.js' },
  { icon: SiWordpress, label: 'WordPress' },
  { icon: SiShopify, label: 'Shopify' },
  { icon: SiFlutter, label: 'Flutter' },
  { icon: SiNodedotjs, label: 'Node.js' },
  { icon: SiTailwindcss, label: 'Tailwind CSS' },
  { icon: SiFigma, label: 'Figma' },
]

const items = [...stack, ...stack]

// The rotated, crossed-ribbon effect only reads cleanly with the extra
// vertical room desktop viewports have — on narrow mobile widths the two
// bands overlapped into a cramped, hard-to-read mess. Mobile gets two
// plain, non-overlapping horizontal rows instead; desktop keeps the
// original crossed ribbons untouched.
export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden bg-[var(--color-bg)]">
      <div className="flex flex-col gap-3 py-8 md:hidden">
        <MarqueeRow reverse={false} tint="from-blue-500/15 via-blue-500/5" />
        <MarqueeRow reverse tint="from-violet-500/15 via-violet-500/5" />
      </div>

      <div className="relative hidden md:block md:h-72">
        <MarqueeRibbon rotate={-6} tint="from-blue-500/15 via-blue-500/5" />
        <MarqueeRibbon rotate={6} reverse tint="from-violet-500/15 via-violet-500/5" />
      </div>
    </div>
  )
}

function MarqueeRow({ reverse = false, tint }) {
  return (
    <div
      className={`overflow-hidden bg-gradient-to-r ${tint} to-transparent bg-[var(--color-text)]/[0.03] py-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-sm`}
    >
      <div
        className={`pause-on-hover flex w-max gap-10 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 whitespace-nowrap text-[var(--color-text)]/50 transition-colors hover:text-[var(--color-text)]"
          >
            <item.icon size={22} />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MarqueeRibbon({ rotate, reverse = false, tint }) {
  return (
    <div
      aria-hidden={false}
      className="absolute left-[-10%] right-[-10%] top-1/2"
      style={{ transform: `translateY(-50%) rotate(${rotate}deg)` }}
    >
      <div
        className={`overflow-hidden bg-gradient-to-r ${tint} to-transparent bg-[var(--color-text)]/[0.03] py-5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-sm md:py-6`}
      >
        <div
          className={`pause-on-hover flex w-max gap-16 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 whitespace-nowrap text-[var(--color-text)]/50 transition-colors hover:text-[var(--color-text)]"
            >
              <item.icon size={28} />
              <span className="text-base font-medium md:text-lg">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
