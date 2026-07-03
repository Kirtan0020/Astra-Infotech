import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi'
import FloatingParticles from './FloatingParticles.jsx'
import { useContent } from '../content/ContentProvider.jsx'

const socialIcons = [
  { Icon: FiTwitter, key: 'social_twitter' },
  { Icon: FiLinkedin, key: 'social_linkedin' },
  { Icon: FiInstagram, key: 'social_instagram' },
  { Icon: FiGithub, key: 'social_github' },
]

export default function Footer() {
  const { footerLinks: linkColumns, settings } = useContent()
  return (
    <footer id="footer" className="relative overflow-hidden border-t border-[var(--color-text)]/10 bg-[var(--color-bg)] pt-12">
      <FloatingParticles color="bg-violet-400/30" />
      <div className="container-px">
        <div className="grid gap-8 pb-10 text-center md:grid-cols-[1.4fr_1fr_1fr_1fr] md:text-left">
          <div>
            <div className="mb-6 flex items-center justify-center gap-2.5 md:justify-start">
              <img src={settings.logo_path} alt={settings.site_name} className="h-9 w-9" />
              <span className="font-display text-base text-[var(--color-text)]">{settings.site_name}</span>
            </div>

            <h3 className="font-display text-lg text-[var(--color-text)] md:text-xl">Location</h3>
            <p className="mt-2 text-sm text-[var(--color-text)]/60">{settings.location}</p>

            <h3 className="mt-6 font-display text-lg text-[var(--color-text)] md:text-xl">
              Drop Us A Line
            </h3>
            <a
              href={`mailto:${settings.email}`}
              className="mt-2 inline-block text-sm text-[var(--color-text)]/60 transition-colors hover:text-[var(--color-text)]"
            >
              {settings.email}
            </a>
            <a
              href={settings.phone_href}
              className="mt-1 block text-sm text-[var(--color-text)]/60 transition-colors hover:text-[var(--color-text)]"
            >
              {settings.phone}
            </a>

            <div className="mt-5 flex justify-center gap-3 md:justify-start">
              {socialIcons
                .filter(({ key }) => settings[key])
                .map(({ Icon, key }) => (
                  <a
                    key={key}
                    href={settings[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-text)]/10 text-[var(--color-text)]/70 transition-colors hover:bg-[var(--color-text)]/5 hover:text-[var(--color-text)]"
                    aria-label="Social link"
                  >
                    <Icon size={14} />
                  </a>
                ))}
            </div>
          </div>

          {/* Side-by-side on mobile (grid-cols-2); on md+ this wrapper
              collapses via `contents` so each column becomes its own cell
              in the outer 4-column grid, same as before. */}
          <div className="grid grid-cols-2 gap-6 md:contents">
            {linkColumns.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-lg text-[var(--color-text)] md:text-xl">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          className="text-sm text-[var(--color-text)]/60 underline-offset-4 transition-colors hover:text-[var(--color-text)] hover:underline"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-[var(--color-text)]/60 underline-offset-4 transition-colors hover:text-[var(--color-text)] hover:underline"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-display text-lg text-[var(--color-text)] md:text-xl">Get in Touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-text)]/60">
              <li>
                <a href={`mailto:${settings.email}`} className="transition-colors hover:text-[var(--color-text)]">
                  {settings.email}
                </a>
              </li>
              <li>
                <a href={settings.phone_href} className="transition-colors hover:text-[var(--color-text)]">
                  {settings.phone}
                </a>
              </li>
              <li>{settings.available_badge_label}</li>
            </ul>
            <a
              href={`mailto:${settings.email}`}
              className="btn-primary mt-4 !px-4 !py-2 text-xs"
            >
              Say hello
            </a>
          </div>
        </div>

        <FooterWatermark />

        <div className="border-t border-[var(--color-text)]/10 py-5 text-center text-sm text-[var(--color-text)]/40">
          <p>&copy; {new Date().getFullYear()} {settings.footer_copyright}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterWatermark() {
  return (
    <div className="relative flex select-none justify-center overflow-hidden py-1">
      <span
        className="font-display font-bold leading-none tracking-tight"
        style={{
          fontSize: 'clamp(3rem, 13vw, 180px)',
          backgroundImage: 'linear-gradient(90deg, #8B5CF6 0%, #4F6EF7 50%, #93C5FD 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 95%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 95%)',
        }}
      >
        ASTRA
      </span>
      <motion.span
        aria-hidden="true"
        className="absolute right-[20%] top-[10%] h-4 w-4 rounded-full bg-violet-400 md:h-6 md:w-6"
        style={{ boxShadow: '0 0 24px 6px rgba(139,92,246,0.7)' }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
