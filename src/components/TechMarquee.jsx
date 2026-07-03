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

// Crossed ribbons on both breakpoints, but mobile uses a steeper rotation
// and thinner bars — at the desktop angle/thickness, the narrow mobile
// width made the two bands overlap across nearly the whole ribbon instead
// of a small crossing near the center. `--ribbon-rotate` is set per
// breakpoint via CSS (see .marquee-ribbon in index.css).
export default function TechMarquee() {
  return (
    <div className="relative h-80 overflow-hidden bg-[var(--color-bg)] md:h-72">
      <MarqueeRibbon rotate={26} rotateMd={-6} tint="from-blue-500/15 via-blue-500/5" />
      <MarqueeRibbon rotate={-26} rotateMd={6} reverse tint="from-violet-500/15 via-violet-500/5" />
    </div>
  )
}

function MarqueeRibbon({ rotate, rotateMd, reverse = false, tint }) {
  return (
    <div
      aria-hidden={false}
      className="marquee-ribbon absolute left-[-10%] right-[-10%] top-1/2"
      style={{ '--ribbon-rotate': `${rotate}deg`, '--ribbon-rotate-md': `${rotateMd}deg` }}
    >
      <div
        className={`overflow-hidden bg-gradient-to-r ${tint} to-transparent bg-[var(--color-text)]/[0.03] py-5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-sm md:py-6`}
      >
        <div
          className={`pause-on-hover flex w-max gap-8 md:gap-16 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 whitespace-nowrap text-[var(--color-text)]/50 transition-colors hover:text-[var(--color-text)] md:gap-3"
            >
              <item.icon className="h-6 w-6 md:h-7 md:w-7" />
              <span className="text-base font-medium md:text-lg">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
