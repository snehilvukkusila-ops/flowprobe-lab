import { h } from './ui.js'
import { validateAll } from './validate.js'
import { ROLES, currentRole, signIn } from './session.js'

const SIGN_IN_FIELDS = [
  { name: 'displayName', label: 'Display name', kind: 'text', required: true, minlength: 2, maxlength: 40, pattern: "[A-Za-z][A-Za-z '-]*", patternMessage: 'Display name can use letters, spaces, apostrophes and hyphens only.', help: 'Any invented name. It is only shown in the header.' },
  { name: 'role', label: 'Role', kind: 'select', required: true, options: ROLES.filter((r) => r !== 'guest').map((r) => ({ value: r, label: r })), help: 'Roles decide which screens open. This demo has no passwords.' },
]

async function loadRows(feature) {
  const res = await fetch(`/data/${feature.slug}.json`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function home({ features }) {
  return h('div', null,
    h('h1', null, 'Meridian Ops'),
    h('p', null, 'Pick an area. Areas marked with a role need that role to open.'),
    h('ul', { class: 'cards' }, features.map((f) =>
      h('li', null, h('a', { href: `/${f.slug}` }, f.title), f.access === 'public' ? '' : ` (${f.access[0]} and up)`))))
}

export async function list({ feature, navigate }) {
  const root = h('div', null, h('h1', null, feature.title))
  let rows
  try { rows = await loadRows(feature) } catch {
    root.append(h('div', { class: 'error', role: 'alert' },
      h('p', null, `We could not load ${feature.title.toLowerCase()}. The service did not answer. Try again in a few minutes.`),
      h('button', { type: 'button', onclick: () => navigate(location.pathname) }, 'Try again'),
      ' ', h('a', { href: '/status/outage' }, 'Check service status')))
    return root
  }
  root.append(h('p', null, h('a', { href: `/${feature.slug}/new` }, `Add ${feature.singular}`)))
  if (rows.length === 0) {
    root.append(h('div', { class: 'empty' }, h('p', null, `No ${feature.title.toLowerCase()} yet.`), h('p', null, `When you add the first ${feature.singular}, it will show up here.`)))
    return root
  }
  const body = h('tbody')
  const draw = (q) => {
    body.replaceChildren(...rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase())).map((r) =>
      h('tr', null,
        h('td', null, h('a', { href: `/${feature.slug}/${r.id}` }, r.name)),
        h('td', null, r.status), h('td', null, r.owner), h('td', null, String(r.amount)), h('td', null, r.updated))))
  }
  root.append(
    h('label', { for: 'filter' }, `Filter ${feature.title.toLowerCase()} by name`),
    ' ', h('input', { id: 'filter', type: 'search', maxlength: 40, oninput: (e) => draw(e.target.value) }),
    h('table', null,
      h('caption', null, `${rows.length} ${feature.title.toLowerCase()}`),
      h('thead', null, h('tr', null, ['Name', 'Status', 'Owner', feature.amountLabel, 'Updated'].map((c) => h('th', { scope: 'col' }, c)))),
      body))
  draw('')
  return root
}

export async function detail({ feature, params }) {
  let rows = []
  try { rows = await loadRows(feature) } catch { /* shown below as not found */ }
  const row = rows.find((r) => String(r.id) === params.id)
  if (!row) {
    return h('div', null, h('h1', null, `${feature.singular} not found`),
      h('p', { role: 'alert', class: 'error' }, `There is no ${feature.singular} with number ${params.id}.`),
      h('a', { href: `/${feature.slug}` }, `Back to ${feature.title.toLowerCase()}`))
  }
  return h('div', null,
    h('h1', null, row.name),
    h('dl', null,
      [['Status', row.status], ['Owner', row.owner], ['Contact', row.ownerEmail], [feature.amountLabel, row.amount], ['Last updated', row.updated], ['Notes', row.notes]]
        .map(([k, v]) => [h('dt', null, k), h('dd', null, String(v))])),
    h('p', null, h('a', { href: `/${feature.slug}` }, `Back to ${feature.title.toLowerCase()}`)))
}

