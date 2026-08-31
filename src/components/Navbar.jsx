import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '../content/ContentProvider.jsx'
import { HiOutlineMenu, HiOutlineX, HiOutlineChevronDown } from 'react-icons/hi'
import GradientButton from './GradientButton.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function Navbar() {
  const { navLinks, settings } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const navHref = (href) => (isHome || href.startsWith('/') ? href : `/${href}`)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      if (!open) {
        // Late-loading images/fonts near the footer can shrink the page's
        // scrollable height by a few px right as you hit bottom, which the
        // browser reports as a genuine scroll-up event — that used to flip
        // the navbar back to visible and cover the footer. Once we're
        // essentially at the bottom, keep it hidden regardless of that
        // jitter; otherwise fall back to normal scroll-direction behavior.
        const atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 4
        if (atBottom) setHidden(true)
        else if (y > lastY && y > 120) setHidden(true)
        else if (y < lastY) setHidden(false)
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: hidden ? '-100%' : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-text/25 to-transparent"
      />
      <div className="container-px">
        <div
          className={`relative flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? 'border-text/8 bg-bg/60 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_12px_40px_-16px_rgba(79,110,247,0.35)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <Link
            to="/"
            onClick={() => {
              setOpen(false)
              window.scrollTo({ top: 0, behavior: isHome ? 'smooth' : 'auto' })
            }}
            className="flex items-center gap-2.5"
            aria-label={`${settings.site_name} — home`}
          >
            <motion.img
              src={settings.logo_path}
              alt="Astra Infotech"
              className="h-9 w-9"
              whileHover={{ rotate: 12, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href.startsWith('/') &&
                (location.pathname === link.href ||
                  location.pathname.startsWith(`${link.href}/`) ||
                  link.children?.some(
                    (child) =>
                      location.pathname === child.href ||
                      location.pathname.startsWith(`${child.href}/`)
                  ))

              if (link.children) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(link.label)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <div
                      className={`group/link relative flex items-center gap-1 text-sm transition-colors ${
                        isActive ? 'text-text' : 'text-text/70'
                      }`}
                    >
                      <Link to={link.href} className="hover:text-text">
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Toggle ${link.label} submenu`}
                        onClick={() => setDropdownOpen((v) => (v === link.label ? null : link.label))}
                        className="hover:text-text"
                      >
                        <HiOutlineChevronDown
                          className={`transition-transform duration-200 ${
                            dropdownOpen === link.label ? 'rotate-180' : ''
                          }`}
                          size={14}
                        />
                      </button>
                      <span
                        className={`absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-linear-to-r from-blue-400 to-violet-400 transition-all duration-300 group-hover/link:w-full ${
                          isActive ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>

                    <AnimatePresence>
                      {dropdownOpen === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-0 top-full pt-3"
                        >
                          <div className="min-w-44 rounded-xl border border-text/8 bg-bg/95 p-1.5 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                            {link.children.map((child) => {
                              const childActive =
                                location.pathname === child.href ||
                                location.pathname.startsWith(`${child.href}/`)
                              return (
                                <Link
                                  key={child.label}
                                  to={child.href}
                                  onClick={() => setDropdownOpen(null)}
                                  className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-text/5 hover:text-text ${
                                    childActive ? 'text-text' : 'text-text/70'
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`group/link relative text-sm transition-colors hover:text-text ${
                    isActive ? 'text-text' : 'text-text/70'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-linear-to-r from-blue-400 to-violet-400 transition-all duration-300 group-hover/link:w-full ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={navHref(link.href)}
                  className="group/link relative text-sm text-text/70 transition-colors hover:text-text"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-linear-to-r from-blue-400 to-violet-400 transition-all duration-300 group-hover/link:w-full" />
                </a>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <GradientButton
              href="/contact"
              className="px-5! py-2.5! text-xs shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_24px_-8px_rgba(108,99,255,0.55)]"
            >
              {settings.start_project_cta_label}
            </GradientButton>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => {
                setOpen((v) => !v)
                setMobileExpanded(null)
              }}
              className="text-text"
              aria-label="Toggle menu"
            >
              {open ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-text/8 bg-bg/80 p-4 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl md:hidden">
            {navLinks.map((link) => {
              const isActive =
                link.href.startsWith('/') &&
                (location.pathname === link.href ||
                  location.pathname.startsWith(`${link.href}/`) ||
                  link.children?.some(
                    (child) =>
                      location.pathname === child.href ||
                      location.pathname.startsWith(`${child.href}/`)
                  ))

              if (link.children) {
                const expanded = mobileExpanded === link.label
                return (
                  <div key={link.label}>
                    <div
                      className={`flex items-center justify-between rounded-lg pr-2 text-sm hover:bg-text/5 ${
                        isActive ? 'bg-text/5 font-medium text-text' : 'text-text/80'
                      }`}
                    >
                      <Link
                        to={link.href}
                        onClick={() => {
                          setOpen(false)
                          setMobileExpanded(null)
                        }}
                        className="flex-1 px-3 py-2.5"
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Toggle ${link.label} submenu`}
                        onClick={() => setMobileExpanded((v) => (v === link.label ? null : link.label))}
                        className="p-2.5"
                      >
                        <HiOutlineChevronDown
                          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                          size={16}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-3"
                        >
                          {link.children.map((child) => {
                            const childActive =
                              location.pathname === child.href ||
                              location.pathname.startsWith(`${child.href}/`)
                            return (
                              <Link
                                key={child.label}
                                to={child.href}
                                onClick={() => {
                                  setOpen(false)
                                  setMobileExpanded(null)
                                }}
                                className={`block rounded-lg px-3 py-2 text-sm hover:bg-text/5 ${
                                  childActive ? 'font-medium text-text' : 'text-text/70'
                                }`}
                              >
                                {child.label}
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm hover:bg-text/5 ${
                    isActive ? 'bg-text/5 font-medium text-text' : 'text-text/80'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={navHref(link.href)}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-text/80 hover:bg-text/5"
                >
                  {link.label}
                </a>
              )
            })}
            <GradientButton href="/contact" onClick={() => setOpen(false)} className="mt-2 justify-center">
              {settings.start_project_cta_label}
            </GradientButton>
          </div>
        )}
      </div>
    </motion.header>
  )
}
