import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// BrowserRouter, not HashRouter (reverted 2026-09-15 — see the userflow-track
// live-test findings for the full story). HashRouter's own real URLs are
// '/flowprobe-screenshot-app/#/team' etc., but the userflow-track pipeline's
// own route discovery constructs plain path URLs ('/flowprobe-screenshot-app
// /team', no '#') when exploring a target app, so under HashRouter EVERY
// direct-navigation candidate silently mismatched every declared route and
// rendered this app's own NotFound page — confirmed directly via a live run's
// exploration_results.json, where 12 of 16 captured screens showed
// heading=['404'], including the literal base route. BrowserRouter's real
// URLs match what the pipeline already assumes; public/404.html + the
// restoration script in index.html (the standard rafgraph/spa-github-pages
// technique) is the correct fix for the GH-Pages deep-link 404 problem this
// swap reintroduces, and is already in place.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/flowprobe-screenshot-app">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
