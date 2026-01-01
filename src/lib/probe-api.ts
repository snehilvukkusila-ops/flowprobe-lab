// FlowProbe: the small sign-in API the probe server answers (see sites/admin/api.mjs).
// Every call is same-origin; nothing leaves the server that served the page.
export type Workspace = { id: string; name: string }

export type SessionUser = {
  email: string
  name: string
  role: 'viewer' | 'editor' | 'admin'
  phone: string
  employeeId: string
  workspaces: Workspace[]
  workspace: Workspace | null
}

export type Me = {
  user: SessionUser
  mustChangePassword: boolean
  locked: boolean
}

export class ApiError extends Error {
  status: number
  code: string
  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

export async function api<T>(
  path: string,
  init?: { method?: string; body?: unknown }
): Promise<T> {
  const res = await fetch(path, {
    method: init?.method ?? 'GET',
    credentials: 'same-origin',
    headers: init?.body ? { 'content-type': 'application/json' } : undefined,
    body: init?.body ? JSON.stringify(init.body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new ApiError(
      res.status,
      String(data?.code ?? 'error'),
      String(data?.message ?? 'Something went wrong.')
    )
  }
  return data as T
}

// Reads the current session. Missing or odd fields degrade to "not signed in", never a crash.
export async function fetchMe(): Promise<
  { status: 'ok'; me: Me } | { status: 'anonymous'; code: string }
> {
  try {
    const me = await api<Me>('/api/auth/me')
    if (!me?.user?.email) return { status: 'anonymous', code: 'not_signed_in' }
    return { status: 'ok', me }
  } catch (e) {
    if (e instanceof ApiError && e.status === 401)
      return { status: 'anonymous', code: e.code }
    if (e instanceof ApiError && e.status === 423 && e.code === 'screen_locked')
      return { status: 'anonymous', code: e.code }
    throw e
  }
}
