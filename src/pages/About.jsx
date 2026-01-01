import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="card">
      <span className="tag">About</span>
      <h1>About FlowProbe</h1>
      <p>
        A minimal React + react-router-dom app, deployed to GitHub Pages,
        with five real routed pages and no authentication anywhere. Built
        specifically to test screenshot capture in a documentation-generation
        pipeline against a small, fast, always-reachable target.
      </p>
      <h2>Edge cases</h2>
      <p>Deliberate test fixtures for error-state discovery:</p>
      <ul>
        <li>
          <Link to="/this-page-does-not-exist">Broken link (404 test)</Link>
        </li>
        <li>
          <Link to="/error-demo">Simulated error page</Link>
        </li>
      </ul>
    </div>
  )
}
