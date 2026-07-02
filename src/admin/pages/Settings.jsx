import { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout.jsx'
import { adminApi } from '../adminApi.js'

export default function Settings() {
  const [settings, setSettings] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    adminApi
      .getSettings()
      .then((d) => setSettings(d.settings))
      .catch((err) => setError(err.message))
  }, [])

  const setField = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }))
    setSaved(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const { settings: updated } = await adminApi.updateSettings(settings)
      setSettings(updated)
      setSaved(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (error && !settings) {
    return (
      <AdminLayout>
        <p className="text-sm text-red-400">{error}</p>
      </AdminLayout>
    )
  }

  if (!settings) {
    return (
      <AdminLayout>
        <p className="text-sm text-white/50">Loading…</p>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-semibold">Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-xl border border-white/10 bg-white/5 p-5">
        {Object.keys(settings).map((key) => (
          <div key={key}>
            <label className="mb-1 block text-xs font-medium text-white/50">{key}</label>
            <input
              type="text"
              value={settings[key]}
              onChange={(e) => setField(key, e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
            />
          </div>
        ))}
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-white px-4 py-2 text-xs font-medium text-black disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {saved && <span className="ml-3 text-xs text-emerald-400">Saved</span>}
      </form>
    </AdminLayout>
  )
}
