import { useEffect, useState } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import SectionRenderer from '../content/SectionRenderer.jsx'
import { useContent } from '../content/ContentProvider.jsx'

const socialIcons = [
  { Icon: FiTwitter, key: 'social_twitter' },
  { Icon: FiLinkedin, key: 'social_linkedin' },
  { Icon: FiInstagram, key: 'social_instagram' },
  { Icon: FiFacebook, key: 'social_facebook' },
  { Icon: FiGithub, key: 'social_github' },
]

export default function Contact() {
  const { pages } = useContent()
  const page = pages.contact
  const heroSection = page.sections.find((s) => s.type === 'hero')
  const otherSections = page.sections.filter((s) => s.type !== 'hero')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div id="top" className="relative min-h-screen bg-[var(--color-bg)]">
      <Seo {...page.meta} />
      <ScrollProgress />
      <Navbar />
      {heroSection && <SectionRenderer section={heroSection} />}
      <ContactSection />
      {otherSections.map((section, i) => (
        <SectionRenderer key={section.id ?? i} section={section} />
      ))}
      <Footer />
    </div>
  )
}

function ContactSection() {
  return (
    <section className="relative pb-28">
      <div className="container-px grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <ContactForm />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactInfo />
        </Reveal>
      </div>
    </section>
  )
}

function ContactForm() {
  const { settings } = useContent()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`New project inquiry from ${name || 'website visitor'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:${settings.email}?subject=${subject}&body=${body}`
  }

  const inputClasses =
    'w-full rounded-xl border border-[var(--color-text)]/10 bg-[var(--color-text)]/5 px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text)]/30 outline-none transition-colors focus:border-violet-400/60'

  return (
    <form onSubmit={handleSubmit} className="surface-card !p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium text-[var(--color-text)]/60">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium text-[var(--color-text)]/60">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-xs font-medium text-[var(--color-text)]/60">
          Project details
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you looking to build?"
          className={`${inputClasses} resize-none`}
        />
      </div>

      <button type="submit" className="btn-primary mt-6 inline-flex">
        Send message <HiOutlineArrowRight />
      </button>
    </form>
  )
}

function ContactInfo() {
  const { settings } = useContent()

  return (
    <div className="surface-card flex h-full flex-col !p-8">
      <span className="pill w-fit">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {settings.available_badge_label}
      </span>

      <h3 className="mt-6 font-display text-xl text-[var(--color-text)]">Drop us a line</h3>
      <a
        href={`mailto:${settings.email}`}
        className="mt-2 inline-block text-sm text-[var(--color-text)]/60 transition-colors hover:text-[var(--color-text)]"
      >
        {settings.email}
      </a>

      <h3 className="mt-6 font-display text-xl text-[var(--color-text)]">Call us</h3>
      <a
        href={settings.phone_href}
        className="mt-2 inline-block text-sm text-[var(--color-text)]/60 transition-colors hover:text-[var(--color-text)]"
      >
        {settings.phone}
      </a>

      <h3 className="mt-6 font-display text-xl text-[var(--color-text)]">Location</h3>
      <p className="mt-2 text-sm text-[var(--color-text)]/60">{settings.location}</p>

      <div className="mt-auto flex gap-3 pt-8">
        {socialIcons
          .filter(({ key }) => settings[key])
          .map(({ Icon, key }) => (
            <a
              key={key}
              href={settings[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-text)]/10 text-[var(--color-text)]/70 transition-colors hover:bg-[var(--color-text)]/5 hover:text-[var(--color-text)]"
              aria-label="Social link"
            >
              <Icon size={15} />
            </a>
          ))}
      </div>
    </div>
  )
}
