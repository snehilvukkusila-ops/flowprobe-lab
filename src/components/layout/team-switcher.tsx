import { ChevronsUpDown, Command } from 'lucide-react'
import { t } from '@/lib/i18n'
import { api, fetchMe, type Workspace } from '@/lib/probe-api'
import { useAuthStore } from '@/stores/auth-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

// FlowProbe: the "team" is the signed-in user's workspace; users with several can switch.
export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const user = useAuthStore((s) => s.auth.user)
  const setUser = useAuthStore((s) => s.auth.setUser)
  const workspaces: Workspace[] = user?.workspaces ?? []
  const active = user?.workspace ?? workspaces[0]

  async function choose(id: string) {
    await api('/api/auth/workspace', { method: 'POST', body: { id } })
    const r = await fetchMe()
    if (r.status === 'ok') setUser(r.me.user)
  }

  const label = (
    <>
      <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
        <Command className='size-4' />
      </div>
      <div className='grid flex-1 text-start text-sm leading-tight'>
        <span className='truncate font-semibold'>{active?.name ?? ''}</span>
        <span className='truncate text-xs'>FlowProbe Admin</span>
      </div>
    </>
  )

  if (workspaces.length < 2) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size='lg'>{label}</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              {label}
              <ChevronsUpDown className='ms-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              {t('menu.workspace')}
            </DropdownMenuLabel>
            {workspaces.map((w) => (
              <DropdownMenuItem
                key={w.id}
                onClick={() => choose(w.id)}
                className='gap-2 p-2'
              >
                {w.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
