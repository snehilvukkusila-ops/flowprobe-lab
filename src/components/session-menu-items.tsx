import { useLocation, useNavigate } from '@tanstack/react-router'
import { LockKeyhole, LogOut, Power } from 'lucide-react'
import { t } from '@/lib/i18n'
import { api } from '@/lib/probe-api'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

// FlowProbe: the session items of the user menu. "Log out" and "Sign out" are plain links
// (GET /logout and GET /signout) so a crawler or a screenshot run meets real anchors.
export function SessionMenuItems() {
  const navigate = useNavigate()
  const href = useLocation({ select: (l) => l.href })

  async function lock() {
    await api('/api/auth/lock', { method: 'POST' })
    navigate({ to: '/lock-screen', search: { redirect: href } })
  }

  return (
    <>
      <DropdownMenuItem onClick={lock}>
        <LockKeyhole />
        {t('menu.lockScreen')}
      </DropdownMenuItem>
      <DropdownMenuItem asChild variant='destructive'>
        <a href='/logout'>
          <LogOut />
          {t('menu.logOut')}
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem asChild variant='destructive'>
        <a href='/signout'>
          <Power />
          {t('menu.signOut')}
        </a>
      </DropdownMenuItem>
    </>
  )
}
