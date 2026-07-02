import { useState } from 'react'
import ImagePicker from './ImagePicker.jsx'

const IMAGE_KEY_PATTERN = /image|photo|logo|avatar|icon-image/i

// Generic editor for a flat { key: value } object (a section's `data` or a
// section_item's `data`). Renders one field per key based on the value's
// current type — no per-section-type custom forms yet (that's Phase 7's
// type-picker work); this covers every existing content type uniformly.
export default function JsonFieldsForm({ value, onSave, saving }) {
  const [draft, setDraft] = useState(() => toDraft(value))

  const setField = (key, next) => {
    setDraft((d) => ({ ...d, [key]: next }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(fromDraft(draft, value))
  }

  const keys = Object.keys(draft)

  if (keys.length === 0) {
    return (
      <div>
        <p className="text-sm text-white/40">No fields on this item.</p>
        <button
          type="button"
          onClick={() => onSave(value)}
          className="mt-3 rounded-lg bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
        >
          Save
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {keys.map((key) => (
        <div key={key}>
          <label className="mb-1 block text-xs font-medium text-white/50">{key}</label>
          <FieldInput fieldKey={key} value={draft[key]} onChange={(v) => setField(key, v)} />
        </div>
      ))}
      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-white px-4 py-2 text-xs font-medium text-black disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
    </form>
  )
}

function FieldInput({ fieldKey, value, onChange }) {
  const inputClasses =
    'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/30'

  if (typeof value === 'boolean') {
    return (
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4"
      />
    )
  }

  if (typeof value !== 'object' && IMAGE_KEY_PATTERN.test(fieldKey)) {
    return <ImagePicker value={value} onChange={onChange} />
  }

  if (Array.isArray(value)) {
    return (
      <textarea
        rows={Math.min(6, Math.max(2, value.length))}
        value={value.join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n'))}
        placeholder="One item per line"
        className={`${inputClasses} resize-y`}
      />
    )
  }

  const isLong = typeof value === 'string' && (value.length > 80 || /\n/.test(value))
  if (isLong || fieldKey.toLowerCase().includes('subtext') || fieldKey.toLowerCase().includes('desc')) {
    return (
      <textarea
        rows={4}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClasses} resize-y`}
      />
    )
  }

  return (
    <input
      type="text"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className={inputClasses}
    />
  )
}

function toDraft(value) {
  return { ...value }
}

function fromDraft(draft) {
  return { ...draft }
}
