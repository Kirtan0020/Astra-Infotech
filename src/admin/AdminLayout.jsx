import { NavLink, Link } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext.jsx'

const navItems = [
  { to: '/admin/pages', label: 'Pages' },
  { to: '/admin/media', label: 'Media' },
  { to: '/admin/menu', label: 'Menu' },
  { to: '/admin/settings', label: 'Settings' },
]

export default function AdminLayout({ children }) {
  const { admin, logout } = useAdminAuth()

  return (
    <div className="flex min-h-screen bg-[#0b0b10] text-white">
      <aside className="flex w-56 shrink-0 flex-col border-r border-white/10 bg-[#111116] p-5">
        <Link to="/admin" className="mb-8 block text-lg font-semibold">
          Astra CMS
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-4 text-sm">
          <p className="text-white/40">Signed in as</p>
          <p className="mb-3 truncate text-white/80">{admin?.username}</p>
          <div className="flex gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white">
              View site
            </a>
            <button type="button" onClick={logout} className="text-white/50 hover:text-white">
              Log out
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}
