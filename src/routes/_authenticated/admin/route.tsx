import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'

// Admin-only area: the parent route has already loaded the session user.
export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: () => {
    if (useAuthStore.getState().auth.user?.role !== 'admin') {
      throw redirect({ to: '/403' })
    }
  },
  component: Outlet,
})
