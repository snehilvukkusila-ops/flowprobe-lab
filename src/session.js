// The demo session: a role kept in sessionStorage. No passwords, no server.
export const ROLES = ['guest', 'member', 'manager', 'admin']
const KEY = 'probe.large.role'

export function currentRole() {
  const r = sessionStorage.getItem(KEY)
  return ROLES.includes(r) ? r : 'guest'
}
export function signIn(role) { sessionStorage.setItem(KEY, role) }
export function signOut() { sessionStorage.removeItem(KEY) }

// access is 'public' or the list of roles that may open the route.
export function allowed(access, role) {
  return access === 'public' || (Array.isArray(access) && access.includes(role))
}
