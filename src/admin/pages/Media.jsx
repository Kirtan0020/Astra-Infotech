import { useEffect, useRef, useState } from 'react'
import AdminLayout from '../AdminLayout.jsx'
import { adminApi, uploadMedia } from '../adminApi.js'

export default function Media() {
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  const load = () => {
    adminApi
      .listMedia()
      .then((d) => setItems(d.media))
      .catch((err) => setError(err.message))
  }

  useEffect(load, [])

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      await uploadMedia(file)
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this file?')) return
    await adminApi.deleteMedia(id)
    setItems((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Media</h1>
        <label className="cursor-pointer rounded-lg bg-white px-4 py-2 text-xs font-medium text-black">
          {uploading ? 'Uploading…' : '+ Upload'}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      {!items && !error && <p className="text-sm text-white/50">Loading…</p>}

      {items && items.length === 0 && <p className="text-sm text-white/40">No media yet.</p>}

      {items && items.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {items.map((m) => (
            <div key={m.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <img src={m.path} alt={m.alt_text} className="h-28 w-full object-cover" loading="lazy" />
              <div className="p-2">
                <p className="truncate text-xs text-white/60">{m.original_name}</p>
              </div>
              <button
                type="button"
                onClick={() => remove(m.id)}
                className="absolute right-2 top-2 hidden rounded-full bg-black/70 px-2 py-1 text-xs text-white group-hover:block"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
