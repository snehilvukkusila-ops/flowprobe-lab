import { useState } from 'react'

const initialNotifications = [
  {
    id: 1,
    title: 'New comment on your report',
    detail: 'Priya left a comment on "Q3 Budget Report".',
    read: false,
  },
  {
    id: 2,
    title: 'Weekly summary ready',
    detail: 'Your weekly activity summary has been generated.',
    read: false,
  },
  {
    id: 3,
    title: 'Team member joined',
    detail: 'Alex Morgan accepted their invite and joined the team.',
    read: true,
  },
  {
    id: 4,
    title: 'Project deadline approaching',
    detail: '"Website Redesign" is due in 3 days.',
    read: false,
  },
]

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [expandedId, setExpandedId] = useState(null)

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const toggleExpanded = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="card">
      <span className="tag">Notifications</span>
      <h1>Notifications</h1>
      <p>Recent activity affecting you and your team.</p>
      <button type="button" onClick={markAllRead}>
        Mark all read
      </button>
      <ul>
        {notifications.map((n) => (
          <li key={n.id} style={{ marginTop: '0.75rem', cursor: 'pointer' }}>
            <span className={`badge ${n.read ? 'read' : 'unread'}`}>
              {n.read ? 'Read' : 'Unread'}
            </span>{' '}
            <span onClick={() => toggleExpanded(n.id)}>{n.title}</span>
            {expandedId === n.id && (
              <p>
                <small>{n.detail}</small>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
