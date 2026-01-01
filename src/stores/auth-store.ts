import { create } from 'zustand'
import { type SessionUser } from '@/lib/probe-api'

// FlowProbe: the session lives on the server (an HttpOnly cookie). This store only holds
// the user the last /api/auth/me call returned, so menus can show it.
interface AuthState {
  auth: {
    user: SessionUser | null
    setUser: (user: SessionUser | null) => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => ({
  auth: {
    user: null,
    setUser: (user) =>
      set((state) => ({ ...state, auth: { ...state.auth, user } })),
    reset: () =>
      set((state) => ({ ...state, auth: { ...state.auth, user: null } })),
  },
}))
