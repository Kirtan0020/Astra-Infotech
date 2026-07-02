import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../AdminLayout.jsx'
import { adminApi } from '../adminApi.js'

export default function PagesList() {
  const [pages, setPages] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .listPages()
      .then((d) => setPages(d.pages))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pages</h1>
        <Link to="/admin/pages/new" className="rounded-lg bg-white px-4 py-2 text-xs font-medium text-black">
          + New page
        </Link>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {!pages && !error && <p className="text-sm text-white/50">Loading…</p>}

      {pages && (
        <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
          {pages.map((page) => (
            <Link
              key={page.id}
              to={`/admin/pages/${page.id}`}
              className="flex items-center justify-between px-5 py-4 hover:bg-white/5"
            >
              <div>
                <p className="font-medium">{page.title}</p>
                <p className="text-sm text-white/40">{page.path}</p>
              </div>
              {page.is_system && (
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/40">
                  system
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
