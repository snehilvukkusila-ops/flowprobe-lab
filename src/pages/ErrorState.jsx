import { Link } from 'react-router-dom'

export default function ErrorState() {
  return (
    <div className="card">
      <span className="tag">Error</span>
      <h1>Something went wrong</h1>
      <p>
        We hit an unexpected error loading this page (simulated 500-style
        state for testing error-page capture). Try again later.
      </p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}
