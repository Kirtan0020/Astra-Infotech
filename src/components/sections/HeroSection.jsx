import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { HiOutlineArrowRight, HiOutlineChevronDown } from 'react-icons/hi'
import Reveal from '../Reveal.jsx'
import GradientAura from '../GradientAura.jsx'
import FloatingParticles from '../FloatingParticles.jsx'
import GradientBlob from '../GradientBlob.jsx'
import GradientButton from '../GradientButton.jsx'
import HighlightText from '../HighlightText.jsx'
import { useContent } from '../../content/ContentProvider.jsx'

// Consolidates the 6 near-identical per-page hero patterns into one
// data-driven component. `data.style` picks the right-side visual:
//   'orbit' — Home's interactive mouse-parallax logo/orbit disc
//   'blob'  — the drifting gradient blob used on Services/Career/Contact
//   'stack' — Work's tilted 3-image preview stack (needs `data.previewItems`)
//   'team'  — About's CEO photo-in-blob + name/role (needs `data.member`)
//   'none'  — centered, no side visual (Team's "coming soon")
export default function HeroSection({ data = {} }) {
  const style = data.style ?? 'blob'
  const particleColor = data.particleColor
  const tall = data.tall ?? style === 'orbit'

  // Mouse-parallax for the 'orbit' visual — owned by the whole hero section
  // (not just the small disc) so moving anywhere in the hero drives it,
  // matching Home's original behavior. Hooks run unconditionally; only wired
  // up when style === 'orbit'.
  const mvX = useMotionValue(0.5)
  const mvY = useMotionValue(0.5)
  const springX = useSpring(mvX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mvY, { stiffness: 60, damping: 20 })
  const orbitTransforms = {
    translateX: useTransform(springX, [0, 1], [-18, 18]),
    translateY: useTransform(springY, [0, 1], [-18, 18]),
    rotateX: useTransform(springY, [0, 1], [10, -10]),
    rotateY: useTransform(springX, [0, 1], [-10, 10]),
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mvX.set((e.clientX - rect.left) / rect.width)
    mvY.set((e.clientY - rect.top) / rect.height)
  }
  const handleMouseLeave = () => {
    mvX.set(0.5)
    mvY.set(0.5)
  }

  const content = (
    <div>
      {data.badgeLabel ? (
        <Reveal>
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {data.badgeLabel}
          </span>
        </Reveal>
      ) : (
        <Reveal>
          <span className="section-eyebrow">{data.eyebrow}</span>
        </Reveal>
      )}

      <Reveal delay={0.05}>
        <h1
          className={`font-display text-[var(--color-text)] ${
            tall
              ? 'mt-6 text-5xl leading-[1.05] md:text-7xl'
              : style === 'none'
                ? 'mt-2 text-4xl leading-[1.1] md:text-6xl'
                : 'max-w-2xl text-4xl leading-[1.1] md:text-6xl'
          }`}
        >
          <HighlightText text={data.heading} />
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p
          className={`mt-6 text-base leading-relaxed text-[var(--color-text)]/60 md:text-lg ${
            style === 'none' ? 'mx-auto max-w-lg' : tall ? 'max-w-lg' : 'max-w-xl'
          }`}
        >
          {data.subtext}
        </p>
      </Reveal>

      {style === 'none' ? (
        data.primaryCtaLabel && (
          <Reveal delay={0.15}>
            <GradientButton href={data.primaryCtaHref} className="mt-8 inline-flex">
              {data.primaryCtaLabel} <HiOutlineArrowRight />
            </GradientButton>
          </Reveal>
        )
      ) : (
        (data.primaryCtaLabel || data.secondaryCtaLabel) && (
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {data.primaryCtaLabel && (
                <GradientButton href={data.primaryCtaHref}>
                  {data.primaryCtaLabel} <HiOutlineArrowRight />
                </GradientButton>
              )}
              {data.secondaryCtaLabel && (
                <a href={data.secondaryCtaHref} className="btn-ghost">
                  {data.secondaryCtaLabel}
                </a>
              )}
            </div>
          </Reveal>
        )
      )}
    </div>
  )

  if (style === 'none') {
    return (
      <section className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
        <GradientAura className="opacity-60" />
        <FloatingParticles color={particleColor} />
        <div className="container-px relative z-10 mx-auto max-w-2xl text-center">{content}</div>
      </section>
    )
  }

  return (
    <section
      onMouseMove={style === 'orbit' ? handleMouseMove : undefined}
      onMouseLeave={style === 'orbit' ? handleMouseLeave : undefined}
      className={
        tall
          ? 'relative flex min-h-[100svh] items-center overflow-hidden pt-28'
          : 'relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48'
      }
    >
      <GradientAura className={tall || data.fullAura ? '' : 'opacity-60'} />
      <FloatingParticles color={particleColor} />
      <div
        className={`container-px relative z-10 grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] ${
          tall ? 'pb-20 md:pb-0' : ''
        }`}
      >
        {content}
        <Reveal delay={0.2} className={`relative mx-auto ${style === 'team' ? '' : 'hidden md:block'}`}>
          {style === 'orbit' ? (
            <OrbitVisual {...orbitTransforms} />
          ) : style === 'stack' ? (
            <WorkPreviewStack items={data.previewItems ?? []} />
          ) : style === 'team' ? (
            <TeamVisual member={data.member} />
          ) : (
            <GradientBlob />
          )}
        </Reveal>
      </div>
      {tall && (
        <a
          href="#services"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-text)]/40 md:flex"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <HiOutlineChevronDown className="animate-bounce" />
        </a>
      )}
    </section>
  )
}

