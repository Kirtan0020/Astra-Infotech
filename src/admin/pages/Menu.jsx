import { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout.jsx'
import { adminApi } from '../adminApi.js'

export default function Menu() {
  const [links, setLinks] = useState(null)
  const [error, setError] = useState('')

  const load = () => {
    adminApi
      .listNav()
      .then((d) => setLinks(d.navLinks))
      .catch((err) => setError(err.message))
  }

  useEffect(load, [])

  if (error) {
    return (
      <AdminLayout>
        <p className="text-sm text-red-400">{error}</p>
      </AdminLayout>
    )
  }

  if (!links) {
    return (
      <AdminLayout>
        <p className="text-sm text-white/50">Loading…</p>
      </AdminLayout>
    )
  }

  const primary = links.filter((l) => l.menu === 'primary')
  const footer = links.filter((l) => l.menu === 'footer')
  const footerGroups = [...new Set(footer.map((l) => l.group_label || 'Ungrouped'))]

  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-semibold">Menu</h1>

      <section className="mb-10">
        <h2 className="mb-3 text-sm font-medium text-white/70">Primary navigation</h2>
        <LinkList
          links={primary.filter((l) => !l.parent_id)}
          allLinks={primary}
          menu="primary"
          onChange={load}
        />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-white/70">Footer</h2>
        {footerGroups.map((group) => (
          <div key={group} className="mb-6">
            <p className="mb-2 text-xs uppercase tracking-wide text-white/40">{group}</p>
            <LinkList
              links={footer.filter((l) => (l.group_label || 'Ungrouped') === group)}
              menu="footer"
              groupLabel={group}
              onChange={load}
            />
          </div>
        ))}
      </section>
    </AdminLayout>
  )
}

function LinkList({ links, allLinks = [], menu, groupLabel, onChange }) {
  const [newLabel, setNewLabel] = useState('')
  const [newHref, setNewHref] = useState('')
  const [newParent, setNewParent] = useState('')

  const save = async (link, patch) => {
    await adminApi.updateNav(link.id, { ...link, ...patch })
    onChange()
  }

  const remove = async (id) => {
    if (!confirm('Delete this link?')) return
    await adminApi.deleteNav(id)
    onChange()
  }

  const add = async (e) => {
    e.preventDefault()
    if (!newLabel || !newHref) return
    await adminApi.createNav({
      menu,
      label: newLabel,
      href: newHref,
      group_label: groupLabel ?? null,
      parent_id: newParent ? Number(newParent) : null,
    })
    setNewLabel('')
    setNewHref('')
    setNewParent('')
    onChange()
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5">
      <div className="divide-y divide-white/10">
        {links.map((link) => {
          const children = allLinks.filter((l) => l.parent_id === link.id)
          return (
            <div key={link.id}>
              <div className="flex items-center gap-3 px-4 py-3">
                <input
                  type="text"
                  defaultValue={link.label}
                  onBlur={(e) => e.target.value !== link.label && save(link, { label: e.target.value })}
                  className="w-32 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm outline-none focus:border-white/30"
                />
                <input
                  type="text"
                  defaultValue={link.href}
                  onBlur={(e) => e.target.value !== link.href && save(link, { href: e.target.value })}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm outline-none focus:border-white/30"
                />
                <button
                  type="button"
                  onClick={() => remove(link.id)}
                  className="text-xs text-red-400/70 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
              {children.map((child) => (
                <div key={child.id} className="flex items-center gap-3 border-t border-white/5 py-3 pl-10 pr-4">
                  <input
                    type="text"
                    defaultValue={child.label}
                    onBlur={(e) => e.target.value !== child.label && save(child, { label: e.target.value })}
                    className="w-28 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm outline-none focus:border-white/30"
                  />
                  <input
                    type="text"
                    defaultValue={child.href}
                    onBlur={(e) => e.target.value !== child.href && save(child, { href: e.target.value })}
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm outline-none focus:border-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => remove(child.id)}
                    className="text-xs text-red-400/70 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )
        })}
      </div>
      <form onSubmit={add} className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
        <input
          type="text"
          placeholder="Label"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          className="w-32 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm outline-none focus:border-white/30"
        />
        <input
          type="text"
          placeholder="/href"
          value={newHref}
          onChange={(e) => setNewHref(e.target.value)}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm outline-none focus:border-white/30"
        />
        {menu === 'primary' && allLinks.length > 0 && (
          <select
            value={newParent}
            onChange={(e) => setNewParent(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#111116] px-2 py-1 text-sm outline-none focus:border-white/30"
          >
            <option value="">Top level</option>
            {allLinks
              .filter((l) => !l.parent_id)
              .map((l) => (
                <option key={l.id} value={l.id}>
                  under {l.label}
                </option>
              ))}
          </select>
        )}
        <button type="submit" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20">
          + Add
        </button>
      </form>
    </div>
  )
}
