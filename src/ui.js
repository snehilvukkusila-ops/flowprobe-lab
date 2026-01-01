// Tiny DOM helper. h('a', { href: '/x' }, 'text') builds an element.
export function h(tag, attrs, ...kids) {
  const el = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v == null) continue
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v)
    else if (k === 'class') el.className = v
    else el.setAttribute(k, v === true ? '' : v)
  }
  for (const kid of kids.flat()) el.append(kid instanceof Node ? kid : String(kid ?? ''))
  return el
}
