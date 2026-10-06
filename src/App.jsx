// The route table of the FlowProbe hostile site, for code readers such as Doc Writer.
//
// The served pages are static HTML (index.html, traps/, reveal/); nothing here is bundled or
// served. The table declares one screen, the app root, and the site sets no base path, so a
// reader joins that route to whatever app address a run is given:
//   - app address http://probe:4105/        -> the hostile home page (J103, J150);
//   - app address http://probe:4105/reveal/ -> the reveal workbench (J162 to J167),
// and the same on the WebSocket twin (4106). The workbench is linked from nowhere else, so a
// run started at the site root never meets it.
import { Route, Routes } from 'react-router-dom'

function StaticPage() {
  return null
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StaticPage />} />
    </Routes>
  )
}
