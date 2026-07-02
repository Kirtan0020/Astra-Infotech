import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Work from './pages/Work.jsx'
import About from './pages/About.jsx'
import Team from './pages/Team.jsx'
import Career from './pages/Career.jsx'
import Contact from './pages/Contact.jsx'
import GenericPage from './pages/GenericPage.jsx'
import AdminAuthProvider from './admin/AdminAuthContext.jsx'
import RequireAdmin from './admin/RequireAdmin.jsx'
import Login from './admin/pages/Login.jsx'
import Dashboard from './admin/pages/Dashboard.jsx'
import PagesList from './admin/pages/PagesList.jsx'
import NewPage from './admin/pages/NewPage.jsx'
import PageEditor from './admin/pages/PageEditor.jsx'
import SectionEditor from './admin/pages/SectionEditor.jsx'
import Settings from './admin/pages/Settings.jsx'
import Menu from './admin/pages/Menu.jsx'
import Media from './admin/pages/Media.jsx'

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

      <Route path="/admin/*" element={<AdminAuthProvider><AdminRoutes /></AdminAuthProvider>} />

      {/* Admin-created pages render generically — matched by URL against the
          fetched pages list, so new pages need no code changes to go live. */}
      <Route path="*" element={<GenericPage />} />
    </Routes>
  )
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="" element={<RequireAdmin><Dashboard /></RequireAdmin>} />
      <Route path="pages" element={<RequireAdmin><PagesList /></RequireAdmin>} />
      <Route path="pages/new" element={<RequireAdmin><NewPage /></RequireAdmin>} />
      <Route path="pages/:id" element={<RequireAdmin><PageEditor /></RequireAdmin>} />
      <Route path="pages/:id/sections/:sectionId" element={<RequireAdmin><SectionEditor /></RequireAdmin>} />
      <Route path="menu" element={<RequireAdmin><Menu /></RequireAdmin>} />
      <Route path="settings" element={<RequireAdmin><Settings /></RequireAdmin>} />
      <Route path="media" element={<RequireAdmin><Media /></RequireAdmin>} />
    </Routes>
  )
}

export default App
