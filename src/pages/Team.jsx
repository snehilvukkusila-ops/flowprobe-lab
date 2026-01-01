import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Team() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'team.json')
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch(() => setMembers([]))
  }, [])

  return (
    <div className="card">
      <span className="tag">Team</span>
      <h1>Team</h1>
      <p>Roster of current team members and their status.</p>

      <Link to="/invite" className="tag" style={{ marginBottom: '1rem', display: 'inline-block' }}>
        + Invite
      </Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.role}</td>
              <td>
                <span className={`badge status-${m.status}`}>
                  {m.status === 'active' ? 'Active' : m.status === 'away' ? 'Away' : 'Offline'}
                </span>
              </td>
              <td>
                <Link to={`/team/${m.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
