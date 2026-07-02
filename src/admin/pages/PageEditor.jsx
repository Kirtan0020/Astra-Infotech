import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../AdminLayout.jsx'
import AddSectionModal from '../AddSectionModal.jsx'
import { adminApi } from '../adminApi.js'

export default function PageEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [page, setPage] = useState(null)
  const [sections, setSections] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(null)
  const [addOpen, setAddOpen] = useState(false)

  const load = useCallback(() => {
    Promise.all([adminApi.listPages(), adminApi.listSections(id)])
      .then(([pagesRes, sectionsRes]) => {
        const found = pagesRes.pages.find((p) => String(p.id) === String(id))
        setPage(found ?? null)
        setSections(sectionsRes.sections)
      })
      .catch((err) => setError(err.message))
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const savePageMeta = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const { page: updated } = await adminApi.updatePage(id, {
        title: page.title,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
      })
      setPage(updated)
      setSavedAt(Date.now())
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const moveSection = async (index, dir) => {
    const next = [...sections]
    const swapWith = index + dir
    if (swapWith < 0 || swapWith >= next.length) return
    ;[next[index], next[swapWith]] = [next[swapWith], next[index]]
    setSections(next)
    await adminApi.reorderSections(next.map((s) => s.id))
  }

  const addSection = async (option) => {
    setAddOpen(false)
    const { section } = await adminApi.createSection({
      page_id: Number(id),
      type: option.type,
      data: option.data,
    })
    for (const item of option.items) {
      await adminApi.createItem({ section_id: section.id, data: item })
    }
    load()
  }

  const deleteSection = async (sectionId) => {
    if (!confirm('Delete this section and all its items?')) return
    await adminApi.deleteSection(sectionId)
    setSections((prev) => prev.filter((s) => s.id !== sectionId))
  }

  const deletePage = async () => {
    if (!confirm(`Delete "${page.title}"? This removes all its sections too.`)) return
    await adminApi.deletePage(id)
    navigate('/admin/pages')
  }

  if (error) {
    return (
      <AdminLayout>
        <p className="text-sm text-red-400">{error}</p>
      </AdminLayout>
    )
  }

  if (!page || !sections) {
    return (
      <AdminLayout>
        <p className="text-sm text-white/50">Loading…</p>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <Link to="/admin/pages" className="mb-4 inline-block text-sm text-white/50 hover:text-white">
        ← Pages
      </Link>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{page.title}</h1>
        {!page.is_system && (
          <button
            type="button"
            onClick={deletePage}
            className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
          >
            Delete page
          </button>
        )}
      </div>

      <form onSubmit={savePageMeta} className="mb-8 max-w-xl space-y-4 rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-sm font-medium text-white/70">Page details</h2>
        <div>
          <label className="mb-1 block text-xs text-white/50">Title</label>
          <input
            type="text"
            value={page.title}
            onChange={(e) => setPage({ ...page, title: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-white/50">SEO title</label>
          <input
            type="text"
            value={page.meta_title}
            onChange={(e) => setPage({ ...page, meta_title: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-white/50">SEO description</label>
          <textarea
            rows={3}
            value={page.meta_description}
            onChange={(e) => setPage({ ...page, meta_description: e.target.value })}
            className="w-full resize-y rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-white px-4 py-2 text-xs font-medium text-black disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {savedAt && <span className="ml-3 text-xs text-emerald-400">Saved</span>}
      </form>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-white/70">Sections</h2>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="rounded-lg bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
        >
          + Add section
        </button>
      </div>
      <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
        {sections.map((section, i) => (
          <div key={section.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-medium capitalize">{section.type}</p>
              <p className="text-xs text-white/40">
                {section.data.heading || section.data.eyebrow || `${section.id}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => moveSection(i, -1)}
                disabled={i === 0}
                className="text-white/50 hover:text-white disabled:opacity-20"
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveSection(i, 1)}
                disabled={i === sections.length - 1}
                className="text-white/50 hover:text-white disabled:opacity-20"
                aria-label="Move down"
              >
                ↓
              </button>
              <Link
                to={`/admin/pages/${id}/sections/${section.id}`}
                className="rounded-lg bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => deleteSection(section.id)}
                className="text-xs text-red-400/70 hover:text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {sections.length === 0 && <p className="px-5 py-4 text-sm text-white/40">No sections yet.</p>}
      </div>

      {addOpen && <AddSectionModal onClose={() => setAddOpen(false)} onPick={addSection} />}
    </AdminLayout>
  )
}
