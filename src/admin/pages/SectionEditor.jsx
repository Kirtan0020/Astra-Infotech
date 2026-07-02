import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminLayout from '../AdminLayout.jsx'
import JsonFieldsForm from '../JsonFieldsForm.jsx'
import { adminApi } from '../adminApi.js'

export default function SectionEditor() {
  const { id: pageId, sectionId } = useParams()
  const [section, setSection] = useState(null)
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [savingData, setSavingData] = useState(false)
  const [dataSaved, setDataSaved] = useState(false)

  const load = useCallback(() => {
    Promise.all([adminApi.listSections(pageId), adminApi.listItems(sectionId)])
      .then(([sectionsRes, itemsRes]) => {
        setSection(sectionsRes.sections.find((s) => String(s.id) === String(sectionId)) ?? null)
        setItems(itemsRes.items)
      })
      .catch((err) => setError(err.message))
  }, [pageId, sectionId])

  useEffect(() => {
    load()
  }, [load])

  const saveSectionData = async (data) => {
    setSavingData(true)
    setDataSaved(false)
    try {
      const { section: updated } = await adminApi.updateSection(sectionId, { data })
      setSection(updated)
      setDataSaved(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingData(false)
    }
  }

  const addItem = async () => {
    const template = items.length > 0 ? Object.fromEntries(Object.keys(items[0].data).map((k) => [k, ''])) : {}
    const { item } = await adminApi.createItem({ section_id: Number(sectionId), data: template })
    setItems([...items, item])
  }

  const saveItem = async (itemId, data) => {
    const { item } = await adminApi.updateItem(itemId, { data })
    setItems((prev) => prev.map((it) => (it.id === itemId ? item : it)))
  }

  const deleteItem = async (itemId) => {
    if (!confirm('Delete this item?')) return
    await adminApi.deleteItem(itemId)
    setItems((prev) => prev.filter((it) => it.id !== itemId))
  }

  const moveItem = async (index, dir) => {
    const next = [...items]
    const swapWith = index + dir
    if (swapWith < 0 || swapWith >= next.length) return
    ;[next[index], next[swapWith]] = [next[swapWith], next[index]]
    setItems(next)
    await adminApi.reorderItems(next.map((it) => it.id))
  }

  if (error) {
    return (
      <AdminLayout>
        <p className="text-sm text-red-400">{error}</p>
      </AdminLayout>
    )
  }

  if (!section || !items) {
    return (
      <AdminLayout>
        <p className="text-sm text-white/50">Loading…</p>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <Link to={`/admin/pages/${pageId}`} className="mb-4 inline-block text-sm text-white/50 hover:text-white">
        ← Page
      </Link>
      <h1 className="mb-6 text-2xl font-semibold capitalize">{section.type} section</h1>

      <div className="mb-8 max-w-xl rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="mb-4 text-sm font-medium text-white/70">Section fields</h2>
        <JsonFieldsForm key={section.id} value={section.data} onSave={saveSectionData} saving={savingData} />
        {dataSaved && <span className="mt-3 block text-xs text-emerald-400">Saved</span>}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-white/70">Items ({items.length})</h2>
        <button
          type="button"
          onClick={addItem}
          className="rounded-lg bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
        >
          + Add item
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <ItemCard
            key={item.id}
            item={item}
            index={i}
            total={items.length}
            onSave={(data) => saveItem(item.id, data)}
            onDelete={() => deleteItem(item.id)}
            onMove={(dir) => moveItem(i, dir)}
          />
        ))}
        {items.length === 0 && <p className="text-sm text-white/40">No items in this section yet.</p>}
      </div>
    </AdminLayout>
  )
}

function ItemCard({ item, index, total, onSave, onDelete, onMove }) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const label = item.data.title || item.data.name || item.data.q || item.data.quote || `Item ${index + 1}`

  const handleSave = async (data) => {
    setSaving(true)
    try {
      await onSave(data)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between px-5 py-3">
        <button type="button" onClick={() => setOpen((v) => !v)} className="text-left text-sm font-medium">
          {open ? '▾' : '▸'} {label}
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="text-white/50 hover:text-white disabled:opacity-20"
            aria-label="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="text-white/50 hover:text-white disabled:opacity-20"
            aria-label="Move down"
          >
            ↓
          </button>
          <button type="button" onClick={onDelete} className="text-red-400/70 hover:text-red-400">
            Delete
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10 px-5 py-4">
          <JsonFieldsForm key={item.id} value={item.data} onSave={handleSave} saving={saving} />
        </div>
      )}
    </div>
  )
}
