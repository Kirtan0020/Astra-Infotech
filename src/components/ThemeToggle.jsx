import { useEffect, useState } from 'react'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark',
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle theme"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)]/70 transition-colors hover:bg-[var(--color-text)]/5 hover:text-[var(--color-text)] ${className}`}
    >
      {theme === 'dark' ? <HiOutlineSun size={17} /> : <HiOutlineMoon size={17} />}
    </button>
  )
}
