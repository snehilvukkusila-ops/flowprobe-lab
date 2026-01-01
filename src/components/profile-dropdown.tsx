import { Link } from '@tanstack/react-router'
import { t } from '@/lib/i18n'
import { useAuthStore } from '@/stores/auth-store'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SessionMenuItems } from '@/components/session-menu-items'

export function ProfileDropdown() {
  const user = useAuthStore((s) => s.auth.user)
  const name = user?.name ?? ''
  const initials =
    name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '?'

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-8 w-8 rounded-full'
          aria-label={name || t('nav.account')}
        >
          <Avatar className='h-8 w-8'>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col gap-1.5'>
            <p className='text-sm leading-none font-medium'>{name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
            {user?.workspace && (
              <p className='text-xs leading-none text-muted-foreground'>
                {user.workspace.name}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to='/settings'>{t('nav.profile')}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/settings/account'>{t('nav.settings')}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SessionMenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
