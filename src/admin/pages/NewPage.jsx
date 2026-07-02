import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../AdminLayout.jsx'
import { adminApi } from '../adminApi.js'

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function NewPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleTitleChange = (value) => {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const path = `/${slug}`
      const { page } = await adminApi.createPage({
        slug,
        path,
        title,
        meta_title: title,
        meta_description: '',
      })
      navigate(`/admin/pages/${page.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-semibold">New page</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-xl border border-white/10 bg-white/5 p-5">
        <div>
          <label className="mb-1 block text-xs text-white/50">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-white/50">URL path</label>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-white/40">/</span>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true)
                setSlug(slugify(e.target.value))
              }}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={busy || !title || !slug}
          className="rounded-lg bg-white px-4 py-2 text-xs font-medium text-black disabled:opacity-50"
        >
          {busy ? 'Creating…' : 'Create page'}
        </button>
        <p className="text-xs text-white/40">
          After creating, add sections from its editor, then link to it from Menu.
        </p>
      </form>
    </AdminLayout>
  )
}
