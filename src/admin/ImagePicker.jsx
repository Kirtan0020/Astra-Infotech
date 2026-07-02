import { useEffect, useRef, useState } from 'react'
import { adminApi, uploadMedia } from './adminApi.js'

// Compact image field: shows the current path with a thumbnail, "Choose"
// opens a modal over the media library (with inline upload), used by
// JsonFieldsForm for any field whose key/value looks like an image path.
export default function ImagePicker({ value, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center gap-3">
      {value ? (
        <img src={value} alt="" className="h-14 w-14 rounded-lg object-cover" />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-white/20 text-xs text-white/30">
          none
        </div>
      )}
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
      />
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="shrink-0 rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20"
      >
        Choose
      </button>

      {open && (
        <MediaModal
          onClose={() => setOpen(false)}
          onSelect={(path) => {
            onChange(path)
            setOpen(false)
          }}
        />
      )}
    </div>
  )
}

function MediaModal({ onClose, onSelect }) {
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
      const media = await uploadMedia(file)
      onSelect(media.path)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111116] p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium">Choose an image</h3>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer rounded-lg bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20">
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
            <button type="button" onClick={onClose} className="text-white/50 hover:text-white">
              ✕
            </button>
          </div>
        </div>

        {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
        {!items && !error && <p className="text-sm text-white/50">Loading…</p>}
        {items && items.length === 0 && <p className="text-sm text-white/40">No media yet — upload one.</p>}

        {items && items.length > 0 && (
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
            {items.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelect(m.path)}
                className="overflow-hidden rounded-lg border border-white/10 hover:border-white/40"
              >
                <img src={m.path} alt={m.alt_text} className="h-20 w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