function OrbitVisual({ translateX, translateY, rotateX, rotateY }) {
  const { settings } = useContent()

  return (
    <motion.div
      style={{ x: translateX, y: translateY, rotateX, rotateY, transformPerspective: 800 }}
      className="relative mx-auto flex h-[420px] w-[420px] items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-[var(--color-text)]/10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-10 rounded-full border border-[var(--color-text)]/10"
      />

      <OrbitDot size={420} duration={16} color="bg-blue-400" dotSize={11} glow="rgba(79,110,247,0.9)" />
      <OrbitDot size={340} duration={11} reverse color="bg-violet-400" dotSize={9} glow="rgba(139,92,246,0.9)" />
      <OrbitDot size={260} duration={8} color="bg-fuchsia-300" dotSize={7} glow="rgba(214,178,255,0.9)" delay={0.4} />

      <motion.img
        src={settings.logo_path}
        alt={settings.site_name}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-56 w-56 drop-shadow-[0_30px_60px_rgba(108,99,255,0.5)]"
      />
    </motion.div>
  )
}

function OrbitDot({ size, duration, reverse = false, color, dotSize, glow, delay = 0 }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2"
      style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <span
        className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${color}`}
        style={{ width: dotSize, height: dotSize, boxShadow: `0 0 12px 2px ${glow}` }}
      />
    </motion.div>
  )
}

function WorkPreviewStack({ items }) {
  const featured = items.slice(0, 3)
  const rotations = [-9, 4, -3]

  return (
    <div className="relative mx-auto h-[360px] w-[280px]">
      {featured.map((project, i) => (
        <motion.div
          key={project.title}
          className="absolute inset-x-0 top-0 h-[300px] overflow-hidden rounded-2xl border border-[var(--color-text)]/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
          style={{ zIndex: i, transformOrigin: 'bottom center' }}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: i * 20, rotate: rotations[i] }}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: i * 20 - 8, rotate: 0, zIndex: 10 }}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        </motion.div>
      ))}
    </div>
  )
}

function TeamVisual({ member }) {
  if (!member) return null
  return (
    <>
      <div className="relative mx-auto flex h-[360px] w-[300px] items-center justify-center md:h-[420px] md:w-[340px]">
        <div aria-hidden="true" className="absolute inset-0 z-0 opacity-70 blur-2xl">
          <GradientBlob />
        </div>
        <div className="blob-drift relative z-10 h-full w-full">
          <div className="blob-morph h-full w-full overflow-hidden shadow-[0_40px_90px_-20px_rgba(108,99,255,0.45)]">
            <img src={member.photo} alt={member.name} className="h-full w-full object-cover object-top" />
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="font-display text-lg text-[var(--color-text)]">{member.name}</p>
        <p className="text-sm text-[var(--color-text)]/50">{member.role}</p>
      </div>
    </>
  )
}
