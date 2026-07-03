import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Work from './pages/Work.jsx'
import About from './pages/About.jsx'
import Team from './pages/Team.jsx'
import Career from './pages/Career.jsx'
import Contact from './pages/Contact.jsx'
import GenericPage from './pages/GenericPage.jsx'

// Admin dashboard code (forms, editors, media library) is only ever needed by
// the site owner, never by public visitors — split into its own chunk so it
// doesn't add weight to the public pages' initial load.
const AdminAuthProvider = lazy(() => import('./admin/AdminAuthContext.jsx'))
const RequireAdmin = lazy(() => import('./admin/RequireAdmin.jsx'))
const Login = lazy(() => import('./admin/pages/Login.jsx'))
const Dashboard = lazy(() => import('./admin/pages/Dashboard.jsx'))
const PagesList = lazy(() => import('./admin/pages/PagesList.jsx'))
const NewPage = lazy(() => import('./admin/pages/NewPage.jsx'))
const PageEditor = lazy(() => import('./admin/pages/PageEditor.jsx'))
const SectionEditor = lazy(() => import('./admin/pages/SectionEditor.jsx'))
const Settings = lazy(() => import('./admin/pages/Settings.jsx'))
const Menu = lazy(() => import('./admin/pages/Menu.jsx'))
const Media = lazy(() => import('./admin/pages/Media.jsx'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/work" element={<Work />} />
      <Route path="/about" element={<About />} />
      <Route path="/team" element={<Team />} />
      <Route path="/career" element={<Career />} />
      <Route path="/contact" element={<Contact />} />

      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<AdminLoadingFallback />}>
            <AdminAuthProvider>
              <AdminRoutes />
            </AdminAuthProvider>
          </Suspense>
        }
      />

      {/* Admin-created pages render generically — matched by URL against the
          fetched pages list, so new pages need no code changes to go live. */}
      <Route path="*" element={<GenericPage />} />
    </Routes>
  )
}

function AdminLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0b10] text-white/50">
      Loading…
    </div>
  )
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path=""
        element={
          <RequireAdmin>
            <Dashboard />
          </RequireAdmin>
        }
      />
      <Route
        path="pages"
        element={
          <RequireAdmin>
            <PagesList />
          </RequireAdmin>
        }
      />
      <Route
        path="pages/new"
        element={
          <RequireAdmin>
            <NewPage />
          </RequireAdmin>
        }
      />
      <Route
        path="pages/:id"
        element={
          <RequireAdmin>
            <PageEditor />
          </RequireAdmin>
        }
      />
      <Route
        path="pages/:id/sections/:sectionId"
        element={
          <RequireAdmin>
            <SectionEditor />
          </RequireAdmin>
        }
      />
      <Route
        path="menu"
        element={
          <RequireAdmin>
            <Menu />
          </RequireAdmin>
        }
      />
      <Route
        path="settings"
        element={
          <RequireAdmin>
            <Settings />
          </RequireAdmin>
        }
      />
      <Route
        path="media"
        element={
          <RequireAdmin>
            <Media />
          </RequireAdmin>
        }
      />
    </Routes>
  )
}

export default App
