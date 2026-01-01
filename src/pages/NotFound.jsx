import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="card">
      <span className="tag">404</span>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or may have been moved.</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}
