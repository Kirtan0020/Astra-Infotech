// Thin fetch wrapper for /api/admin/* — always same-origin relative URLs (see
// ContentProvider's note on why), sends the session cookie, and attaches the
// CSRF token header on mutating requests.

let csrfToken = null

export function setCsrfToken(token) {
  csrfToken = token
}

async function request(path, { method = 'GET', body } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (method !== 'GET' && csrfToken) headers['X-CSRF-Token'] = csrfToken

  const res = await fetch(`/api/admin/${path}`, {
    method,
    headers,
    credentials: 'same-origin',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data
}

export const adminApi = {
  login: (username, password) => request('login.php', { method: 'POST', body: { username, password } }),
  logout: () => request('logout.php', { method: 'POST' }),
  me: () => request('me.php'),

  listPages: () => request('pages.php'),
  createPage: (page) => request('pages.php', { method: 'POST', body: page }),
  updatePage: (id, page) => request(`pages.php?id=${id}`, { method: 'PUT', body: page }),
  deletePage: (id) => request(`pages.php?id=${id}`, { method: 'DELETE' }),

  listSections: (pageId) => request(`sections.php?page_id=${pageId}`),
  createSection: (section) => request('sections.php', { method: 'POST', body: section }),
  updateSection: (id, section) => request(`sections.php?id=${id}`, { method: 'PUT', body: section }),
  deleteSection: (id) => request(`sections.php?id=${id}`, { method: 'DELETE' }),
  reorderSections: (ids) => request('sections-reorder.php', { method: 'POST', body: { ids } }),

  listItems: (sectionId) => request(`section-items.php?section_id=${sectionId}`),
  createItem: (item) => request('section-items.php', { method: 'POST', body: item }),
  updateItem: (id, item) => request(`section-items.php?id=${id}`, { method: 'PUT', body: item }),
  deleteItem: (id) => request(`section-items.php?id=${id}`, { method: 'DELETE' }),
  reorderItems: (ids) => request('section-items-reorder.php', { method: 'POST', body: { ids } }),

  listNav: (menu) => request(`nav.php${menu ? `?menu=${menu}` : ''}`),
  createNav: (link) => request('nav.php', { method: 'POST', body: link }),
  updateNav: (id, link) => request(`nav.php?id=${id}`, { method: 'PUT', body: link }),
  deleteNav: (id) => request(`nav.php?id=${id}`, { method: 'DELETE' }),

  getSettings: () => request('settings.php'),
  updateSettings: (values) => request('settings.php', { method: 'POST', body: values }),

  listMedia: () => request('media.php'),
  deleteMedia: (id) => request(`media.php?id=${id}`, { method: 'DELETE' }),
}

export async function uploadMedia(file, altText = '') {
  const form = new FormData()
  form.append('file', file)
  form.append('alt_text', altText)

  const res = await fetch('/api/admin/media-upload.php', {
    method: 'POST',
    headers: csrfToken ? { 'X-CSRF-Token': csrfToken } : undefined,
    credentials: 'same-origin',
    body: form,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `Upload failed (${res.status})`)
  }
  return data.media
}