function fieldControl(f, onInput) {
  const common = { id: f.name, name: f.name, required: f.required, 'aria-describedby': `${f.name}-help ${f.name}-error`, oninput: onInput }
  if (f.kind === 'textarea') return h('textarea', { ...common, rows: 4, maxlength: f.maxlength })
  if (f.kind === 'select') return h('select', common, h('option', { value: '' }, 'Choose...'), f.options.map((o) => h('option', { value: o.value }, o.label)))
  if (f.kind === 'checkbox') return h('input', { ...common, type: 'checkbox' })
  const type = { number: 'number', email: 'email', date: 'date' }[f.kind] || 'text'
  return h('input', { ...common, type, minlength: f.minlength, maxlength: f.maxlength, pattern: f.pattern, min: f.min, max: f.max, step: f.step })
}

export function form({ feature, title, fields, intro, onSaved }) {
  const root = h('div', null, h('h1', null, title))
  if (intro) root.append(h('p', null, intro))
  const summary = h('div', { role: 'alert', 'aria-live': 'assertive' })
  const errorEls = {}
  const f = h('form', { novalidate: true, onsubmit: (e) => {
    e.preventDefault()
    const data = new FormData(f)
    const values = Object.fromEntries(fields.map((x) => [x.name, x.kind === 'checkbox' ? data.get(x.name) === 'on' : data.get(x.name)]))
    const errors = validateAll(fields, values)
    for (const x of fields) errorEls[x.name].textContent = errors[x.name] || ''
    summary.replaceChildren()
    const bad = Object.keys(errors)
    if (bad.length) {
      summary.append(h('p', { class: 'error' }, `Fix ${bad.length} ${bad.length === 1 ? 'field' : 'fields'} before saving.`))
      f.querySelector(`#${bad[0]}`).focus()
      return
    }
    root.replaceChildren(h('h1', null, 'Saved'), h('p', { class: 'ok', role: 'status' }, 'Saved for this session. This demo keeps nothing.'),
      feature ? h('a', { href: `/${feature.slug}` }, `Back to ${feature.title.toLowerCase()}`) : '')
    if (onSaved) onSaved(values)
  } })
  for (const x of fields) {
    errorEls[x.name] = h('span', { id: `${x.name}-error`, class: 'field-error' })
    f.append(h('div', { class: 'field' },
      h('label', { for: x.name }, x.label, x.required ? ' (required)' : ''),
      fieldControl(x, () => { errorEls[x.name].textContent = '' }),
      h('span', { id: `${x.name}-help`, class: 'help' }, x.help || ''),
      errorEls[x.name]))
  }
  f.append(summary, h('button', { type: 'submit' }, 'Save'))
  root.append(f)
  return root
}

export function signInView({ navigate, next }) {
  return form({ title: 'Sign in', fields: SIGN_IN_FIELDS, intro: 'Choose a role to try the guarded screens. No password is needed.',
    onSaved: (v) => { signIn(v.role); setTimeout(() => navigate(next || '/'), 0) } })
}

export function noAccess({ need }) {
  return h('div', null, h('h1', null, 'No access'),
    h('p', { role: 'alert', class: 'error' }, `Your role (${currentRole()}) cannot open this screen. ${Array.isArray(need) && need.length ? `It needs ${need.join(' or ')}.` : 'It needs a higher role.'}`),
    h('a', { href: '/sign-in' }, 'Sign in with another role'))
}

export function outage() {
  return h('div', null, h('h1', null, 'Service status'),
    h('p', { role: 'alert', class: 'error' }, 'Reports are unavailable right now. We are working on it. Try again in a few minutes.'))
}

export function archive() {
  return h('div', null, h('h1', null, 'Archive'), h('div', { class: 'empty' }, h('p', null, 'Nothing has been archived yet.')))
}

export function legacyExport() {
  return h('div', null, h('h1', null, 'Legacy export'), h('p', null, 'The old export tool. No menu links here; only a saved bookmark opens it.'))
}

export function notFound() {
  return h('div', null, h('h1', null, 'Page not found'), h('p', null, 'That address does not exist.'), h('a', { href: '/' }, 'Go to the home page'))
}
