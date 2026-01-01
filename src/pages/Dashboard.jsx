import { useEffect, useState } from 'react'

const fallbackStats = [
  { label: 'Active Projects', value: 12 },
  { label: 'Open Tasks', value: 34 },
  { label: 'Completed This Week', value: 9 },
]

export default function Dashboard() {
  const [stats, setStats] = useState(fallbackStats)
  const [refreshCount, setRefreshCount] = useState(0)

  const loadStats = () => {
    fetch(import.meta.env.BASE_URL + 'dashboard.json')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats(fallbackStats))
  }

  useEffect(() => {
    loadStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRefresh = () => {
    loadStats()
    setRefreshCount((c) => c + 1)
  }

  return (
    <div className="card">
      <span className="tag">Dashboard</span>
      <h1>Team Dashboard</h1>
      <p>A read-only overview of team activity — no forms, no mutations.</p>
      <ul>
        {stats.map((s) => (
          <li key={s.label}>
            <strong>{s.value}</strong> — {s.label}
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleRefresh}>
        Refresh
      </button>
      {refreshCount > 0 && (
        <p>
          <small>Refreshed {refreshCount} time{refreshCount === 1 ? '' : 's'} (re-fetches /dashboard.json).</small>
        </p>
      )}
    </div>
  )
}
