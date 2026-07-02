import { Link } from 'react-router-dom'
import AdminLayout from '../AdminLayout.jsx'

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/admin/pages" className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
          <p className="text-lg font-medium">Pages</p>
          <p className="mt-1 text-sm text-white/50">Edit page content and sections</p>
        </Link>
        <Link to="/admin/media" className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
          <p className="text-lg font-medium">Media</p>
          <p className="mt-1 text-sm text-white/50">Upload and manage images</p>
        </Link>
        <Link to="/admin/menu" className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
          <p className="text-lg font-medium">Menu</p>
          <p className="mt-1 text-sm text-white/50">Navbar and footer links</p>
        </Link>
        <Link to="/admin/settings" className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
          <p className="text-lg font-medium">Settings</p>
          <p className="mt-1 text-sm text-white/50">Contact info, socials, SEO defaults</p>
        </Link>
      </div>
    </AdminLayout>
  )
}
