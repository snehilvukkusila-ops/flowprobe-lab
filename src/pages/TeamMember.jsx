import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ACTIVITY_LOG = [
  'Updated the roster entry',
  'Commented on Atlas Migration',
  'Joined the weekly sync',
]

export default function TeamMember() {
  const { id } = useParams()
  const [member, setMember] = useState(null)
  const [ownedProjects, setOwnedProjects] = useState([])
  const [showActivity, setShowActivity] = useState(false)

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'team.json')
      .then((res) => res.json())
      .then((data) => setMember(data.find((m) => String(m.id) === String(id)) || null))
      .catch(() => setMember(null))

    fetch(import.meta.env.BASE_URL + 'projects.json')
      .then((res) => res.json())
      .then((data) => setOwnedProjects(data.filter((p) => String(p.ownerId) === String(id))))
      .catch(() => setOwnedProjects([]))
  }, [id])

  if (!member) {
    return (
      <div className="card">
        <span className="tag">Team</span>
        <h1>Loading member…</h1>
      </div>
    )
  }

  return (
    <div className="card">
      <span className="tag">Team</span>
      <h1>{member.name}</h1>
      <p>
        <strong>Role:</strong> {member.role}
      </p>
      <p>
        <strong>Status:</strong>{' '}
        <span className={`badge status-${member.status}`}>
          {member.status === 'active' ? 'Active' : member.status === 'away' ? 'Away' : 'Offline'}
        </span>
      </p>
      <p>{member.bio}</p>

      <button onClick={() => setShowActivity((v) => !v)}>
        {showActivity ? 'Hide activity' : 'View activity'}
      </button>

      {showActivity && (
        <ul>
          {ACTIVITY_LOG.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      )}

      {ownedProjects.length > 0 && (
        <section>
          <h2>Projects owned</h2>
          <ul>
            {ownedProjects.map((p) => (
              <li key={p.id}>
                <Link to="/projects">{p.name}</Link> —{' '}
                <span className={`badge status-${p.status}`}>{p.status}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Deliberately links out of the /team subtree to /dashboard (not back to
          /team) — a fixture for testing the exploration pipeline's
          left_subtree/interaction-safety detection. Do not "fix" this to
          point back to Team. */}
      <p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </p>
    </div>
  )
}
