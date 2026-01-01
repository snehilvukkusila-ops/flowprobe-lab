import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const EXTRA_PROJECTS = [
  {
    id: 'extra-1',
    name: 'Design Tokens Audit',
    owner: 'Marcus Reid',
    ownerId: '2',
    status: 'active',
    deadline: '2026-11-20',
    summary: 'Audits every color/spacing token against the new design system before v2 ships.',
  },
  {
    id: 'extra-2',
    name: 'CI Speedup',
    owner: 'Diego Alvarez',
    ownerId: '4',
    status: 'review',
    deadline: '2026-10-30',
    summary: 'Cuts the CI pipeline runtime by caching dependency installs across jobs.',
  },
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('')
  const [extraShown, setExtraShown] = useState(0)

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'projects.json')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]))
  }, [])

  const visible = [...projects, ...EXTRA_PROJECTS.slice(0, extraShown)].filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="card">
      <span className="tag">Projects</span>
      <h1>Projects</h1>
      <p>Current projects across the team.</p>

      <input
        type="search"
        placeholder="Filter projects"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Filter projects"
      />

      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((p) => (
            <tr key={p.id}>
              <td>
                {p.name}
                {p.summary && <p className="row-summary">{p.summary}</p>}
              </td>
              <td>
                {p.ownerId ? <Link to={`/team/${p.ownerId}`}>{p.owner}</Link> : p.owner}
              </td>
              <td>
                <span className={`badge status-${p.status}`}>{p.status}</span>
              </td>
              <td>{p.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {extraShown < EXTRA_PROJECTS.length && (
        <button onClick={() => setExtraShown((n) => n + 1)}>Load more</button>
      )}
    </div>
  )
}
