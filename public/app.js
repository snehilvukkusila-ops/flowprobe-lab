
(() => {
  const FLAG = 'vysr_has_session'
  const root = document.getElementById('root')
  const idpPort = document.querySelector('meta[name=probe-idp-port]').content
  const S = { token: null, user: null, tenant: null, tenants: [], timer: null, refreshing: null }

  // a per-run marker (?marker=...) shown on every page, so two runs can tell their browsers apart
  const q = new URLSearchParams(location.search)
  if (q.get('marker')) sessionStorage.setItem('probe_marker', q.get('marker'))
  const marker = () => sessionStorage.getItem('probe_marker') || ''
  // test-only knobs, kept for the browser session like the marker: ?markercolor= paints a banner in the
  // run's colour (so a viewer's pixels tell two runs apart), ?layout=1 reports where controls are
  const COLORS = { red: '#d32f2f', blue: '#1976d2', green: '#2e7d32', orange: '#ef6c00' }
  if (q.get('markercolor')) sessionStorage.setItem('probe_color', q.get('markercolor'))
  if (q.get('layout')) sessionStorage.setItem('probe_layout', q.get('layout'))
  const layoutOn = () => sessionStorage.getItem('probe_layout') === '1'
  const banner = () => marker()
    ? '<div class="marker-banner" data-probe-target="marker-banner" style="background:' + (COLORS[sessionStorage.getItem('probe_color')] || '#455a64') + '">Run marker: ' + esc(marker()) + '</div>'
    : ''
  // the display currency is a setting a person may want kept as it is (a "Keep as is" pin)
  const CURRENCIES = { USD: '$', EUR: '\u20ac', GBP: '\u00a3' }
  const currency = () => (CURRENCIES[localStorage.getItem('probe_currency')] ? localStorage.getItem('probe_currency') : 'USD')
  let layoutTimer = null
  function reportLayout() {
    if (!layoutOn()) return
    clearTimeout(layoutTimer)
    layoutTimer = setTimeout(() => {
      const targets = {}
      document.querySelectorAll('[data-probe-target]').forEach((el) => {
        const r = el.getBoundingClientRect()
        targets[el.getAttribute('data-probe-target')] = { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
      })
      const d = { path: location.pathname, viewport: { w: innerWidth, h: innerHeight }, targets }
      fetch('/api/_layout?m=' + encodeURIComponent(marker()) + '&d=' + encodeURIComponent(JSON.stringify(d))).catch(() => {})
    }, 120)
  }
  new MutationObserver(reportLayout).observe(document.body, { childList: true, subtree: true, attributes: true })
  addEventListener('resize', reportLayout)

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const money = (n) => CURRENCIES[currency()] + Number(n).toLocaleString('en-US')

  // ---- tokens ----
  function schedule(expiresIn) {
    clearTimeout(S.timer)
    S.timer = setTimeout(() => { refresh().catch(() => {}) }, Math.max(1, expiresIn - 10) * 1000)
  }
  function refresh() {
    // single flight: two refreshes at once would spend the same single-use token twice
    if (!S.refreshing) {
      S.refreshing = fetch('/api/auth/refresh', { method: 'POST', credentials: 'same-origin', headers: { 'x-probe-client': 'web' } })
        .then(async (r) => {
          const b = await r.json().catch(() => ({}))
          if (!r.ok) throw Object.assign(new Error(b.error || 'refresh_failed'), { code: b.error || 'refresh_failed' })
          S.token = b.access_token
          localStorage.setItem(FLAG, '1')
          schedule(b.expires_in)
          return b
        })
        .finally(() => { S.refreshing = null })
    }
    return S.refreshing
  }
  function endSession(reason) {
    S.token = null; S.user = null; S.tenant = null
    clearTimeout(S.timer)
    localStorage.removeItem(FLAG)
    go('/login?reason=' + encodeURIComponent(reason))
  }
  async function api(path, opts = {}, retried = false) {
    const r = await fetch(path, { ...opts, credentials: 'same-origin', headers: { ...(opts.headers || {}), authorization: 'Bearer ' + (S.token || '') } })
    if (r.status === 401 && !retried) {
      const b = await r.clone().json().catch(() => ({}))
      if (b.error === 'access_expired') {
        try { await refresh() } catch (e) { endSession('session_ended'); throw e }
        return api(path, opts, true)
      }
      endSession('session_ended')
      throw new Error(b.error || 'unauthorized')
    }
    return r
  }
  const post = (path, body) => api(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body || {}) })

  // ---- routing ----
  function go(path) { history.pushState({}, '', path); render() }
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[data-link]')
    if (a) { e.preventDefault(); closeMenu(); go(a.getAttribute('href')) }
  })
  window.addEventListener('popstate', render)
  const link = (href, text) => '<a data-link href="' + href + '">' + esc(text) + '</a>'

  function shell(inner, active) {
    const nav = [['/app', 'Dashboard'], ['/app/projects', 'Projects'], ['/app/members', 'Members'], ['/app/invoices', 'Invoices'], ['/app/settings', 'Settings']]
    return banner() + '<header><strong>Probe Auth App</strong><nav aria-label="Main">' +
      nav.map(([h, t]) => link(h, t)).join('') + '</nav>' +
      '<span class="marker" data-testid="run-marker">' + (marker() ? 'Run marker: ' + esc(marker()) : '') + '</span>' +
      '<span data-testid="workspace-name">' + esc(S.tenant ? S.tenant.name : '') + '</span>' +
      '<label for="currency">Currency</label>' +
      '<select id="currency" size="3" data-probe-target="currency">' +
      Object.keys(CURRENCIES).map((c) => '<option value="' + c + '" data-probe-target="currency-' + c + '"' + (c === currency() ? ' selected' : '') + '>' + c + '</option>').join('') + '</select>' +
      '<button id="ws-menu" aria-haspopup="menu" aria-expanded="false" data-probe-target="workspace-menu">Workspace menu</button>' +
      '<button id="signout" data-probe-target="signout">Sign out</button></header>' +
      '<main>' + inner + '</main>'
  }
  function closeMenu() { const m = document.getElementById('ws-menu-list'); if (m) m.remove() }
  function wire() {
    const so = document.getElementById('signout')
    if (so) so.onclick = async () => { try { await post('/api/auth/logout') } catch (e) { /* already out */ } S.token = null; clearTimeout(S.timer); localStorage.removeItem(FLAG); go('/login') }
    const cur = document.getElementById('currency')
    if (cur) cur.onchange = () => {
      localStorage.setItem('probe_currency', cur.value)
      fetch('/api/prefs/currency?v=' + encodeURIComponent(cur.value)).catch(() => {})
      render()
    }
    const wm = document.getElementById('ws-menu')
    if (wm) wm.onclick = () => {
      if (document.getElementById('ws-menu-list')) { closeMenu(); wm.setAttribute('aria-expanded', 'false'); return }
      wm.setAttribute('aria-expanded', 'true')
      const d = document.createElement('div')
      d.id = 'ws-menu-list'; d.setAttribute('role', 'menu')
      d.innerHTML = link('/app/reports/quarterly', 'Quarterly reports').replace('<a ', '<a data-probe-target="menu-reports" ') + link('/select-workspace', 'Switch workspace')
      wm.after(d)
    }
  }

  async function loadSession() {
    const r = await api('/api/auth/session')
    const b = await r.json()
    S.user = b.user; S.tenant = b.tenant; S.tenants = b.tenants
    return b
  }

  async function signedIn() {
    const b = await loadSession()
    go(b.tenant ? (q.get('next') || '/app') : '/select-workspace')
  }

  // ---- views ----
  function loginView() {
    const reason = new URLSearchParams(location.search).get('reason')
    root.innerHTML = banner() + '<main><div class="card"><h1>Sign in</h1>' +
      '<div class="marker" data-testid="run-marker">' + (marker() ? 'Run marker: ' + esc(marker()) : '') + '</div>' +
      (reason === 'session_ended' ? '<div class="info" role="status">Your session ended. Please sign in again.</div>' : '') +
      '<form id="login"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="username" data-probe-target="email" required>' +
      '<label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" data-probe-target="password" required>' +
      '<button type="submit" data-probe-target="signin">Sign in</button>' +
      '<button type="button" id="oauth" data-probe-target="oauth">Continue with ProbeID</button></form>' +
      '<div id="err"></div>' +
      '<p>' + link('/login/forgot', 'Forgot your password?') + '</p></div></main>'
    const err = (t) => { document.getElementById('err').innerHTML = '<div class="alert" role="alert">' + esc(t) + '</div>' }
    if (layoutOn()) document.getElementById('email').addEventListener('input', (e) => {
      // test-only: the email field only, never the password
      fetch('/api/_typed?f=email&m=' + encodeURIComponent(marker()) + '&v=' + encodeURIComponent(e.target.value)).catch(() => {})
    })
    document.getElementById('login').onsubmit = async (ev) => {
      ev.preventDefault()
      const r = await fetch('/api/auth/login', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: ev.target.email.value, password: ev.target.password.value }) })
      const b = await r.json().catch(() => ({}))
      if (!r.ok) return err('Invalid email or password.')
      S.token = b.access_token; localStorage.setItem(FLAG, '1'); schedule(b.expires_in)
      signedIn()
    }
    document.getElementById('oauth').onclick = () => {
      const idp = location.protocol + '//' + location.hostname + ':' + idpPort
      let extra = ''
      if (marker()) extra += '&marker=' + encodeURIComponent(marker()) + '&markercolor=' + encodeURIComponent(sessionStorage.getItem('probe_color') || '')
      if (layoutOn()) extra += '&layout=1'
      const w = window.open(idp + '/authorize?origin=' + encodeURIComponent(location.origin) + extra, 'probe-idp', 'width=480,height=640')
      if (!w) return err('The sign-in window was blocked.')
      const onMsg = async (e) => {
        if (e.origin !== idp || !e.data || e.data.type !== 'probe-oauth') return
        window.removeEventListener('message', onMsg)
        const r = await fetch('/api/auth/oauth/exchange', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ code: e.data.code }) })
        const b = await r.json().catch(() => ({}))
        if (!r.ok) return err('Sign-in with ProbeID failed.')
        S.token = b.access_token; localStorage.setItem(FLAG, '1'); schedule(b.expires_in)
        signedIn()
      }
      window.addEventListener('message', onMsg)
    }
  }

  function forgotView() {
    root.innerHTML = '<main><div class="card"><h1>Reset your password</h1>' +
      '<form id="forgot"><label for="fe">Email</label><input id="fe" type="email" required>' +
      '<button type="submit">Send reset link</button></form><div id="ok"></div>' +
      '<p>' + link('/login', 'Back to sign in') + '</p></div></main>'
    document.getElementById('forgot').onsubmit = (ev) => {
      ev.preventDefault()
      document.getElementById('ok').innerHTML = '<div class="info" role="status">If that address has an account, a reset link is on its way.</div>'
    }
  }

  async function pickerView() {
    await loadSession()
    root.innerHTML = banner() + '<main><div class="card"><h1>Choose a workspace</h1><p>Pick the workspace to open.</p>' +
      S.tenants.map((t) => '<button class="ws" data-id="' + esc(t.id) + '" data-probe-target="ws-' + esc(t.id) + '">' + esc(t.name) + '</button>').join('') + '</div></main>'
    root.querySelectorAll('button.ws').forEach((b) => {
      b.onclick = async () => {
        const r = await post('/api/auth/tenant', { tenant: b.dataset.id })
        if (r.ok) { await loadSession(); go('/app') }
      }
    })
  }

  const table = (heads, rows) => '<table><thead><tr>' + heads.map((h) => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' + rows.join('') + '</tbody></table>'

  async function appView(path) {
    const t = S.tenant.id
    const get = async (p) => (await api('/api/t/' + t + p)).json()
    let inner = ''
    let m
    if (path === '/app') {
      const o = await get('/overview')
      inner = '<h1>Dashboard</h1><div class="card"><p>Workspace: <strong>' + esc(S.tenant.name) + '</strong></p>' +
        '<p>Signed in as ' + esc(S.user.name) + ' (' + esc(S.user.email) + ').</p>' +
        '<ul><li>' + o.projects + ' projects</li><li>' + o.members + ' members</li><li>' + o.invoices + ' invoices</li></ul></div>'
    } else if (path === '/app/projects') {
      const p = await get('/projects')
      inner = '<h1>Projects</h1>' + table(['Project', 'Status', 'Owner'], p.map((x) => '<tr><td>' + link('/app/projects/' + x.id, x.name) + '</td><td>' + esc(x.status) + '</td><td>' + esc(x.owner) + '</td></tr>'))
    } else if ((m = /^\/app\/projects\/(p\d+)$/.exec(path))) {
      const p = await get('/projects/' + m[1])
      inner = '<h1>' + esc(p.name) + '</h1><div class="card"><p>' + esc(p.summary) + '</p><dl><dt>Status</dt><dd>' + esc(p.status) + '</dd><dt>Owner</dt><dd>' + esc(p.owner) + '</dd><dt>Budget</dt><dd>' + money(p.budget) + '</dd></dl></div><p>' + link('/app/projects', 'Back to projects') + '</p>'
    } else if (path === '/app/members') {
      const p = await get('/members')
      inner = '<h1>Members</h1>' + table(['Name', 'Role', 'Email'], p.map((x) => '<tr><td>' + link('/app/members/' + x.id, x.name) + '</td><td>' + esc(x.role) + '</td><td>' + esc(x.email) + '</td></tr>'))
    } else if ((m = /^\/app\/members\/(m\d+)$/.exec(path))) {
      const p = await get('/members/' + m[1])
      inner = '<h1>' + esc(p.name) + '</h1><div class="card"><dl><dt>Role</dt><dd>' + esc(p.role) + '</dd><dt>Email</dt><dd>' + esc(p.email) + '</dd><dt>Joined</dt><dd>' + esc(p.joined) + '</dd></dl></div><p>' + link('/app/members', 'Back to members') + '</p>'
    } else if (path === '/app/invoices') {
      const p = await get('/invoices')
      inner = '<h1>Invoices</h1>' + table(['Number', 'Customer', 'Amount', 'State'], p.map((x) => '<tr><td>' + link('/app/invoices/' + x.id, x.number) + '</td><td>' + esc(x.customer) + '</td><td>' + money(x.amount) + '</td><td>' + esc(x.state) + '</td></tr>'))
    } else if ((m = /^\/app\/invoices\/([\w-]+)$/.exec(path))) {
      const p = await get('/invoices/' + m[1])
      inner = '<h1>Invoice ' + esc(p.number) + '</h1><div class="card"><dl><dt>Customer</dt><dd>' + esc(p.customer) + '</dd><dt>Amount</dt><dd>' + money(p.amount) + '</dd><dt>State</dt><dd>' + esc(p.state) + '</dd></dl>' +
        '<form id="note"><label for="n">Internal note</label><input id="n" maxlength="80"><button type="submit">Save note</button></form><div id="saved"></div></div><p>' + link('/app/invoices', 'Back to invoices') + '</p>'
    } else if (path === '/app/settings') {
      inner = '<h1>Settings</h1><div class="card"><p>Workspace name: ' + esc(S.tenant.name) + '</p><p>' + link('/app/settings/billing', 'Billing') + '</p></div>'
    } else if (path === '/app/settings/billing') {
      const b = await get('/billing')
      inner = '<h1>Billing</h1><div class="card"><dl><dt>Plan</dt><dd>' + esc(b.plan) + '</dd><dt>Seats</dt><dd>' + b.seats + '</dd><dt>Next invoice</dt><dd>' + esc(b.nextInvoice) + '</dd></dl></div>'
    } else if (path === '/app/reports/quarterly') {
      const r = await get('/reports/quarterly')
      inner = '<h1>Quarterly report</h1><div class="card"><p>' + esc(r.tenant) + ', ' + esc(r.quarter) + '</p><dl><dt>Revenue</dt><dd>' + money(r.revenue) + '</dd><dt>Churn</dt><dd>' + esc(r.churn) + '</dd></dl></div>'
    } else {
      inner = '<h1>Page not found</h1><p>' + link('/app', 'Back to the dashboard') + '</p>'
    }
    root.innerHTML = shell(inner)
    wire()
    const note = document.getElementById('note')
    if (note) note.onsubmit = async (ev) => {
      ev.preventDefault()
      await post('/api/t/' + t + '/invoices/' + path.split('/').pop() + '/notes', { note: ev.target.n.value })
      document.getElementById('saved').innerHTML = '<div class="info" role="status">Note saved.</div>'
    }
  }

  // ---- boot / render ----
  async function render() {
    const path = location.pathname
    try {
      if (path === '/login') {
        // a returning user: try the refresh cookie first, like the real app
        if (!S.token && localStorage.getItem(FLAG) === '1' && !new URLSearchParams(location.search).get('reason')) {
          try { await refresh(); return signedIn() } catch (e) { localStorage.removeItem(FLAG) }
        }
        return loginView()
      }
      if (path === '/login/forgot') return forgotView()
      if (path === '/' || path === '') return go(localStorage.getItem(FLAG) === '1' ? '/app' : '/login')
      if (!S.token) {
        if (localStorage.getItem(FLAG) === '1') {
          try { await refresh() } catch (e) { localStorage.removeItem(FLAG); return go('/login?reason=session_ended') }
        } else { return go('/login') }
      }
      if (!S.user) await loadSession()
      if (path === '/select-workspace') return pickerView()
      if (!S.tenant) return go('/select-workspace')
      return appView(path)
    } catch (e) { /* endSession already navigated */ }
  }
  render()
})()
