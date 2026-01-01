import { createFileRoute, redirect } from '@tanstack/react-router'
import { fetchMe } from '@/lib/probe-api'
import { useAuthStore } from '@/stores/auth-store'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

// FlowProbe route guard: every page under here needs a live session.
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const result = await fetchMe()
    if (result.status === 'anonymous') {
      useAuthStore.getState().auth.reset()
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
          reason: result.code === 'session_expired' ? 'expired' : undefined,
        },
      })
    }
    const { me } = result
    useAuthStore.getState().auth.setUser(me.user)
    if (me.locked) {
      throw redirect({
        to: '/lock-screen',
        search: { redirect: location.href },
      })
    }
    if (me.mustChangePassword) {
      throw redirect({
        to: '/change-password',
        search: { redirect: location.href },
      })
    }
    if (me.user.workspaces.length > 1 && !me.user.workspace) {
      throw redirect({
        to: '/select-workspace',
        search: { redirect: location.href },
      })
    }
  },
  component: AuthenticatedLayout,
})
