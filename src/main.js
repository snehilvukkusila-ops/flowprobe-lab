import { routes } from './routes.js'
import { features } from './features/index.js'
import { allowed, currentRole, signOut } from './session.js'
import * as views from './views.js'
import { h } from './ui.js'

const bySlug = Object.fromEntries(features.map((f) => [f.slug, f]))
const compiled = routes.map((r) => ({ ...r, re: new RegExp('^' + r.path.replace(/:[a-z]+/g, '([^/]+)') + '$') }))
const main = document.getElementById('main')

function match(pathname) {
  for (const r of compiled) {
    const m = r.re.exec(pathname)
    if (m) return { route: r, params: { id: m[1] } }
  }
  return null
}

async function render() {
  const hit = match(location.pathname)
  const role = currentRole()
  let view
  if (!hit) {
    document.title = 'Page not found - Meridian Ops'
    view = views.notFound()
  } else if (!allowed(hit.route.access, role)) {
    if (role === 'guest') return navigate('/sign-in?next=' + encodeURIComponent(location.pathname), true)
    history.replaceState(null, '', '/no-access')
    document.title = 'No access - Meridian Ops'
    view = views.noAccess({ need: hit.route.access })
  } else {
    const feature = bySlug[hit.route.feature]
    const ctx = { features, feature, params: hit.params, navigate, next: new URLSearchParams(location.search).get('next') }
    document.title = `${hit.route.title} - Meridian Ops`
    if (hit.route.view === 'list') view = await views.list(ctx)
    else if (hit.route.view === 'detail') view = await views.detail(ctx)
    else if (hit.route.view === 'new') view = views.form({ feature, title: `Add ${feature.singular}`, fields: feature.fields })
    else if (hit.route.view === 'signIn') view = views.signInView(ctx)
    else view = views[hit.route.view](ctx)
  }
  main.replaceChildren(view)
  drawChrome()
  main.focus()
}

function drawChrome() {
  const role = currentRole()
  document.getElementById('nav').replaceChildren(...features.map((f) =>
    h('a', { href: `/${f.slug}`, 'aria-current': location.pathname === `/${f.slug}` ? 'page' : false }, f.title)))
  document.getElementById('session').replaceChildren(
    role === 'guest' ? h('a', { href: '/sign-in' }, 'Sign in') : h('span', null, `Role: ${role} `),
    role === 'guest' ? '' : h('button', { type: 'button', onclick: () => { signOut(); navigate('/') } }, 'Sign out'))
}

function navigate(to, replace) {
  history[replace ? 'replaceState' : 'pushState'](null, '', to)
  return render()
}

document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a[href]')
  if (!a || a.origin !== location.origin || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return
  e.preventDefault()
  navigate(a.pathname + a.search)
})
addEventListener('popstate', () => render())
render()
