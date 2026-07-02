import { SECTION_TYPE_OPTIONS } from './sectionTypeDefaults.js'

export default function AddSectionModal({ onClose, onPick }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111116] p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium">Add a section</h3>
          <button type="button" onClick={onClose} className="text-white/50 hover:text-white">
            ✕
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {SECTION_TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.type}
              type="button"
              onClick={() => onPick(opt)}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:border-white/30 hover:bg-white/10"
            >
              <p className="font-medium">{opt.label}</p>
              <p className="mt-1 text-xs text-white/50">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
