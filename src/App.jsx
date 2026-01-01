import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import About from './pages/About.jsx'
import CreateReport from './pages/CreateReport.jsx'
import Team from './pages/Team.jsx'
import TeamMember from './pages/TeamMember.jsx'
import Projects from './pages/Projects.jsx'
import Notifications from './pages/Notifications.jsx'
import InviteMember from './pages/InviteMember.jsx'
import ErrorState from './pages/ErrorState.jsx'
import NotFound from './pages/NotFound.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/profile', label: 'Profile' },
  { to: '/settings', label: 'Settings' },
  { to: '/create-report', label: 'Create Report' },
  { to: '/team', label: 'Team' },
  { to: '/projects', label: 'Projects' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/invite', label: 'Invite' },
  { to: '/about', label: 'About' },
]

export default function App() {
  return (
    <>
      <nav className="nav">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end}>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create-report" element={<CreateReport />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:id" element={<TeamMember />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/invite" element={<InviteMember />} />
          <Route path="/about" element={<About />} />
          <Route path="/error-demo" element={<ErrorState />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
