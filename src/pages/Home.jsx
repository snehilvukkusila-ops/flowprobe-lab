export default function Home() {
  return (
    <div className="card">
      <span className="tag">FlowProbe</span>
      <h1>A tiny, no-login app for testing docs generation</h1>
      <p>
        This app exists only to give the userflow-track pipeline something
        fast and public to explore: a few real, routed pages, a real
        client-side router (react-router-dom), and zero authentication
        anywhere — so exploration can actually reach every page and capture
        a real screenshot of it.
      </p>
      <p>
        Use the nav bar above to browse Dashboard, Profile, Settings, and
        About — every page is reachable with a plain click, no login wall.
      </p>
    </div>
  )
}
